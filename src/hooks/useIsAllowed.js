import React, { useEffect, useRef, useContext } from "react";
import ClicksContext from "../contexts/ClicksContext";
import useEventListener from "./useEventListener";
import { checkUrl } from "../utils/UserClicks";

const useIsAllowed = (path) => {
  const pageStatus = useRef(false);
  const testRef = useRef({
    status: false,
    hovers: false,
    clicks: false,
    scroll: false,
    visits: false,
    pageID: null,
  });
  const { allowedpages } = useContext(ClicksContext);
  const pageURL = checkUrl(path);
  useEffect(() => {
    if (allowedpages) {
      checkPageStatus(pageURL, allowedpages);
    } else {
      console.log("pageStatus.current is : ", pageStatus.current);
    }
  }, [allowedpages]);

  const checkPageStatus = (url, arr) => {
    let itemIndex = null;
    if (
      arr?.some((item, index) => {
        itemIndex = index;
        return url === item?.path;
        // return url.toLowerCase().includes(item.path.toLowerCase());
      })
    ) {
      console.log("page is allowed");
      checkPageTracking(arr[itemIndex]);
      testRef.current.status = true;
    } else {
      console.log("page is not allowed");
      pageStatus.current = false;
    }
  };

  const checkPageTracking = (item) => {
    testRef.current.pageID = item?.id;
    // console.log("item is : ", item);
    if (item?.hovers) {
      //   console.log("hover tracking is : ", item?.hovers);
      testRef.current.hovers = true;
    }
    if (item?.clicks) {
      //   console.log("click tracking is : ", item?.clicks);
      testRef.current.clicks = true;
    }
    if (item?.scroll) {
      //   console.log("scroll tracking is : ", item?.scroll);
      testRef.current.scroll = true;
    }
    if (item?.visits) {
      //   console.log("visits tracking is : ", item?.visits);
      testRef.current.visits = true;
    }

    console.log(testRef.current);
  };

  return testRef.current;
};

export default useIsAllowed;
