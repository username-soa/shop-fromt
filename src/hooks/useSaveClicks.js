import React, { useEffect, useRef, useContext } from "react";
import firebase from "firebase/app";
import jwt from "jsonwebtoken";

const useSaveClicks = () => {
  const db = firebase.firestore();
  let uid = null;
  let aid = null;

  const getData = () => {
    try {
      const userToken = localStorage.getItem("ec_user_token");
      const clicksArray = JSON.parse(localStorage.getItem("ec_page_clicks"));
      jwt.verify(
        userToken,
        "d6d82b79-5226-454c-a36d-17bc13bcd6f2",
        (err, decoded) => {
          if (decoded) {
            uid = decoded.documentId;
            aid = decoded.aid;
          }
        }
      );
      return clicksArray;
    } catch (err) {
      console.log(err);
    }
  };

  const saveGeneralClicks = async (data, id, uid, aid) => {
    await db
      .collection("clicksData")
      .doc(id)
      .get()
      .then(async (snap) => {
        if (snap.exists) {
          const tempArr = [...data.clicks];
          await db
            .collection("clicksData")
            .doc(id)
            .update({
              clicks: firebase.firestore.FieldValue.arrayUnion(...tempArr),
            })
            .then(() => {})
            .catch((err) => console.log(err.message));
        } else {
          await db
            .collection("clicksData")
            .doc(id)
            .set({
              createdAt: firebase.firestore.Timestamp.fromDate(new Date()),
              aid: aid,
              uid: uid,
              ...data,
            })
            .then(() => {})
            .catch((err) => console.log(err.message));
        }
      })
      .catch((err) => console.log(err.message));
  };
  const saveUserClicks = async (data, id, uid, aid) => {
    await db
      .collection("clicksUserData")
      .doc(uid + id)
      .get()
      .then(async (snap) => {
        if (snap.exists) {
          const tempArr = [...data.clicks];
          await db
            .collection("clicksUserData")
            .doc(uid + id)
            .update({
              clicks: firebase.firestore.FieldValue.arrayUnion(...tempArr),
            })
            .then(() => {
              localStorage.setItem("ec_page_clicks", JSON.stringify([]));
            })
            .catch((err) => console.log(err));
        } else {
          await db
            .collection("clicksUserData")
            .doc(uid + id)
            .set({
              createdAt: firebase.firestore.Timestamp.fromDate(new Date()),
              aid: aid,
              uid: uid,
              ...data,
            })
            .then(() => {
              localStorage.setItem("ec_page_clicks", JSON.stringify([]));
            })
            .catch((err) => console.log(err));
        }
      })
      .catch((err) => console.log(err));
  };

  useEffect(() => {
    if (localStorage.getItem("ec_page_clicks") === null) {
      console.log("no clicks data is found");
      return;
    } else {
      const arr = getData();
      arr.forEach((element) => {
        // console.log(element);
        // saveClicks(element, element.pageID, uid, aid);
      });
    }
  }, []);
};

export default useSaveClicks;
