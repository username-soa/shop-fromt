import React from "react";
import styled from "styled-components";
import { motion } from "framer-motion";
import useHasBeenViewed from "../../hooks/useHasBeenViewed";
import AdvantagesCart from "../elements/AdvantagesCart";
import { ReactComponent as packageIcone } from "../../assets/package.svg";
import { ReactComponent as package2Icone } from "../../assets/package2.svg";
import { ReactComponent as deliveryIcone } from "../../assets/delivery.svg";

const ExtraAdvantagesCart = () => {
  const [hasBeenViewed, ref] = useHasBeenViewed();
  const H2Variants = {
    hidden: { opacity: 0, y: "100px" },
    visible: {
      opacity: 1,
      y: 0,
      transition: { type: "Inertia" },
    },
  };
  const CartsVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { delay: 0.5, type: "Inertia" },
    },
  };
  return (
    <Container>
      <motion.h2
        ref={ref}
        animate={hasBeenViewed ? "visible" : "hidden"}
        initial="hidden"
        variants={H2Variants}
      >
        Why Choose Us?
      </motion.h2>
      <motion.div
        ref={ref}
        animate={hasBeenViewed ? "visible" : "hidden"}
        initial="hidden"
        variants={H2Variants}
        className="carts-items-container"
      >
        <AdvantagesCart
          bg="#f6f7fb"
          title="100% Guarantee"
          text="Not happy with your purchase? Get 100% money back by returning within 7 days of purchase"
        />
        <AdvantagesCart
          bg="#f6f7fb"
          title="Free Shipping"
          text="We don’t charge extra to get your products delivered to your doorstep. Order from anywhere in morocco."
        />
        <AdvantagesCart
          bg="#f6f7fb"
          title="24/7 Support"
          text="We have the friendliest and most dedicated customer support who stay online 24/7 to help you with your needs."
        />
      </motion.div>
    </Container>
  );
};

export default ExtraAdvantagesCart;

const Container = styled.div`
  /* background: #fff; */
  margin: 2em 150px 4em 150px;
  padding: 2em;
  h2 {
    color: #393d46;
    font-size: 60px;
    font-weight: 400;
    line-height: 1.5em;
  }
  .carts-items-container {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
  }
  @media only screen and (max-width: 1200px) {
    padding: 1em;
    margin: 2em 1em 4em 1em;
    h2 {
      margin: 1em;
      font-size: 40px;
    }
  }
  @media only screen and (max-width: 768px) {
    h2 {
      font-size: 1.5rem;
    }
    .carts-items-container {
      grid-template-columns: 100% !important;
    }
  }
`;
