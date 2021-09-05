import React, { useEffect, useRef } from "react";
import styled from "styled-components";
import { motion } from "framer-motion";
import useHasBeenViewed from "../../hooks/useHasBeenViewed";
import ProductCart from "./ProductCard";
import { productList } from "../../utils/Products";

const HomeProductsShowcase = ({ img, title, text, type }) => {
  let isMounted = true;
  const AdvantageCartVariants = {
    hidden: { opacity: 0, y: "100px" },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.5, delay: 0.5, type: "Inertia" },
    },
  };
  const H2CartVariants = {
    hidden: { opacity: 0, y: "100px" },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.5, delay: 1, type: "Inertia" },
    },
  };

  const [hasBeenViewed, ref] = useHasBeenViewed();

  return (
    <Container>
      <motion.h2
        ref={ref}
        initial="hidden"
        animate={hasBeenViewed ? "visible" : "hidden"}
        variants={H2CartVariants}
      >
        Nos produits
      </motion.h2>
      <motion.div
        className="products-list-container"
        ref={ref}
        initial="hidden"
        animate={hasBeenViewed ? "visible" : "hidden"}
        variants={AdvantageCartVariants}
      >
        {productList.map((i, index) => {
          return (
            <ProductCart key={`p-${index}`} title={i.name} price={i.price} />
          );
        })}
      </motion.div>
    </Container>
  );
};

export default HomeProductsShowcase;

const Container = styled.div`
  padding: 2em 1em;
  margin: 0em 150px;
  display: flex;
  flex-direction: column;
  h2 {
    color: #393d46;
    font-size: 4rem;
    font-weight: 400;
    line-height: 2em;
  }
  .products-list-container {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
  }
  @media only screen and (max-width: 1200px) {
    margin: 1em;
    h2 {
      font-size: 30px;
    }
  }
  @media only screen and (max-width: 768px) {
    h2 {
      font-size: 24px;
    }
  }
`;
