import React, { useState } from "react";
import styled from "styled-components";
import { motion } from "framer-motion";
import Button from "../elements/Button";

const ProductInfo = () => {
  let isMounted = true;
  const ProductInfoVariants = {
    hidden: { x: "100vw" },
    visible: {
      x: 0,
      transition: { duration: 0.5, type: "Inertia" },
    },
  };
  const HeadersVariants = {
    hidden: { y: "100px", opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: { duration: 0.5, delay: 0.5, type: "Inertia" },
    },
  };
  const [Qte, setQte] = useState(1);
  const [productqte, setProductQte] = useState(1);

  return (
    <Container
      initial="hidden"
      animate="visible"
      variants={ProductInfoVariants}
    >
      <motion.h2 variants={HeadersVariants}>Produit ...</motion.h2>
      <motion.h3 variants={HeadersVariants}>
        {new Intl.NumberFormat("fr-FR", {
          style: "currency",
          currency: "MAD",
        }).format(114)}
      </motion.h3>
      <motion.p variants={HeadersVariants}>
        Lorem Ipsum is simply dummy text of the printing and typesetting
        industry. Lorem Ipsum has been the industry's standard dummy text ever
        since the 1500s
      </motion.p>
      <motion.div variants={HeadersVariants} className="product-qte-controll">
        <input
          type="number"
          id="points"
          name="points"
          className="inc-input"
          step="1"
          min="1"
          value={Qte}
          onChange={(e) => setQte(e.target.value)}
        />
        <Button
          handleClick={() => {
            return null;
          }}
          bg="#fff"
          color="#393d46"
          title="Ajouter aux panier"
          border="#393d46"
          hover="#393d46"
          margin="0"
          radius="0"
        />
      </motion.div>
    </Container>
  );
};

export default ProductInfo;

const Container = styled(motion.div)`
  background: #fff;
  padding: 2em;
  margin-left: 1em;
  border-radius: 10px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  box-shadow: rgb(237 239 247 / 47%) 0px 10px 20px,
    rgb(237 239 247 / 47%) 0px 6px 6px;
  h2 {
    color: #393d46;
    font-size: 1.5rem;
    font-weight: 500;
    line-height: 1.5em;
  }
  h3 {
    color: #68768e;
    opacity: 0.7;
    font-weight: 400;
    font-size: 1.2rem;
    margin: 1em 0;
  }
  p {
    color: #68768e;
    opacity: 0.7;
    font-weight: 400;
    font-size: 1rem;
  }
  .product-qte-controll {
    margin-top: 2em;
    display: flex;
    align-items: center;
    justify-content: space-between;
    .inc-input {
      width: 50%;
      padding: 10px 5px;
      font-size: 14px;
      border-radius: 7px;
      border: 2px solid rgba(0, 0, 0, 0.05);
    }
  }
  @media only screen and (max-width: 1200px) {
    margin: 1em 0;
  }
  @media only screen and (max-width: 768px) {
    .product-qte-controll {
      flex-direction: column;
      .inc-input {
        margin: 1em 0;
      }
    }
  }
`;
