import React, { useEffect, useRef, useContext } from "react";
import ClicksContext from "../contexts/ClicksContext";
import { saveScrollsToBrowser } from "../utils/UserClicks";

const usePageScrolls = (status, eventType, location, element = window) => {
  const { allowedpages } = useContext(ClicksContext);

  useEffect(() => {
    let obj1 = null;
    let timer = null;

    const trackScroll = () => {
      const t = new Date();
      const finaObj = {};
      finaObj.x = 1;
      var body = document.body,
        html = document.documentElement,
        docHeight = Math.max(
          body.scrollHeight,
          body.offsetHeight,
          html.clientHeight,
          html.scrollHeight,
          html.offsetHeight
        ),
        winHeight = window.innerHeight || html.clientHeight,
        scrollTop = body.scrollTop || html.scrollTop;
      var trackLength = docHeight - winHeight;
      finaObj.y = Math.floor((scrollTop / trackLength) * 1000);
      finaObj.uniqueProp = t.getTime();
      return { ...finaObj };
    };

    const update = () => {
      if (timer !== null) {
        clearTimeout(timer);
      }
      timer = setTimeout(function () {
        obj1 = trackScroll();
        saveScrollsToBrowser(obj1, location, allowedpages);
        console.log(obj1);
      }, 500);
    };

    if (status === false) return;
    if (element == null) return;
    if (status) {
      element.addEventListener(eventType, update);
    }
    return () => {
      element.removeEventListener(eventType, update);
      clearTimeout(timer);
    };
  }, [status, eventType, element]);
};

export default usePageScrolls;
