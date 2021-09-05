import React, { useState } from "react";
import styled from "styled-components";
import { motion } from "framer-motion";
import { useHistory } from "react-router-dom";
import { ReactComponent as DeleteIcone } from "../../assets/trash.svg";

const CartItem = ({
  img,
  name,
  brand,
  price,
  uid,
  cid,
  qte,
  updateQte,
  removeProduct,
}) => {
  const history = useHistory();
  const CartItemVariants = {
    hidden: { opacity: 0, y: "100px" },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 1, delay: 0.5, type: "Inertia" },
    },
  };

  return (
    <Container animate="visible" initial="hidden" variants={CartItemVariants}>
      <div className="product-row-wrp">
        <div className="left">
          <div className="product-img">
            <img
              loading="lazy"
              src={img}
              alt={name}
              onClick={() => {
                history.push(`/product-detail/${uid}/${cid}`);
              }}
            />
          </div>
          <div className="product-info">
            <h4>{name}</h4>
            <p>{brand}</p>
          </div>
        </div>
        <div className="product-count">
          <div className="counting">
            <button onClick={() => updateQte(-1, uid)}>-</button>
            <input
              type="text"
              value={qte}
              onChange={() => {
                return null;
              }}
            />
            <button onClick={() => updateQte(1, uid)}>+</button>
          </div>
          <h4 className="product-price">
            {new Intl.NumberFormat("fr-FR", {
              style: "currency",
              currency: "MAD",
            }).format(price)}
          </h4>
          <DeleteIcone onClick={() => removeProduct(uid)} />
        </div>
      </div>
    </Container>
  );
};
export default CartItem;

const Container = styled(motion.div)`
  background: #fff;
  margin: 0.5em 0.5em;
  padding: 0.5em;
  display: flex;
  flex-direction: column;
  .product-row-wrp {
    width: 100%;
    background: #fff;
    border-radius: 10px;
    display: grid;
    grid-template-columns: 60% 40%;
    .left {
      display: flex;
    }
    .product-img {
      width: 120px;
      height: 100px;
      cursor: pointer;
      display: flex;
      justify-content: center;
      align-items: center;
      img {
        width: 80%;
        height: 80%;
        object-fit: scale-down;
      }
    }
    .product-info {
      display: flex;
      flex-direction: column;
      align-items: flex-start;
      justify-content: center;
      p {
        margin-top: 0.5em;
        font-size: 0.8rem;
      }
      h4 {
        font-weight: 500;
      }
    }
    .product-count {
      display: grid;
      grid-template-columns: 1fr 1fr 20px;
      .counting {
        display: flex;
        button {
          font-size: 1.7rem;
          padding: 0.25em;
          height: fit-content;
          margin: auto 0;
          cursor: pointer;
          background: transparent;
        }
        input {
          width: 50px;
          padding: 0.5em;
          border-radius: 7px;
          background: #f2f4f8;
          height: fit-content;
          margin: auto 0;
        }
      }
      .product-price {
        width: fit-content;
        height: fit-content;
        margin: auto;
        font-size: 0.8rem;
      }
      svg {
        margin: auto;
        cursor: pointer;
        transition: all 0.3s;
        path {
          fill: #393d46;
        }
        &:hover {
          path {
            fill: red;
          }
        }
      }
    }
  }
  @media only screen and (max-width: 768px) {
    .product-row-wrp {
      grid-template-columns: 100% !important;
      grid-template-rows: auto;
    }
    .product-count {
      width: fit-content;
      margin: 0 auto;
    }
    .left {
      display: grid;
      grid-template-columns: 120px auto;
    }
  }

  @media only screen and (max-width: 400px) {
    h4 {
      font-size: 0.9rem;
    }
  }
`;
