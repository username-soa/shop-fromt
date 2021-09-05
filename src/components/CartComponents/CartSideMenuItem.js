import React, { useState, useRef, useEffect } from "react";
import styled from "styled-components";
import { useHistory } from "react-router-dom";
import { motion } from "framer-motion";

const CartSideMenuItem = ({
  img,
  name,
  brand,
  price,
  qte,
  uid,
  cid,
  gotoProduct,
  updateQte,
}) => {
  const history = useHistory();

  const SidecartItemsVariants = {
    hidden: { x: "350px", y: "-100px" },
    visible: {
      x: 0,
      y: 0,
      transition: { delay: 0.2, type: "Inertia" },
    },
  };

  return (
    <Container
    // variants={SidecartItemsVariants}
    // initial="hidden"
    // animate="visible"
    >
      <div className="cart-items-img">
        <img
          loading="lazy"
          src={img}
          alt="cart-item-image"
          onClick={() => {
            gotoProduct();
            history.push(`/product-detail/${uid}/${cid}`);
          }}
        />
      </div>
      <div className="cart-items-info">
        <h4>{name}</h4>
        <h5>{brand}</h5>
      </div>
      <div className="cart-items-qte-controll">
        <div className="counting">
          <button
            onClick={() => {
              updateQte(-1, uid);
            }}
          >
            -
          </button>
          <input
            type="text"
            value={qte}
            onChange={() => {
              return null;
            }}
          />
          <button
            onClick={() => {
              updateQte(1, uid);
            }}
          >
            +
          </button>
        </div>
        <h4>
          {new Intl.NumberFormat("fr-FR", {
            style: "currency",
            currency: "MAD",
          }).format(price)}
        </h4>
      </div>
    </Container>
  );
};

export default CartSideMenuItem;

const Container = styled.div`
  padding: 0.5em 1em;
  display: grid;
  grid-template-columns: 100px auto;
  .cart-items-img {
    width: 70px;
    height: 70px;
    border: 1px solid #878787;
    border-radius: 7px;
    display: flex;
    justify-content: center;
    align-items: center;
    img {
      width: 80%;
      height: 80%;
      object-fit: scale-down;
      cursor: pointer;
    }
  }
  .cart-items-info {
    h4 {
      font-size: 14px;
      line-height: 1.7rem;
      font-weight: 500;
    }
    h5 {
      font-weight: 500;
      font-size: 12px;
      color: #878787;
      line-height: 1.5rem;
    }
  }
  .cart-items-qte-controll {
    grid-column: 1/3;
    display: flex;
    align-items: center;
    justify-content: space-between;
  }
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
  @media only screen and (max-width: 400px) {
  }
`;
