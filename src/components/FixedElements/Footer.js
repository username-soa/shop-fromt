import React from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";
import { ReactComponent as FacebookIcone } from "../../assets/facebook.svg";
import { ReactComponent as InstagramIcone } from "../../assets/instagram.svg";
import { ReactComponent as TwitterIcone } from "../../assets/twitter.svg";
import crats from "../../assets/credit.png";

const Footer = () => {
  return (
    <Container>
      <div className="top-footer">
        <div className="tbd">
          <h4 className="title-h4">À propos de nous</h4>
          <Link to="/about">
            <h4 className="data">À propos</h4>
          </Link>
          <Link to="/contact">
            <h4 className="data">Contact</h4>
          </Link>
        </div>
        <div className="about-us">
          <h4 className="title-h4">SUPPORT</h4>
          <Link to="/privacy-policy">
            <h4 className="data">Politique de Confidialité</h4>
          </Link>
          <Link to="/termes-conditions">
            <h4 className="data">Terms & Conditions</h4>
          </Link>
          <Link to="/faqs">
            <h4 className="data">FAQs</h4>
          </Link>
          <Link to="/livraison">
            <h4 className="data">Livraison</h4>
          </Link>
        </div>
        <div className="contact">
          <h4 className="title-h4">Trouvez Nous</h4>
          <h4 className="data">
            Adresse : N° 19 Rue Tambouktou Cité El Massira Agadir, Maroc
          </h4>
          <h4 className="data">Email : shop.contact@gmail.com</h4>
          <h4 className="data">Appel : +212 528230735</h4>
        </div>
      </div>
      <div className="botton-fotter">
        <div>
          <span className="data">© {new Date().getFullYear()} Shop</span>
        </div>
        <div>
          <img src={crats} alt="credit-cards" />
        </div>
        <div className="socials">
          <a href="https://www.facebook.com" target="_blank" rel="noreferrer">
            <FacebookIcone />
          </a>
          <a href="https://www.instagram.com" target="_blank" rel="noreferrer">
            <InstagramIcone />
          </a>
          <a href="https://www.twitter.com" target="_blank" rel="noreferrer">
            <TwitterIcone />
          </a>
        </div>
      </div>
    </Container>
  );
};
export default Footer;

const Container = styled.div`
  /* background: #393d46; */

  a {
    width: fit-content;
  }
  .top-footer {
    height: 100%;
    padding: 4em 1em 2em;
    display: grid;
    grid-template-columns: 1fr 1fr 1fr;
  }
  h4 {
    color: #393d46;
    font-weight: 500;
    font-size: 15px;
    text-overflow: ellipsis;
    white-space: nowrap;
    overflow: hidden;
    display: inline;
  }
  .title-h4 {
    margin-bottom: 1em;
    letter-spacing: 5px;
    text-transform: uppercase;
    transition: all 0.4s;
  }
  .data {
    margin-bottom: 0.5em;
    color: #68768e;
    cursor: pointer;
    &:hover {
      color: #abb3c4;
      white-space: nowrap;
    }
  }
  .tbd,
  .about-us,
  .contact {
    padding: 0 0.5em;
    display: flex;
    flex-direction: column;
  }
  .botton-fotter {
    display: flex;
    justify-content: space-between;
    align-items: center;
    flex-wrap: wrap;
    padding: 1em;
    transition: all 0.3s ease-in-out;
    a {
      padding: 0.75em 0.25em;
      margin: 0 0.25em;
      border-radius: 100%;
      transition: all 0.3s ease;
      &:hover {
        background: #68768e;
        opacity: 0.7;
        svg {
          path {
            fill: #fff !important;
          }
          g {
            path {
              fill: #fff !important;
            }
          }
        }
      }
    }
    svg {
      width: 18px;
      height: 18px;
      margin: 0 0.75em;
      cursor: pointer;
      fill: #393d46 !important;
      path,
      circle {
        fill: #393d46 !important;
      }
      g {
        path {
          fill: #393d46 !important;
        }
      }
    }
    .socials {
      display: flex;
    }
  }
  @media only screen and (max-width: 940px) {
    .top-footer {
      grid-template-columns: 100% !important;
      grid-template-rows: auto;
    }
    .botton-fotter {
      svg {
        margin: 0 0.5em;
      }
    }
  }
  @media only screen and (max-width: 768px) {
    .botton-fotter {
      flex-direction: column;
      align-items: flex-start;
      > div {
        margin: 1em 0;
      }
    }
  }
`;
