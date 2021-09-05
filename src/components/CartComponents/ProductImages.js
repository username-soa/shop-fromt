import React, { useState } from "react";
import styled from "styled-components";
import { motion } from "framer-motion";
import product1 from "../../assets/product1.jpg";
import product2 from "../../assets/product2.jpg";
import product3 from "../../assets/product3.jpg";

const ProductImages = () => {
  const ImageVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { duration: 0.5, delay: 0.5, type: "Inertia" },
    },
  };
  const SideImgaesCariants = {
    hidden: { opacity: 0, x: "-100vh" },
    visible: {
      opacity: 1,
      x: 0,
      transition: { duration: 0.5, type: "Inertia" },
    },
  };
  const [selectedImage, setSelectedimage] = useState(1);
  const [mainImage, setMainImage] = useState(product1);

  return (
    <Container>
      <div className="product-small-images-container">
        <motion.div
          initial="hidden"
          animate="visible"
          variants={SideImgaesCariants}
          className={
            selectedImage === 1
              ? "small-image-wrp active-img"
              : "small-image-wrp"
          }
        >
          <img
            src={product1}
            onClick={() => {
              setSelectedimage(1);
              setMainImage(product1);
            }}
          />
        </motion.div>
        <motion.div
          initial="hidden"
          animate="visible"
          variants={SideImgaesCariants}
          className={
            selectedImage === 2
              ? "small-image-wrp extra-margin active-img"
              : "small-image-wrp extra-margin"
          }
        >
          <img
            alt="product-image"
            src={product2}
            onClick={() => {
              setSelectedimage(2);
              setMainImage(product2);
            }}
          />
        </motion.div>
        <motion.div
          initial="hidden"
          animate="visible"
          variants={SideImgaesCariants}
          className={
            selectedImage === 3
              ? "small-image-wrp active-img"
              : "small-image-wrp"
          }
        >
          <img
            alt="product-image"
            src={product3}
            onClick={() => {
              setSelectedimage(3);
              setMainImage(product3);
            }}
          />
        </motion.div>
      </div>
      <motion.div
        className="product-main-image"
        initial="hidden"
        animate="visible"
        variants={SideImgaesCariants}
      >
        <motion.img
          src={mainImage}
          alt="product-image"
          initial="hidden"
          animate={
            selectedImage === 1 || selectedImage === 2 || selectedImage === 3
              ? "visible"
              : "hidden"
          }
          variants={ImageVariants}
        />
      </motion.div>
    </Container>
  );
};

export default ProductImages;

const Container = styled.div`
  display: grid;
  grid-template-columns: 100px auto;
  .product-main-image {
    border-radius: 10px;
    overflow: hidden;
    display: flex;
    justify-content: center;
    align-items: center;
    margin-left: 1em;
    padding: 1em 0;
    border-radius: 10px;
    cursor: zoom-in;
    background: #fff;
    box-shadow: rgb(237 239 247 / 47%) 0px 10px 20px,
      rgb(237 239 247 / 47%) 0px 6px 6px;
    max-height: 400px;
    min-height: 320px;
    img {
      object-fit: scale-down;
      height: 80%;
      width: 60%;
      max-height: 280px;
    }
  }
  .product-small-images-container {
    display: grid;
    grid-template-rows: repeat(3, minmax(90px, 1fr));
    border-radius: 10px;
    overflow: hidden;
    cursor: pointer;
    .small-image-wrp {
      background: #fff;
      border-radius: 10px;
      display: flex;
      justify-content: center;
      align-items: center;
      box-shadow: rgb(237 239 247 / 47%) 0px 10px 20px,
        rgb(237 239 247 / 47%) 0px 6px 6px;
    }
    .extra-margin {
      margin: 0.5em 0;
    }
    img {
      transition: 0.2s all;
      width: 80%;
      height: 90px;
      padding: 0.5em;
      object-fit: scale-down;
    }
    .active-img {
      border-bottom: 1px solid #222;
    }
  }
`;
