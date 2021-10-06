import React, {
  createContext,
  useState,
  useEffect,
  useLayoutEffect,
} from "react";
import firebase from "firebase/app";
import { useHistory, useLocation } from "react-router-dom";
import { deviceDetect, mobileModel } from "react-device-detect";
import { v4 as uuidv4 } from "uuid";
import jwt from "jsonwebtoken";

const UserContext = createContext({});

export const UserProvider = ({ children }) => {
  const db = firebase.firestore();
  const date = new Date();
  const history = useHistory();
  const [user, setUser] = useState({});
  const { REACT_APP_JWT_TOKEN, REACT_APP_BACKEND_URL } = process.env;

  // async function, gets the location of the user
  const geoLocation = (opts) =>
    new Promise((resolve, reject) =>
      navigator.geolocation.getCurrentPosition(
        (posData) => {
          resolve(posData);
        },
        (error) => {
          reject(error);
        },
        opts
      )
    );

  const checkforuser = async () => {
    let userObj = {};
    const options = {
      enableHighAccuracy: true,
      maximumAge: 0,
      timeout: 27000,
    };
    const deviceScreen = {};
    const screenOrientation = {};
    deviceScreen.width = window.screen.width;
    deviceScreen.height = window.screen.height;
    screenOrientation.angle = window.screen.orientation.angle;
    screenOrientation.type = window.screen.orientation.type;
    deviceScreen.orientation = screenOrientation;
    deviceScreen.colorDepth = window.screen.colorDepth;
    deviceScreen.pixelDepth = window.screen.pixelDepth;
    try {
      if (navigator.geolocation) {
        const loc = await geoLocation(options);
        const { accuracy, latitude, longitude } = loc.coords;
        userObj.location = { accuracy, latitude, longitude };
      } else {
        userObj.location = "not activated";
      }
    } catch (err) {
      console.log(err);
    }

    userObj.aid = uuidv4();
    userObj.deviceInfo = deviceDetect();
    userObj.deviceInfo.hardwareConcurrency = navigator.hardwareConcurrency;
    userObj.deviceInfo.deviceMemory = navigator.deviceMemory;
    userObj.deviceInfo.deviceScreen = deviceScreen;
    userObj.userCreds = "";
    userObj.userAdresse = "";

    //saving the userObj to localStorage
    const tempId = await saveUser(userObj.aid, userObj);
    userObj.documentId = tempId;
    const userToken = jwt.sign(userObj, "d6d82b79-5226-454c-a36d-17bc13bcd6f2");
    localStorage.setItem("ec_user_token", userToken);
    console.log(userObj);
    setUser(userObj);
  };

  const overideUser = async (data) => {
    console.log("inside override");
    const Obj = {};
    let userObj = {};
    const options = {
      enableHighAccuracy: true,
      maximumAge: 0,
      timeout: 27000,
    };

    try {
      if (navigator.geolocation) {
        const loc = await geoLocation(options);
        const { accuracy, latitude, longitude } = loc.coords;
        userObj.location = { accuracy, latitude, longitude };
      } else {
        userObj.location = "not activated";
      }
    } catch (err) {
      console.log(err);
    }

    Obj.firstname = data.fname;
    Obj.lastname = data.lname;
    Obj.email = data.email;
    Obj.phone = data.phone;

    userObj.aid = uuidv4();
    userObj.deviceInfo = deviceDetect();
    userObj.userCreds = Obj;
    userObj.userAdresse = "";

    //save do firebase
    await db
      .collection("leads")
      .add({
        createdAt: firebase.firestore.Timestamp.fromDate(new Date()),
        archived: false,
        ...userObj,
      })
      .then((docRef) => {
        userObj.documentId = docRef.id;
        console.log(docRef);
        const userToken = jwt.sign(
          userObj,
          "d6d82b79-5226-454c-a36d-17bc13bcd6f2"
        );
        localStorage.setItem("ec_user_token", userToken);
        setUser(userObj);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const addUserCreds = async (data) => {
    console.log("iside userCreds");
    let tempId = null;

    const Obj = {};
    let UserObj = {};
    const userToken = localStorage.getItem("ec_user_token");

    Obj.firstname = data.fname;
    Obj.lastname = data.lname;
    Obj.email = data.email;
    Obj.phone = data.phone;

    jwt.verify(
      userToken,
      "d6d82b79-5226-454c-a36d-17bc13bcd6f2",
      (err, decoded) => {
        if (decoded) {
          UserObj = decoded;
          tempId = decoded.documentId;
          UserObj.userCreds = Obj;
          const newToken = jwt.sign(
            UserObj,
            "d6d82b79-5226-454c-a36d-17bc13bcd6f2"
          );
          localStorage.setItem("ec_user_token", newToken);
          setUser(UserObj);
          console.log("userCreds updated");
        } else {
          console.log(err);
        }
      }
    );

    //save to firabase
    await db
      .collection("leads")
      .doc(tempId)
      .update({
        userCreds: UserObj.userCreds,
      })
      .then(() => {
        console.log("update done");
      })
      .catch((err) => {
        console.log(err.message);
      });
  };

  const addUserAdresse = async (data) => {
    console.log("einside userAddress");
    let tempId = null;
    let UserObj = {};
    const userToken = localStorage.getItem("ec_user_token");

    jwt.verify(
      userToken,
      "d6d82b79-5226-454c-a36d-17bc13bcd6f2",
      (err, decoded) => {
        if (decoded) {
          UserObj = decoded;
          tempId = decoded.documentId;
          UserObj.userAdresse = { ...data };
          const newToken = jwt.sign(
            UserObj,
            "d6d82b79-5226-454c-a36d-17bc13bcd6f2"
          );
          localStorage.setItem("ec_user_token", newToken);
          setUser(UserObj);
          console.log("userCreds updated");
        } else {
          console.log(err);
        }
      }
    );
    await db
      .collection("leads")
      .doc(tempId)
      .update({
        userAdresse: UserObj.userAdresse,
      })
      .then(() => {
        console.log("update done");
        console.log(tempId);
      })
      .catch((err) => {
        console.log(err.message);
      });
  };

  const updateUserAdresse = async (data, id, newUser) => {
    console.log(id);
    await db
      .collection("leads")
      .doc(id)
      .set(
        {
          userAdresse: data,
        },
        { merge: true }
      )
      .then(() => {
        //update local storage
        const userToken = jwt.sign(
          newUser,
          "d6d82b79-5226-454c-a36d-17bc13bcd6f2"
        );
        localStorage.setItem("ec_user_token", userToken);
        console.log("data is : ", data);
        console.log(`lead address with the id : ${id} is updated !`);
      })
      .catch((err) => console.log(err.message));
  };
  const updateUserCreds = async (data, id, newUser) => {
    await db
      .collection("leads")
      .doc(id)
      .set(
        {
          userCreds: data,
        },
        { merge: true }
      )
      .then(() => {
        //update local storage
        const userToken = jwt.sign(
          newUser,
          "d6d82b79-5226-454c-a36d-17bc13bcd6f2"
        );
        localStorage.setItem("ec_user_token", userToken);
        console.log("data is : ", data);
        console.log(`lead creds with the id : ${id} is updated !`);
      })
      .catch((err) => console.log(err.message));
  };

  const watchTimeURL = async (date, path) => {
    let tempArr = [];
    const newDate = new Date();

    if (localStorage.getItem("ec_user_url") !== null) {
      try {
        tempArr = JSON.parse(localStorage.getItem("ec_user_url"));
        tempArr.push({ location: path, duration: newDate });
        localStorage.setItem("ec_user_url", JSON.stringify(tempArr));
      } catch (err) {
        console.log(err.message);
      }
    } else {
      tempArr.push({ location: path, duration: date });
      localStorage.setItem("ec_user_url", JSON.stringify(tempArr));
    }
  };

  const msToTime = (s) => {
    // Pad to 2 or 3 digits, default is 2
    const pad = (n, z) => {
      z = z || 2;
      return ("00" + n).slice(-z);
    };

    var ms = s % 1000;
    s = (s - ms) / 1000;
    var secs = s % 60;
    s = (s - secs) / 60;
    var mins = s % 60;
    var hrs = (s - mins) / 60;

    return pad(hrs) + ":" + pad(mins) + ":" + pad(secs) + "." + pad(ms, 3);
  };

  //firebase functions
  const saveUser = async (id, user) => {
    let documentId = null;
    delete user.documentId;
    await db
      .collection("leads")
      .where("aid", "==", id)
      .get()
      .then(async (snapshot) => {
        if (snapshot.empty) {
          await db
            .collection("leads")
            .add({
              createdAt: firebase.firestore.Timestamp.fromDate(new Date()),
              archived: false,
              ...user,
            })
            .then((docRef) => {
              documentId = docRef.id;
              console.log(docRef.id);
            })
            .catch((err) => {
              console.log(err);
            });
        } else {
          console.log("found");
        }
      })
      .catch((err) => {
        console.log(err);
      });
    return documentId;
  };

  const saveNavigationHistory = async (userData) => {
    const userBehavior = {};
    if (localStorage.getItem("ec_user_url") !== null) {
      try {
        userBehavior.uid = userData?.documentId;
        userBehavior.aid = userData?.aid;
        userBehavior.navigationHistory = JSON.parse(
          localStorage.getItem("ec_user_url")
        );
        const firstItem = userBehavior.navigationHistory[0];
        const lastItem = userBehavior.navigationHistory.pop();
        const firstDate = new Date(firstItem.duration);
        const lastDate = new Date(lastItem.duration);
        var dateDiff = lastDate.getTime() - firstDate.getTime();
        userBehavior.sessionStart = firstDate;
        userBehavior.sessionEnd = lastDate;
        userBehavior.sessionDuration = msToTime(dateDiff);
        userBehavior.sessionDurationTimestamp = dateDiff;
      } catch (err) {
        console.log(err.message);
      }

      await db
        .collection("userNavigation")
        .add({
          createdAt: firebase.firestore.Timestamp.fromDate(new Date()),
          ...userBehavior,
        })
        .then((docRef) => {
          // console.log(docRef.id);
          localStorage.removeItem("ec_user_url");
        });
    }
  };
  //keep track on the user events
  const saveUserEvent = async (id, eventName) => {
    const obj = {};
    const updateEvent = async () => {
      await db
        .collection("eventsTracker")
        .doc(id)
        .set(
          {
            ...obj,
            createdAt: firebase.firestore.Timestamp.fromDate(new Date()),
            leadID: id,
          },
          { merge: true }
        )
        .then(() => {
          console.log(`${eventName} event is saved !`);
        })
        .catch((err) => console.log(err.message));
    };

    switch (eventName) {
      case "login":
        obj.login = firebase.firestore.FieldValue.arrayUnion(
          firebase.firestore.Timestamp.fromDate(new Date())
        );
        updateEvent();
        break;
      case "signup":
        obj.signup = firebase.firestore.FieldValue.arrayUnion(
          firebase.firestore.Timestamp.fromDate(new Date())
        );
        updateEvent();
        break;
      case "logout":
        obj.logout = firebase.firestore.FieldValue.arrayUnion(
          firebase.firestore.Timestamp.fromDate(new Date())
        );
        updateEvent();
        break;
      case "search":
        obj.search = firebase.firestore.FieldValue.arrayUnion(
          firebase.firestore.Timestamp.fromDate(new Date())
        );
        updateEvent();
        break;

      default:
        break;
    }
  };
  const userContext = {
    user,
    setUser,
    overideUser,
    addUserCreds,
    saveUserEvent,
    addUserAdresse,
    updateUserCreds,
    updateUserAdresse,
  };

  useEffect(() => {
    if (localStorage.getItem("ec_user_token") !== null) {
      const userToken = localStorage.getItem("ec_user_token");
      jwt.verify(
        userToken,
        "d6d82b79-5226-454c-a36d-17bc13bcd6f2",
        (err, decoded) => {
          if (decoded) {
            setUser(decoded);
            saveNavigationHistory(decoded);
            // console.log(window);
            // console.log(decoded);
          }
        }
      );
    } else {
      checkforuser();
    }
  }, []);

  useEffect(() => {
    history?.listen((location) => {
      watchTimeURL(date, location.pathname);
    });
    // console.log(typeof localStorage.getItem("ec_user_url"));
  }, [history]);

  return (
    <UserContext.Provider value={userContext}>{children}</UserContext.Provider>
  );
};

export const ThemeConsumer = UserContext.Consumer;

export default UserContext;
