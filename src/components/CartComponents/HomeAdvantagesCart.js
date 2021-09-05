import React, { useEffect } from "react";
import styled from "styled-components";
import { motion } from "framer-motion";
import useHasBeenViewed from "../../hooks/useHasBeenViewed";
import AdvantagesCart from "../elements/AdvantagesCart";
import { ReactComponent as packageIcone } from "../../assets/package.svg";
import { ReactComponent as package2Icone } from "../../assets/package2.svg";
import { ReactComponent as deliveryIcone } from "../../assets/delivery.svg";

const HomeAdvantagesCart = () => {
  let isMounted = true;
  const AdvantageCartVariants = {
    hidden: { opacity: 0, y: "100px" },
    visible: {
      opacity: 1,
      y: 0,
      transition: { delay: 0.5, type: "Inertia" },
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
      <h2>Stay In Trend With Yacado Pêche</h2>
      <div className="carts-items-container">
        <AdvantagesCart
          title="Latest Styles"
          Icon={packageIcone}
          text="Our designs follow the latest fashion styles to help you stay updated with new trends."
        />
        <AdvantagesCart
          title="Best Prices"
          Icon={package2Icone}
          text="Enjoy the best prices for high quality clothing and accessories."
        />
        <AdvantagesCart
          title="Free Shipping"
          Icon={deliveryIcone}
          text="We provide free shipping worldwide. You can order from anywhere, anytime."
        />
      </div>
    </Container>
  );
};

export default HomeAdvantagesCart;

const Container = styled(motion.div)`
  background: #393d46;
  margin: 2em 150px 4em 150px;
  padding: 2em;
  h2 {
    color: #ffffff;
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
