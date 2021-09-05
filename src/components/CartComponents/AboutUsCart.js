import React, { useState } from "react";
import styled from "styled-components";
import { motion } from "framer-motion";
import img from "../../assets/aboutus.jpg";

const AboutUsCart = () => {
  const ContainersVariants = {
    hidden: { y: "100px", opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: { duration: 0.5, type: "Inertia" },
    },
  };
  const InfoVariants = {
    hidden: { y: "100px", opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: { duration: 0.5, delay: 0.5, type: "Inertia" },
    },
  };
  return (
    <Container>
      <motion.h2
        initial="hidden"
        animate="visible"
        variants={ContainersVariants}
      >
        À propos de nous
      </motion.h2>
      <motion.div
        initial="hidden"
        animate="visible"
        variants={InfoVariants}
        className="about-us-cart-container"
      >
        <motion.div
          className="about-us-cart-img-container"
          initial="hidden"
          animate="visible"
          variants={InfoVariants}
        >
          <img src={img} alt="about-us" />
        </motion.div>

        <motion.div initial="hidden" animate="visible" variants={InfoVariants}>
          <h3>Notre mission et vision</h3>
          <p>
            We are a team of dedicated, hard-working individuals with a passion
            for fashion and providing quality products and services to our
            customers. We believe that fashion is simply a medium for
            self-expression and strive to help our customers express themselves
            with our trendy, stylish designs made from only the best quality
            fabric.{" "}
          </p>
          <p>
            orem Ipsum has been the industry’s standard dummy text ever since
            the 1500s, when an unknown printer took a galley of type and
            scrambled it to make a type specimen remaining essentially
            unchanged.
          </p>
        </motion.div>
      </motion.div>
    </Container>
  );
};

export default AboutUsCart;

const Container = styled.div`
  padding: 2em 150px;
  .about-us-cart-container {
    display: grid;
    grid-template-columns: 50% 50%;
    padding: 1em 0;
  }
  .about-us-cart-img-container {
    width: 100%;
    height: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    img {
      width: 90%;
    }
  }
  h2 {
    color: #393d46;
    font-size: 3.5rem;
    font-weight: 500;
    line-height: 2em;
    text-transform: capitalize;
  }
  h3 {
    color: #393d46;
    opacity: 0.7;
    font-weight: 400;
    font-size: 1.5rem;
    margin: 1em 0;
    line-height: 1.5em;
    text-transform: capitalize;
  }
  p {
    color: #68768e;
    opacity: 0.7;
    font-weight: 400;
    font-size: 1rem;
    text-align: justify;
    margin: 1em 0;
  }

  @media only screen and (max-width: 1200px) {
    padding: 2em;
    h2 {
      font-size: 30px;
    }
    .about-us-cart-container {
      grid-template-columns: 100% !important;
    }
  }
  @media only screen and (max-width: 768px) {
    h2 {
      font-size: 24px;
    }
  }
`;
