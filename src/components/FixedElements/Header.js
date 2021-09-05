import React, { useState, useRef, useEffect, useContext } from "react";
import styled from "styled-components";
import { Link, NavLink, useHistory } from "react-router-dom";
import { AnimatePresence } from "framer-motion";
import HeaderSearchBar from "./HeaderSearchBar";
import { ReactComponent as LogoIcone } from "../../assets/logo.svg";
import { ReactComponent as MenuIcone } from "../../assets/menu.svg";
import { ReactComponent as UserIcone } from "../../assets/user.svg";
import { ReactComponent as Search } from "../../assets/loupe.svg";
import { ReactComponent as Close } from "../../assets/cancel2.svg";
import { ReactComponent as FavoritIcone } from "../../assets/heart.svg";
import { ReactComponent as ChoppingCart } from "../../assets/shopping-cart.svg";
import ClientContext from "../../contexts/ClientContext";
import Button from "../elements/Button";

const Header = ({ sideMenu, setSideMenu }) => {
  let isMounted = true;
  const { cartItems } = useContext(ClientContext);
  const [showSearch, setShowSearch] = useState(false);
  const [totalqte, setTotalqte] = useState(null);
  const history = useHistory();
  const token = localStorage.getItem("ec_shopify_token");
  const accessToken = localStorage.getItem("ec_shopify_accessToken");

  const getTotalQte = () => {
    let total = null;
    cartItems?.map((item) => {
      total += parseFloat(item?.qte);
    });
    return total;
  };

  useEffect(() => {
    if (isMounted) {
      const t = getTotalQte();
      if (t > 0) {
        setTotalqte(t);
      } else if (t <= 0) {
        setTotalqte(null);
      }
    }
    return () => {
      isMounted = false;
    };
  }, [cartItems]);

  return (
    <Container totalqte={totalqte}>
      <div className="menu-icon">
        <MenuIcone
          onClick={() => {
            setSideMenu(true);
          }}
        />
      </div>
      <div className="header-right">
        <Link to="/">
          <h2 className="header-right-h2">Yacado Pêche.</h2>
        </Link>
        <div className="svgs-wrp">
          <Search onClick={() => setShowSearch(true)} />
          <ChoppingCart onClick={() => history.push("/shopping-cart")} />
          <Link to="/account/login">
            <Button
              bg="#393d46"
              color="#fff"
              title="Login"
              margin="0"
              radius="0"
            />
          </Link>
        </div>
      </div>
      <AnimatePresence>
        {showSearch && <HeaderSearchBar setState={setShowSearch} />}
      </AnimatePresence>
    </Container>
  );
};

export default Header;

const Container = styled.div`
  display: grid;
  grid-template-columns: 150px auto;
  height: 150px;

  .menu-icon {
    background: #393d46;
    display: flex;
    justify-content: center;
    align-items: center;
    svg {
      width: 30px;
      height: 30px;
    }
  }
  .header-right {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 0 1em;
  }
  .header-right-h2 {
    font-size: 1.5rem;
    font-weight: 600;
    color: #393d46;
  }
  svg {
    cursor: pointer;
  }
  .svgs-wrp {
    margin: 0 1em;
    display: flex;
    justify-content: center;
    align-items: center;
    svg {
      margin: 0 1em;
      cursor: pointer;
      fill: #393d46 !important;
      g {
        fill: #393d46 !important;
      }
    }
  }
  @media only screen and (max-width: 1000px) {
    height: 100px;
    grid-template-columns: 100px auto !important;
    .header-right-h2 {
      font-size: 1.2rem;
    }
    .menu-icon {
      svg {
        width: 25px;
        height: 25px;
      }
    }
  }
  @media only screen and (max-width: 550px) {
    .svgs-wrp {
      display: none;
    }
  }
`;
