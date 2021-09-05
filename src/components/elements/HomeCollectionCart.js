import React, { useEffect } from "react";
import { useHistory } from "react-router-dom";

import styled from "styled-components";
import { motion } from "framer-motion";
import Button from "./Button";

const HomeCollectionCart = ({
  img,
  title,
  text,
  type,
  origin,
  hasBeenViewed,
}) => {
  let isMounted = true;
  const history = useHistory();
  const cid = 1;
  const CollectionCardVariants = {
    hidden: { x: origin },
    visible: {
      x: 0,
      transition: { duration: 1, type: "Inertia" },
    },
  };

  return (
    <Container
      variants={CollectionCardVariants}
      animate={hasBeenViewed ? "visible" : "hidden"}
      initial="hidden"
    >
      <div className="HomeCollectionCart-left">
        <h3>{type}</h3>
        <h2>{title}</h2>
        <p>{text}</p>
        <Button
          handleClick={() => {
            history.push(`/collection/${cid}`);
          }}
          bg="#fff"
          color="#393d46"
          title="Voir plus"
          border="#393d46"
          hover="#393d46"
          margin="0"
          radius="0"
        />
      </div>
      <div className="HomeCollectionCart-img">
        <img src={img} alt="collection-image" />
      </div>
    </Container>
  );
};

export default HomeCollectionCart;

const Container = styled(motion.div)`
  background: #fff;
  padding: 2em 1em;
  display: grid;
  grid-template-columns: 50% 50%;
  .HomeCollectionCart-left {
    display: flex;
    flex-direction: column;
    justify-content: space-around;
  }
  .HomeCollectionCart-img {
    display: flex;
    justify-content: center;
    align-items: center;
    img {
      width: 98%;
    }
  }
  h2,
  h3,
  p {
    margin: 2em 0;
  }
  h2 {
    color: #393d46;
    font-size: 28px;
    font-weight: 400;
    text-transform: uppercase;
    line-height: 1em;
  }
  h3 {
    color: #393d46;
    font-size: 16px;
    font-weight: 500;
    text-transform: uppercase;
    line-height: 1.5em;
  }
  p {
    color: #68768e;
    font-size: 14px;
    font-weight: 400;
    line-height: 1.9em;
  }
  @media only screen and (max-width: 1200px) {
    /* margin: 0.5em 0; */
    h2 {
      font-size: 20px;
    }
    h3,
    p {
      font-size: 13px;
    }
  }
  @media only screen and (max-width: 768px) {
    grid-template-columns: 100% !important;
    .HomeCollectionCart-left {
      margin-bottom: 2em;
    }
  }
`;
