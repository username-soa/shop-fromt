import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { motion } from "framer-motion";
import { useLocation } from "react-router-dom";
import firebase from "firebase/app";
import CustomHelmet from "../components/elements/CustomHelmet";
import FeedBack from "../components/elements/FeedBack";
import ContactForm from "../components/FormeComponents/ContactForm";
import jwt from "jsonwebtoken";
import { ReactComponent as EmailIcone } from "../assets/email.svg";
import { ReactComponent as PhoneEmail } from "../assets/phone-call.svg";
import { ReactComponent as LocationIcone } from "../assets/pin.svg";
import { ReactComponent as FacebookIcone } from "../assets/facebook.svg";
import { ReactComponent as InstagramIcone } from "../assets/instagram.svg";
import { ReactComponent as TwitterIcone } from "../assets/twitter.svg";
import useIsAllowed from "../hooks/useIsAllowed";
import useTrackHovers from "../hooks/useTrackHovers";
import usePageClicks from "../hooks/usePageClicks";
import usePageVisits from "../hooks/usePageVisits";
import usePageScrolls from "../hooks/usePagsScrolls";

const ContactPage = () => {
  const location = useLocation();
  const pageStatus = useIsAllowed(location?.pathname);
  usePageClicks(pageStatus?.clicks, "mousedown", location?.pathname);
  useTrackHovers(pageStatus?.hovers, "mousemove", location?.pathname);
  usePageScrolls(pageStatus?.scroll, "scroll", location?.pathname);
  usePageVisits(pageStatus?.visits, pageStatus?.pageID);

  const H2Variants = {
    hidden: { opacity: 0, y: "100px" },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.5, delay: 1, type: "Inertia" },
    },
  };
  const db = firebase.firestore();
  const [feedback, setFeedback] = useState({ status: null, message: null });

  const sendMessage = async (data) => {
    const obj = {
      email: data.email,
      fname: data.fname,
      lname: data.lname,
      phone: data.email,
    };
    let userID = null;
    try {
      const userToken = localStorage.getItem("ec_user_token");
      jwt.verify(
        userToken,
        "d6d82b79-5226-454c-a36d-17bc13bcd6f2",
        (err, decoded) => {
          if (decoded) {
            userID = decoded.documentId;
          }
        }
      );
      db.collection("clientsMessages")
        .add({
          ...obj,
          seen: false,
          createdAt: firebase.firestore.Timestamp.fromDate(new Date()),
          messages: firebase.firestore.FieldValue.arrayUnion({
            message: data.message,
            type: "sender",
          }),
        })
        .then(() => {
          setFeedback({
            status: 1,
            message: "Votre message est envoyer, restez à l'écoute !",
          });
          setTimeout(() => {
            setFeedback({ status: null, message: null });
          }, 2000);
        })
        .catch((err) => {
          console.log(err.message);
          setFeedback({ status: -1, message: err.message });
          setTimeout(() => {
            setFeedback({ status: null, message: null });
          }, 2000);
        });
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <Container
      className="contact-page"
      exit={{
        opacity: 0,
        transition: { ease: "easeInOut" },
      }}
    >
      <CustomHelmet title="Contacter nous" />
      <motion.div
        animate="visible"
        initial="hidden"
        variants={H2Variants}
        className="contact-left"
      >
        <div className="contact-header extra-padding">
          <h2>Contact informations</h2>
          <p>
            Remplissez le formulaire et notre équipe vous répondra dans les 24
            heures
          </p>
        </div>
        <div className="contact-info">
          <div className="channel-info">
            <PhoneEmail />
            <h5 className="span-info">+212 528230735</h5>
          </div>
          <div className="channel-info">
            <LocationIcone />
            <h5 className="span-info">shop.contact@gmail.com</h5>
          </div>
          <div className="channel-info">
            <EmailIcone />
            <h5 className="span-info"> N° 19 Rue Tambouktou Cité El Massira</h5>
          </div>
        </div>
        <div className="socials">
          <div className="socials-svg">
            <a href="https://www.facebook.com" target="_blank" rel="noreferrer">
              <FacebookIcone />
            </a>
          </div>
          <div className="socials-svg">
            <a
              href="https://www.instagram.com"
              target="_blank"
              rel="noreferrer"
            >
              <InstagramIcone />
            </a>
          </div>
          <div className="socials-svg">
            <a href="https://www.twitter.com" target="_blank" rel="noreferrer">
              <TwitterIcone />
            </a>
          </div>
        </div>
      </motion.div>
      <motion.div
        animate="visible"
        initial="hidden"
        variants={H2Variants}
        className="contact-right"
      >
        <ContactForm handleClick={sendMessage} feedback={feedback} />
      </motion.div>
      {feedback?.status ? (
        <FeedBack bg="#000" color="#fff" message={feedback?.message} />
      ) : null}
    </Container>
  );
};

export default ContactPage;

const Container = styled(motion.div)`
  display: flex;
  padding: 1em;
  background: #f8f8f8;
  height: 100vh;
  width: 100vw;
  overflow: hidden;
  h2 {
    font-size: 1.5rem;
    font-weight: 500 !important;
    letter-spacing: 7px;
    margin: 1em 0;
  }
  h5 {
    font-size: 0.9rem;
    font-weight: 300 !important;
    display: inline;
    text-overflow: ellipsis;
    white-space: nowrap;
    overflow: hidden;
    min-width: 100px;
  }
  p {
    font-size: 0.9rem;
    font-weight: 300;
    margin: 1em 0;
  }
  .contact-left {
    max-width: 400px;
    max-height: 100vh;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    border-radius: 10px;
    color: #faf3e0;
    padding: 1em 2em;
    background: #1e212d;
    box-shadow: rgb(237 239 247 / 47%) 0px 10px 20px,
      rgb(237 239 247 / 47%) 0px 6px 6px;
  }
  .extra-padding {
    padding: 0 1.5em;
  }
  .channel-info {
    padding: 1em;
    border-radius: 10px;
    font-size: 0.9rem;
    margin: 2em 0;
    cursor: copy;
    transition: all 0.3s ease-in-out;
    svg {
      margin-right: 1em;
      g {
        path {
          fill: #fff !important;
        }
      }
    }
    &:hover {
      background: #f8f8f8;
      color: #222;
      svg {
        g {
          path {
            fill: #222 !important;
          }
        }
      }
    }
  }
  .socials {
    display: flex;
    justify-content: center;
    align-items: center;
    .socials-svg {
      margin: 0 2em;
      padding: 0.5em;
      display: flex;
      justify-content: center;
      align-items: center;
      width: 40px;
      height: 40px;
      border-radius: 100%;
      cursor: pointer;
      transition: all 0.3s ease-in-out;
      &:hover {
        background: #f8f8f8;
        svg {
          path,
          circle {
            fill: #222 !important;
          }
          g {
            path {
              fill: #222 !important;
            }
          }
        }
      }
    }
    svg {
      path,
      circle {
        fill: #fff !important;
      }
      g {
        path {
          fill: #fff !important;
        }
      }
    }
  }
  svg {
    width: 18px;
    height: 18px;
  }
  @media only screen and (max-width: 1000px) {
    flex-direction: column;
    background: #1e212d;
    align-items: center;
    min-height: 100vh;
    overflow-y: scroll;
    h2 {
      width: fit-content;
      margin: 1em auto;
    }
    .socials {
      display: none;
    }
    .contact-header {
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
    }
    .contact-info {
      display: flex;
      .channel-info {
        margin: 0 auto;
        width: 30%;
        display: flex;
        flex-direction: column;
        justify-content: space-between;
        overflow: hidden;
        svg {
          align-self: center;
          margin: 1em;
          width: 20px;
          height: 20px;
        }
      }
    }
    .contact-left {
      max-width: unset;
      width: 100%;
      padding: 1em 0;
      box-shadow: none;
      background: transparent;
    }
  }
  @media only screen and (max-width: 600px) {
    .contact-info {
      flex-direction: column;
      justify-content: center;
      align-items: center;
      .channel-info {
        width: 80%;
        margin: 0.25em 0;
        h5 {
          align-self: center;
        }
      }
    }
  }
`;
