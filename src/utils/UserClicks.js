import { isDesktop, isTablet, isMobile } from "react-device-detect";

const clickX = (event) => {
  var coordinateX;

  if (event == null) {
    coordinateX = 0;
  } else {
    coordinateX = event.pageX;
  }

  return coordinateX;
};

const clickY = (event) => {
  var coordinateY;

  if (event == null) {
    coordinateY = 0;
  } else {
    coordinateY = event.pageY;
  }

  return coordinateY;
};

const screenX = (e) => {
  var body = document.body;
  var html = document.documentElement;
  var width = Math.max(
    body.scrollWidth,
    body.offsetWidth,
    html.clientWidth,
    html.scrollWidth,
    html.offsetWidth
  );

  return width;
};

const screenY = (e) => {
  var body = document.body;
  var html = document.documentElement;
  var height = Math.max(
    body.scrollHeight,
    body.offsetHeight,
    html.clientHeight,
    html.scrollHeight,
    html.offsetHeight
  );

  return height;
};

const clickrelativeX = (e) => {
  var clickCoordinateX = clickX(e);
  var screenCoordinateX = screenX(e);
  var relativeX;
  relativeX = (clickCoordinateX / screenCoordinateX).toFixed(4);
  return relativeX;
};

const clickrelativeY = (e) => {
  var clickCoordinateY = clickY(e);

  var screenCoordinateY = screenY(e);

  var relativeY;
  relativeY = (clickCoordinateY / screenCoordinateY).toFixed(4);
  return relativeY;
};

const countClicks = (e) => {
  const t = new Date();
  const obj = {};
  obj.x = Math.floor(parseFloat(clickrelativeX(e)) * 1000);
  obj.y = Math.floor(parseFloat(clickrelativeY(e)) * 1000);
  obj.value = 1;
  obj.uniqueProp = t.getTime();
  // console.log(obj);
  return { obj };
};

const checkUrl = (url) => {
  let finalURL = "/";
  const arr = [
    "product-details",
    "contact",
    "search",
    "account",
    "login",
    "shopping-cart",
    "about",
    "account",
    "commandes",
    "adresse",
    "faqs",
    "privacy-policy",
    "livraison",
    "termes-conditions",
    "collection",
  ];
  if (url === "/") {
    return url;
  } else {
    const str = url.split("/");
    const newArr = str.filter((item) => {
      return arr.indexOf(item) > -1;
    });
    for (let i = 0; i < newArr.length; i++) {
      if (i === newArr.length - 1) {
        finalURL += newArr[i];
      } else {
        finalURL += newArr[i] + "/";
      }
    }
    return finalURL;
  }
};

const saveClicksToBrowser = (clickMap, pageURL, allowedPages) => {
  //getPageUID
  const source = checkUrl(pageURL);
  try {
    const clicksArray = JSON.parse(localStorage.getItem("ec_page_clicks"));
    if (
      clicksArray.some((item) => {
        return item.source === source;
      })
    ) {
      for (let i = 0; i < clicksArray.length; i++) {
        if (clicksArray[i].source === source) {
          clicksArray[i].clicks.push(clickMap);
          localStorage.setItem("ec_page_clicks", JSON.stringify(clicksArray));
          break;
        }
      }
    } else {
      const uid = allowedPages?.filter((page) => {
        return page.path === source;
      });

      const deviceType = isDesktop
        ? "desktop"
        : isTablet
        ? "tablet"
        : isMobile
        ? "mobile"
        : null;
      console.log(uid);
      clicksArray.push({
        pageID: uid[0].id,
        deviceType: deviceType,
        source: source,
        clicks: [],
      });
      localStorage.setItem("ec_page_clicks", JSON.stringify(clicksArray));
      console.log("does not contain");
    }
  } catch (err) {
    console.log(err.message);
  }
};

const saveScrollsToBrowser = (scrollMap, pageURL, allowedPages) => {
  const source = checkUrl(pageURL);
  try {
    const scrollArray = JSON.parse(localStorage.getItem("ec_page_scrolls"));
    if (
      scrollArray.some((item) => {
        return item.source === source;
      })
    ) {
      for (let i = 0; i < scrollArray.length; i++) {
        if (scrollArray[i].source === source) {
          scrollArray[i].scrolls.push(scrollMap);
          localStorage.setItem("ec_page_scrolls", JSON.stringify(scrollArray));
          break;
        }
      }
    } else {
      const uid = allowedPages?.filter((page) => {
        return page.path === source;
      });

      const deviceType = isDesktop
        ? "desktop"
        : isTablet
        ? "tablet"
        : isMobile
        ? "mobile"
        : null;
      console.log(uid);
      scrollArray.push({
        pageID: uid[0].id,
        deviceType: deviceType,
        source: source,
        scrolls: [],
      });
      localStorage.setItem("ec_page_scrolls", JSON.stringify(scrollArray));
      console.log("does not contain");
    }
  } catch (err) {
    console.log(err.message);
  }
};

const saveHoversToBrowser = (hoverMap, pageURL, allowedPages) => {
  const source = checkUrl(pageURL);
  try {
    const hoversArray = JSON.parse(localStorage.getItem("ec_page_hovers"));
    if (
      hoversArray.some((item) => {
        return item.source === source;
      })
    ) {
      for (let i = 0; i < hoversArray.length; i++) {
        if (hoversArray[i].source === source) {
          hoversArray[i].hovers = [...hoversArray[i].hovers, ...hoverMap];
          localStorage.setItem("ec_page_hovers", JSON.stringify(hoversArray));
          console.log("data saved");
          break;
        }
      }
    } else {
      const uid = allowedPages?.filter((page) => {
        return page.path === source;
      });

      const deviceType = isDesktop
        ? "desktop"
        : isTablet
        ? "tablet"
        : isMobile
        ? "mobile"
        : null;
      console.log(uid);
      hoversArray.push({
        pageID: uid[0].id,
        deviceType: deviceType,
        source: source,
        hovers: hoverMap,
      });
      localStorage.setItem("ec_page_hovers", JSON.stringify(hoversArray));
      console.log("does not contain");
      console.log("data saved");
    }
  } catch (err) {
    console.log(err.message);
  }
};

const checkPageStatus = (url, tempArr) => {
  // console.log("url : ", url);
  // console.log("tempArr : ", tempArr);
  if (
    tempArr.some((path) => {
      return path.path === url;
    })
  ) {
    console.log("page is allowed");
    return true;
  } else {
    console.log("page is not allowed");
    return false;
  }
};

export {
  saveScrollsToBrowser,
  saveHoversToBrowser,
  saveClicksToBrowser,
  checkPageStatus,
  countClicks,
  checkUrl,
};
