import React, { useEffect, useRef, useContext } from "react";
import firebase from "firebase/app";

const usePageVisits = (status, pageID) => {
  const db = firebase.firestore();
  useEffect(() => {
    const updatePageVisits = async (id) => {
      await db
        .collection("heatMap")
        .doc(id)
        .update({
          visitsCount: firebase.firestore.FieldValue.increment(1),
        })
        .then((doc) => {
          console.log("page visits incremented !");
        })
        .catch((err) => {
          console.log(err.message);
        });
    };
    if (status === false) return;
    if (pageID === null || pageID === undefined) return;
    updatePageVisits(pageID);
  }, [status]);
};

export default usePageVisits;
