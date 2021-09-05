import React from "react";
import styled from "styled-components";
import Button from "../elements/Button";

const CartSideMenuBottom = ({ price, seeCatalogue, checkoutEC }) => {
  return (
    <Container>
      <div className="cart-totale-row">
        <h5 className="cart-total-h5">Sous-total</h5>
        <h5>
          {new Intl.NumberFormat("fr-FR", {
            style: "currency",
            currency: "MAD",
          }).format(price)}
        </h5>
      </div>
      <div>
        <span>Frais de livraison et taxes calculés au checkout.</span>
      </div>
      <div className="cart-totale-btn-wrp">
        <Button
          title="CHECKOUT"
          bg="#393d46"
          color="#fff"
          radius="0"
          margin="1em"
          handleClick={() => window.open(checkoutEC?.webUrl)}
        />
        <Button
          title="CONTINUER SHOPPING"
          bg="#fff"
          color="#393d46"
          border="#393d46"
          hover="#393d46"
          radius="0"
          margin="0.5em"
          handleClick={seeCatalogue}
        />
      </div>
      <div className="shipping-info">
        <span className="gray-span">Expédition estimée: 1-7 jours</span>
      </div>
    </Container>
  );
};
export default CartSideMenuBottom;

const Container = styled.div`
  span {
    font-size: 12px;
    width: 100%;
  }
  .shipping-info {
    margin-top: 0.5em;
  }
  .gray-span {
    color: #878787;
  }
  .cart-totale-btn-wrp {
    > div {
      width: 100%;
    }
  }
  border-radius: 10px;
  padding: 1em;
  height: fit-content;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  button {
    font-size: 0.7rem !important;
    border: 1px solid #000;
    width: 100%;
  }
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
  .border-top {
    border-top: 1px solid #d9d9d9;
    padding: 0.5em 0;
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
