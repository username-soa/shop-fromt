import React, { useEffect, useRef } from "react";
import styled from "styled-components";
import { motion } from "framer-motion";
import useHasBeenViewed from "../../hooks/useHasBeenViewed";
import rebook from "../../assets/rebook.png";
import adidas from "../../assets/adidas.png";
import nike from "../../assets/nike.png";
import puma from "../../assets/puma.png";

const HomePartnersCart = () => {
  let isMounted = true;
  const PartnerCartVariants = {
    hidden: { y: "100%" },
    visible: {
      y: 0,
      transition: { duration: 0.5, type: "Inertia", ease: "easeInOut" },
    },
  };

  const [hasBeenViewed, ref] = useHasBeenViewed();

  return (
    <Container
      variants={PartnerCartVariants}
      ref={ref}
      animate={hasBeenViewed ? "visible" : "hidden"}
      initial="hidden"
    >
      <img src={rebook} alt="partner-logo" />
      <img src={adidas} alt="partner-logo" />
      <img src={nike} alt="partner-logo" />
      <img src={puma} alt="partner-logo" />
    </Container>
  );
};

export default HomePartnersCart;

const Container = styled(motion.div)`
  display: flex;
  justify-content: space-around;
  align-items: center;
  background: #fff;
  padding: 4em 1em;
  margin: 6em 150px;
  box-shadow: 0px 50px 130px 0px rgb(57 61 70 / 15%);
  img {
    opacity: 0.6;
    transition: all 0.3s ease;
    &:hover {
      opacity: 1;
    }
  }
  @media only screen and (max-width: 1200px) {
    margin: 6em 1em;
  }
  @media only screen and (max-width: 768px) {
    flex-direction: column;
    margin: 1em;
    img {
      margin: 1em 0;
    }
  }
`;
