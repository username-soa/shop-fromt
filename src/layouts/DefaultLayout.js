import React, { useState, useRef, useContext, useEffect } from "react";
import styled from "styled-components";
import { useLocation } from "react-router-dom";
import { AnimatePresence } from "framer-motion";
import firebase from "firebase/app";
import jwt from "jsonwebtoken";
import Header from "../components/FixedElements/Header";
import Menu from "../components/FixedElements/Menu";
import Footer from "../components/FixedElements/Footer";
import CartSideMenu from "../components/FixedElements/CartSideMenu";
import ClientContext from "../contexts/ClientContext";

const Layout = ({ children }) => {
  const { cartsidemenu, setCartsidemenu, checkoutEC, isOpen, setIsOpen } =
    useContext(ClientContext);
  const location = useLocation();
  const scrollRef = useRef(null);
  const [sideMenu, setSideMenu] = useState(false);
  const [scrollDir, setScrollDir] = useState(null);
  const [feedback, setFeeadback] = useState({ status: null, message: null });
  const db = firebase.firestore();

  const sendEmail = async (data) => {
    const userToken = localStorage.getItem("ec_user_token");
    let aid = null;
    jwt.verify(
      userToken,
      "d6d82b79-5226-454c-a36d-17bc13bcd6f2",
      (err, decoded) => {
        if (decoded) {
          aid = decoded.aid;
        }
      }
    );
    console.log(data);
    await db
      .collection("newsLetter")
      .add({
        createdAt: firebase.firestore.Timestamp.fromDate(new Date()),
        email: data.email,
        aid: aid,
      })
      .then((docRef) => {
        console.log(docRef.id);
        setFeeadback({
          ...feedback,
          status: 1,
          message: "Email ajouté avec succès",
        });
        setTimeout(() => {
          setFeeadback({ ...feedback, status: null, message: null });
        }, 1500);
      })
      .catch((err) => {
        console.log(err);
        setFeeadback({ ...feedback, status: -1, message: err.message });
        setTimeout(() => {
          setFeeadback({ ...feedback, status: null, message: null });
        }, 1500);
      });
  };

  return (
    <Container sideMenu={sideMenu} status={scrollDir}>
      <div className="menu">
        <Menu sideMenu={sideMenu} setSideMenu={setSideMenu} />
      </div>
      <div className="body">
        <div
          id="myHeader"
          className={
            scrollDir === "up"
              ? "header fadeOut"
              : scrollDir === "down"
              ? "header fadeIn"
              : scrollDir === "normal"
              ? "header"
              : "header"
          }
          ref={scrollRef}
        >
          <Header sideMenu={sideMenu} setSideMenu={setSideMenu} />
        </div>
        <div className="content">
          {React.cloneElement(children, { url: location.pathname })}
        </div>

        <div className="footer">
          <Footer />
        </div>
      </div>
      <AnimatePresence>
        {isOpen && (
          <CartSideMenu
            checkoutEC={checkoutEC}
            menuStatus={isOpen}
            closeSideMenu={() => {
              setIsOpen(false);
            }}
          />
        )}
      </AnimatePresence>
    </Container>
  );
};

export default Layout;

const Container = styled.div`
  display: flex;
  flex-direction: column;
  background: #f6f7fb;
  overflow-x: hidden;
  .menu {
    transition: all 0.3s;
    position: fixed;
    top: 0;
    left: 0;
    width: ${(props) => (props.sideMenu ? "100%" : "0")};
    min-height: 100vh;
    z-index: 999;
  }
  .header {
    width: 100%;
    z-index: 999;
  }
  .content {
    width: 100%;
    min-height: calc(100vh - 150px);
  }
  .footer {
    width: 100%;
  }
  @media only screen and (max-width: 400px) {
    .menu {
      width: ${(props) => (props.sideMenu ? "100vw" : "0")};
    }
  }
  @-webkit-keyframes stick {
    from {
      opacity: 0.5;
    }
    to {
      opacity: 1;
    }
  }
  @keyframes stick {
    from {
      opacity: 0.5;
    }
    to {
      opacity: 1;
    }
  }
  @-webkit-keyframes fadeOut {
    from {
      opacity: 1;
    }
    to {
      opacity: 0.5;
    }
  }
  @keyframes fadeOut {
    from {
      opacity: 1;
    }
    to {
      opacity: 0.5;
    }
  }
`;
