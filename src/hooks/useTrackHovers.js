import React, { useEffect, useRef, useContext } from "react";
import ClicksContext from "../contexts/ClicksContext";
import { countClicks } from "../utils/UserClicks";

const useTrackHovers = (status, eventType, location, element = window) => {
  const { trackHoverData } = useContext(ClicksContext);

  useEffect(() => {
    let obj1 = {};
    const update = (e) => {
      obj1 = countClicks(e);
    };
    let timer = null;
    if (status === false) return;
    if (element == null) return;

    if (status) {
      element.addEventListener(eventType, update);
      timer = setInterval(() => {
        trackHoverData(location, obj1);
      }, 2000);
    }
    return () => {
      element.removeEventListener(eventType, update);
      clearInterval(timer);
    };
  }, [status, eventType, element]);
};

export default useTrackHovers;
