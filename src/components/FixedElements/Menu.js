import React, { useState, useContext, useEffect } from "react";
import styled from "styled-components";
import { NavLink } from "react-router-dom";
import MenuLink from "./MenuLink";
import MenuLinkParent from "./MenuLinkParent";
import ClientContext from "../../contexts/ClientContext";
import { ReactComponent as AccessoriesIcone } from "../../assets/headset.svg";
import { ReactComponent as AboutUs } from "../../assets/aboutus.svg";
import { ReactComponent as Category } from "../../assets/category.svg";
import { ReactComponent as ContactUs } from "../../assets/contactus.svg";
import { ReactComponent as CloseIcone } from "../../assets/cancel.svg";
import { ReactComponent as BrandIcone } from "../../assets/brand.svg";
import { ReactComponent as LogoIcone } from "../../assets/logo.svg";
import { ReactComponent as FacebookIcone } from "../../assets/facebook.svg";
import { ReactComponent as InstagramIcone } from "../../assets/instagram.svg";
import { ReactComponent as TwitterIcone } from "../../assets/twitter.svg";
import { ReactComponent as FaqsIcone } from "../../assets/faq.svg";
import { ReactComponent as TrustIcone } from "../../assets/trust.svg";
import { ReactComponent as ContractIcone } from "../../assets/contract.svg";
import { ReactComponent as ShippingIcone } from "../../assets/delivery.svg";

const Menu = ({ sideMenu, setSideMenu }) => {
  const { brands, homeoffers, collections } = useContext(ClientContext);
  let isMounted = true;
  const handleTitle = (t) => {
    return t?.replace("-brand", "");
  };

  return (
    <Container sideMenu={sideMenu}>
      <div className="links">
        <div className="links-top">
          <CloseIcone
            onClick={() => {
              setSideMenu(false);
            }}
          />
          <button onClick={() => setSideMenu(false)}>
            <NavLink to="/" className="top-link">
              <LogoIcone />
            </NavLink>
          </button>
        </div>
        <div className="links-content">
          <MenuLinkParent SvgComp={AccessoriesIcone} title="Suivez-nous sur">
            <MenuLink
              to="https://www.facebook.com"
              title="Facebook"
              external
              SvgIcone={FacebookIcone}
              state={sideMenu}
              setState={setSideMenu}
            />
            <MenuLink
              to="https://www.instagram.com"
              title="Instagram"
              external
              SvgIcone={InstagramIcone}
              state={sideMenu}
              setState={setSideMenu}
            />
            <MenuLink
              to="https://www.twitter.com"
              title="Twitter"
              external
              SvgIcone={TwitterIcone}
              state={sideMenu}
              setState={setSideMenu}
            />
          </MenuLinkParent>
          <MenuLinkParent SvgComp={AccessoriesIcone} title="À Propos De Nous">
            <MenuLink
              to="/about"
              title="À Propos"
              SvgIcone={AboutUs}
              state={sideMenu}
              setState={setSideMenu}
            />
            <MenuLink
              to="/contact"
              title="Contact"
              SvgIcone={ContactUs}
              state={sideMenu}
              setState={setSideMenu}
            />
          </MenuLinkParent>
          <MenuLinkParent SvgComp={AccessoriesIcone} title="Catégorie">
            {collections?.map((c, index) => {
              return (
                <MenuLink
                  to={`/categorie/${c?.id}`}
                  title={c?.title}
                  SvgIcone={Category}
                  state={sideMenu}
                  setState={setSideMenu}
                  key={`menu-link1_${index}`}
                />
              );
            })}
          </MenuLinkParent>
          <MenuLinkParent SvgComp={AccessoriesIcone} title="Support">
            <MenuLink
              to="/privacy-policy"
              title="Politique de confidentialité"
              SvgIcone={TrustIcone}
              state={sideMenu}
              setState={setSideMenu}
            />
            <MenuLink
              to="/livraison"
              title="Politique d'expédition"
              SvgIcone={ShippingIcone}
              state={sideMenu}
              setState={setSideMenu}
            />
            <MenuLink
              to="/termes-conditions"
              title="Termes et Conditions"
              SvgIcone={ContractIcone}
              state={sideMenu}
              setState={setSideMenu}
            />
            <MenuLink
              to="/faqs"
              title="FAQs"
              SvgIcone={FaqsIcone}
              state={sideMenu}
              setState={setSideMenu}
            />
          </MenuLinkParent>
        </div>
      </div>
    </Container>
  );
};
export default Menu;

const Container = styled.div`
  width: 100%;
  button {
    background: transparent;
  }
  svg {
    cursor: pointer;
  }
  .links-top {
    display: flex;
    align-items: center;
    justify-content: space-between;
    svg {
      margin: 0 2em;
    }
  }
  .links {
    width: 100%;
    height: 100vh;
    padding: 0.5em 0;
    transition: all 0.3s;
    width: 100%;
    background: #393d46;
    display: flex;
    flex-direction: column;
    overflow-y: scroll;
    .link-logo {
      width: 100px;
      height: 80px;
      img {
      }
    }
    .close-menu {
      display: flex;
      padding: 1em 2em;
      align-items: center;
      justify-content: flex-start;
    }
  }
  .links-content {
    padding: 0em 1em;
    display: flex;
    flex-wrap: wrap;
  }
  @media only screen and (max-width: 768px) {
    .links-top {
      justify-content: space-between;
    }
    .logo {
      svg {
        margin: 0 0.5em;
      }
    }
  }
`;
