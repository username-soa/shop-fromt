import React, { useEffect, useRef, useContext } from "react";
import ClicksContext from "../contexts/ClicksContext";
import { countClicks, saveClicksToBrowser } from "../utils/UserClicks";

const usePageClicks = (status, eventType, location, element = window) => {
  const { allowedpages } = useContext(ClicksContext);

  useEffect(() => {
    const trackClick = (e) => {
      const { obj } = countClicks(e);
      saveClicksToBrowser(obj, location, allowedpages);
      console.log(obj);
    };

    if (status === false) return;
    if (element == null) return;
    if (status) {
      element.addEventListener(eventType, trackClick);
    }
    return () => {
      element.removeEventListener(eventType, trackClick);
    };
  }, [status, eventType, element]);
};

export default usePageClicks;
