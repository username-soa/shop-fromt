import React, { useState, useContext } from "react";
import styled from "styled-components";
import { Link, useLocation, useHistory } from "react-router-dom";
import { ReactComponent as PlusIcone } from "../../assets/down-arrow.svg";
import { ReactComponent as InfoIcone } from "../../assets/user2.svg";
import { ReactComponent as AdresseIcone } from "../../assets/adress-book.svg";
import { ReactComponent as OrderIcone } from "../../assets/sent.svg";
import { ReactComponent as LogoutIcone } from "../../assets/logout.svg";
import UserContext from "../../contexts/UserExperienceContext";
import jwt from "jsonwebtoken";

const UserProfileNavigator = () => {
  const [expand, setExpand] = useState(0);
  const [highlight, setHighlight] = useState(0);
  const { saveUserEvent } = useContext(UserContext);
  let location = useLocation();
  const history = useHistory();

  const checkLocation = () => {
    switch (location.pathname) {
      case "/account":
        return 1;
      case "/account/adresse":
        return 2;
      case "/account/commandes":
        return 3;
      case "/account/archifier":
        return 4;
      default:
        break;
    }
  };
  const getName = () => {
    switch (location.pathname) {
      case "/account":
        return "Vous Informations";
      case "/account/adresse":
        return "Votre adresse";
      case "/account/commandes":
        return "Vos commandes";
      case "/account/archifier":
        return "Vos archive";
      default:
        break;
    }
  };
  const getSvg = () => {
    switch (location.pathname) {
      case "/account":
        return <InfoIcone />;
      case "/account/adresse":
        return <AdresseIcone />;
      case "/account/commandes":
        return <OrderIcone />;

      default:
        break;
    }
  };

  const disconnect = async () => {
    if (localStorage.getItem("ec_user_token") !== null) {
      const userToken = localStorage.getItem("ec_user_token");
      jwt.verify(
        userToken,
        "d6d82b79-5226-454c-a36d-17bc13bcd6f2",
        async (err, decoded) => {
          await saveUserEvent(decoded?.documentId, "logout");
        }
      );
    }
    localStorage.removeItem("ec_shopify_token");
    localStorage.removeItem("ec_shopify_accessToken");
    history.push("/");
  };

  return (
    <Container show={highlight}>
      <div className={highlight ? "navigation-top active" : "navigation-top"}>
        <div className="navigation-top-left">
          {getSvg()}
          <span> {getName()}</span>
        </div>
        <PlusIcone
          onClick={() => setHighlight(!highlight)}
          className={highlight ? "rotate" : null}
        />
      </div>
      <div
        className={
          highlight ? "navidation-content active" : "navidation-content"
        }
      >
        <Link to="/account">
          <div
            className={
              checkLocation() === 1
                ? "navigator-link extra-padding navigator-border-bottom active-navigation"
                : "navigator-link extra-padding navigator-border-bottom"
            }
          >
            <InfoIcone />
            Modifier vous informations
          </div>
        </Link>
        <Link to="/account/adresse">
          <div
            className={
              checkLocation() === 2
                ? "navigator-link extra-padding navigator-border-bottom active-navigation"
                : "navigator-link extra-padding navigator-border-bottom "
            }
          >
            <AdresseIcone />
            Votre Adresse
          </div>
        </Link>
        <Link to="/account/commandes">
          {" "}
          <div
            className={
              checkLocation() === 3
                ? "navigator-link extra-padding navigator-border-bottom active-navigation"
                : "navigator-link extra-padding navigator-border-bottom "
            }
          >
            <OrderIcone />
            Votre Liste des commandes
          </div>
        </Link>

        <div className="navigator-link">
          <LogoutIcone />
          <button onClick={disconnect}>Déconnexion</button>
        </div>
      </div>
    </Container>
  );
};

export default UserProfileNavigator;

const Container = styled.div`
  margin-right: 1em;
  background: #fff;
  box-shadow: rgb(237 239 247 / 47%) 0px 10px 20px,
    rgb(237 239 247 / 47%) 0px 6px 6px;
  height: fit-content;
  .navigator-link {
    color: #676767;
    width: 100%;
    cursor: pointer;
    font-weight: 500;
    font-size: 0.9rem;
    display: flex;
    align-items: center;
    svg {
      opacity: 0.4;
      margin: 0 1em;
    }
    button {
      width: 100%;
      height: 100%;
      padding: 1em 0;
      background: transparent;
      text-align: left;
      font-weight: 500;
      font-size: 0.9rem;
      color: #676767;
    }
    &.active-navigation {
      color: #222 !important;
      font-weight: 600;
      border-right: 2px solid #000;
      background: RGBA(159, 162, 180, 0.08);
      svg {
        opacity: 1;
      }
    }
  }
  .extra-padding {
    padding: 1em 0;
  }
  svg {
    transition: all 0.3s ease-in-out;
    cursor: pointer;
    width: 18px;
    height: 18px;
    margin-right: 0.5em;
  }
  .navigator-border-bottom {
  }
  @media only screen and (min-width: 1200px) {
    .navigation-top {
      display: none;
    }
  }
  @media only screen and (max-width: 1200px) {
    margin-right: 0;
    .navigation-top {
      display: flex;
      align-items: center;
      justify-content: space-between;
      padding: 1em 0;
      margin: 0 1em;
      svg {
        &.rotate {
          transform: rotate(180deg);
        }
      }
      .navigation-top-left {
        display: flex;
        align-items: center;
      }
    }
    .navidation-content {
      height: 0;
      &:nth-child(n) {
        display: none;
      }
      &.active {
        height: fit-content;
        &:nth-child(n) {
          display: block;
        }
      }
    }
  }
`;
