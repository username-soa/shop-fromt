import React, { useState, useContext, useEffect } from "react";
import styled from "styled-components";
import { motion } from "framer-motion";
import { useHistory } from "react-router-dom";
import { ReactComponent as SearchIcone } from "../../assets/close.svg";

const Menu = ({ state, setState }) => {
  let isMounted = true;
  const HeaderSearchBarVariants = {
    hidden: { y: "-100vh" },
    visible: {
      y: 0,
      transition: { duration: 1, type: "Inertia" },
    },
  };
  const [search, serSearch] = useState("");
  const history = useHistory();

  const handleSearch = (e) => {
    if (e.key === "Enter" && e.target.value.length !== 0) {
      setState(false);
      history.push(`/search/${e.target.value}`);
    }
  };

  return (
    <Container
      initial="hidden"
      animate="visible"
      variants={HeaderSearchBarVariants}
      exit={{ opacity: 0, transition: { duration: 0.5, type: "Inertia" } }}
    >
      <input
        type="text"
        onChange={(e) => serSearch(e.target.value)}
        placeholder="Search..."
        className="search-input"
        onKeyDown={handleSearch}
      />
      <SearchIcone
        onClick={() => {
          setState(false);
        }}
      />
    </Container>
  );
};
export default Menu;

const Container = styled(motion.div)`
  display: flex;
  justify-content: center;
  align-items: center;
  background: #393d46;
  width: 100vw;
  height: 100vh;
  position: fixed;
  top: 0;
  left: 0;
  opacity: 0.9;
  z-index: 999;
  .search-input {
    padding: 10px 6px;
    background: transparent;
    color: #fff;
    width: 70%;
    border-bottom: 2px solid #fff;
  }
  .search-input::placeholder {
    /* Chrome, Firefox, Opera, Safari 10.1+ */
    color: #fff;
    opacity: 1; /* Firefox */
  }

  .search-input::-ms-input-placeholder {
    /* Internet Explorer 10-11 */
    color: #fff;
  }

  .search-input::-ms-input-placeholder {
    /* Microsoft Edge */
    color: #fff;
  }
  svg {
    cursor: pointer;
    margin: 0 1em;
    width: 18px;
    height: 18px;
    fill: #fff !important;
    path {
      fill: #fff !important;
      g {
        fill: #fff !important;
      }
    }
  }
`;
