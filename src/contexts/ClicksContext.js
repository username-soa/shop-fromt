import React, {
  createContext,
  useState,
  useEffect,
  useLayoutEffect,
  useRef,
} from "react";
import { useHistory, useLocation, useRouteMatch } from "react-router-dom";
import firebase from "firebase/app";
import jwt from "jsonwebtoken";
import { saveHoversToBrowser } from "../utils/UserClicks";
import useSaveClicks from "../hooks/useSaveClicks";
import useSaveHovers from "../hooks/useSaveHovers";
import useSaveScroll from "../hooks/useSaveScroll";

const ClicksContext = createContext({});

export const ClicksProvider = ({ children }) => {
  const date = new Date();
  const db = firebase.firestore();
  const location = useLocation();
  const refLocation = useRef("/");
  const [clicks, setClicks] = useState([]);
  const [allowedpages, setAllowedpages] = useState([]);
  const [hovers, setHovers] = useState([]);
  const [hoversLocation, setHoversLocation] = useState(null);
  const { REACT_APP_JWT_TOKEN, REACT_APP_BACKEND_URL } = process.env;

  const getAloowedPages = async () => {
    const tempArr = [];
    await db
      .collection("heatMap")
      .get()
      .then((snapshot) => {
        snapshot.forEach((doc) => {
          const rooms = doc.data();
          rooms.id = doc.id;
          tempArr.push(rooms);
        });
      });
    setAllowedpages(tempArr);
  };

  //hover data
  const trackHoverData = (path, data) => {
    // console.log("hover data function : ", data);
    if (Object.keys(data).length !== 0 && data.constructor === Object) {
      const { obj } = data;
      setHovers((hovers) => [...hovers, obj]);
      setHoversLocation(path);
    }
  };
  useSaveClicks();
  useSaveHovers();
  useSaveScroll();
  useEffect(() => {
    getAloowedPages();
  }, []);

  useEffect(() => {
    if (localStorage.getItem("ec_page_clicks") === null) {
      localStorage.setItem("ec_page_clicks", JSON.stringify([]));
    }
    if (localStorage.getItem("ec_page_hovers") === null) {
      localStorage.setItem("ec_page_hovers", JSON.stringify([]));
    }
    if (localStorage.getItem("ec_page_scrolls") === null) {
      localStorage.setItem("ec_page_scrolls", JSON.stringify([]));
    }
  }, []);

  useEffect(() => {
    if (hovers?.hover?.length !== 0 && hoversLocation) {
      console.log(hoversLocation);
      saveHoversToBrowser(hovers, hoversLocation, allowedpages);
      setHoversLocation(null);
      setHovers([]);
    }
  }, [location?.pathname]);

  const clicksContext = {
    // countClicks,
    // clicks,
    // setClicks,
    allowedpages,
    // refLocation,
    trackHoverData,
  };

  return (
    <ClicksContext.Provider value={clicksContext}>
      {children}
    </ClicksContext.Provider>
  );
};

export const ClicksConsumer = ClicksContext.Consumer;

export default ClicksContext;
