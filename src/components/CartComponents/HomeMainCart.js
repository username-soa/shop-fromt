import React from "react";
import { useHistory } from "react-router-dom";
import { motion } from "framer-motion";
import styled from "styled-components";
import Img from "../../assets/testimg.png";
import Button from "../elements/Button";

const HomeMainCart = ({ collection }) => {
  const history = useHistory();
  let cid = 1;
  const ComponentVariants = {
    hidden: { y: "100vh" },
    visible: {
      y: 0,
      transition: { duration: 1, type: "Inertia" },
    },
  };

  return (
    <Container variants={ComponentVariants} initial="hidden" animate="visible">
      <div className="div-content-wrp">
        <div className="categorie-desc-container">
          <h2>Winter 21’</h2>
          <p>
            Winter layer season is here. Check out our trendy new winter
            collection to stay warm in style.
          </p>
          {!collection && (
            <>
              <div className="price-container">
                <h5>Price:</h5>
                <h4>
                  {new Intl.NumberFormat("fr-FR", {
                    style: "currency",
                    currency: "MAD",
                  }).format(114)}
                </h4>
              </div>
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
            </>
          )}
        </div>
        <div className="image-container">
          <img src={Img} />
        </div>
      </div>
    </Container>
  );
};

export default HomeMainCart;

const Container = styled(motion.div)`
  padding: 0 150px;
  .div-content-wrp {
    max-height: 750px;
    background: #fff;
    display: grid;
    grid-template-columns: 50% 50%;
    overflow: hidden;
  }
  .categorie-desc-container {
    display: flex;
    flex-direction: column;
    justify-content: center;
    margin: 4em 2em;
    .price-container {
      display: flex;
      align-items: center;
    }
    p,
    h5,
    h4 {
      margin: 1em 0;
    }
    h2 {
      color: #393d46;
      font-family: "Poppins", Sans-serif;
      font-size: 4.5rem;
      font-weight: 400;
      line-height: 1.2em;
    }
    p {
      color: #68768e;
      font-family: "Poppins", Sans-serif;
      font-size: 16px;
      font-weight: 400;
      line-height: 2.2em;
    }
    h5 {
      color: #68768e;
      font-family: "Poppins", Sans-serif;
      font-size: 16px;
      font-weight: 400;
      line-height: 1em;
      margin-right: 1em;
    }
    h4 {
      color: #393d46;
      font-family: "Poppins", Sans-serif;
      font-size: 24px;
      font-weight: 600;
    }
  }
  .image-container {
    width: 100%;
    margin-top: 4em;
    img {
      width: 90%;
    }
  }
  @media only screen and (max-width: 1200px) {
    padding: 1em;
    .categorie-desc-container {
      h2 {
        font-size: 3rem;
      }
      p {
        font-size: 14px;
        text-align: justify;
      }
      h5,
      h4 {
        font-size: 14px;
      }
    }
  }
  @media only screen and (max-width: 768px) {
    .div-content-wrp {
      grid-template-columns: 100% !important;
    }
    .categorie-desc-container {
      p,
      h5,
      h4 {
        margin: 1em 0;
      }
    }
    .image-container {
      margin-top: 1em;
      display: flex;
      justify-content: center;
      align-items: center;
      img {
        width: 70%;
      }
    }
  }
`;
