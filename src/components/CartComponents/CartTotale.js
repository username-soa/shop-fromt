import React, { useState } from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import useHasBeenViewed from "../../hooks/useHasBeenViewed";
import Button from "../elements/Button";
const CartTotale = ({ price, checkoutEC }) => {
  const AdvantageCartVariants = {
    hidden: { opacity: 0, y: "100px" },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 1, delay: 0.5, type: "Inertia" },
    },
  };

  const [hasBeenViewed, ref] = useHasBeenViewed();

  return (
    <Container
      ref={ref}
      animate={hasBeenViewed ? "visible" : "hidden"}
      initial="hidden"
      variants={AdvantageCartVariants}
    >
      <h4 className="cart-total-h4">Total panier</h4>
      <div className="cart-totale-row">
        <h5 className="cart-total-h5">Sous-total</h5>
        <h5>
          {new Intl.NumberFormat("fr-FR", {
            style: "currency",
            currency: "MAD",
          }).format(price)}
        </h5>
      </div>
      <div className="cart-totale-row">
        <h5 className="cart-total-h5">Taxes</h5>
        <h5 className="cart-total-h5 right">Calculated at checkout</h5>
      </div>
      <div className="cart-totale-row">
        <h5 className="cart-total-h5">Shipping</h5>
        <h5 className="cart-total-h5 right">Calculated at checkout</h5>
      </div>
      <Button
        handleClick={() => {
          window.open(checkoutEC?.webUrl);
        }}
        title="CHECK OUT"
        bg="#fff"
        color="#393d46"
        border="#393d46"
        hover="#393d46"
        radius="0"
      />
      <p>Estimated shipping 1-7 days</p>
    </Container>
  );
};
export default CartTotale;

const Container = styled(motion.div)`
  background: #fff;
  margin: 0.5em;
  padding: 2em 1em;
  height: fit-content;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  box-shadow: rgb(237 239 247 / 47%) 0px 10px 20px,
    rgb(237 239 247 / 47%) 0px 6px 6px;
  .cart-totale-row {
    width: 100%;
    display: flex;
    margin: 1em 0;
    align-items: center;
    justify-content: space-between;
  }
  .cart-total-h5 {
    font-weight: 300 !important;
    font-size: 0.8rem;
  }
  .cart-total-h4 {
    text-transform: uppercase;
    letter-spacing: 2px;
    font-size: 1.2rem;
    font-weight: 500 !important;
  }
  .right {
    margin-left: 0.5em;
  }
  p {
    margin-top: 1em;
    font-size: 0.8rem;
    color: #222;
  }
`;
