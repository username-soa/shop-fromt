import React, { useEffect, useRef, useContext } from "react";
import firebase from "firebase/app";
import jwt from "jsonwebtoken";

const useSaveHovers = () => {
  const db = firebase.firestore();
  let uid = null;
  let aid = null;

  const getData = () => {
    try {
      const userToken = localStorage.getItem("ec_user_token");
      const hoversArray = JSON.parse(localStorage.getItem("ec_page_hovers"));
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
      return hoversArray;
    } catch (err) {
      console.log(err);
    }
  };

  const saveGeneralHovers = async (data, id, uid, aid) => {
    await db
      .collection("hoverData")
      .doc(id)
      .get()
      .then(async (snap) => {
        if (snap.exists) {
          const tempArr = [...data.hovers];
          await db
            .collection("hoverData")
            .doc(id)
            .update({
              hovers: firebase.firestore.FieldValue.arrayUnion(...tempArr),
            })
            .then(() => {})
            .catch((err) => console.log(err.message));
        } else {
          await db
            .collection("hoverData")
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

  const saveUserHovers = async (data, id, uid, aid) => {
    await db
      .collection("hoversUserData")
      .doc(uid + id)
      .get()
      .then(async (snap) => {
        if (snap.exists) {
          const tempArr = [...data.hovers];
          await db
            .collection("hoversUserData")
            .doc(uid + id)
            .update({
              hovers: firebase.firestore.FieldValue.arrayUnion(...tempArr),
            })
            .then(() => {
              localStorage.setItem("ec_page_hovers", JSON.stringify([]));
            })
            .catch((err) => console.log(err.message));
        } else {
          await db
            .collection("hoversUserData")
            .doc(uid + id)
            .set({
              createdAt: firebase.firestore.Timestamp.fromDate(new Date()),
              aid: aid,
              uid: uid,
              ...data,
            })
            .then(() => {
              localStorage.setItem("ec_page_hovers", JSON.stringify([]));
            })
            .catch((err) => console.log(err.message));
        }
      })
      .catch((err) => console.log(err.message));
  };

  useEffect(() => {
    if (localStorage.getItem("ec_page_hovers") === null) {
      console.log("no hovers data is found");
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

export default useSaveHovers;
