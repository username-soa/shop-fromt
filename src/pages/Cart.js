import React, { useState } from "react";
import styled from "styled-components";
import { motion } from "framer-motion";
import useHasBeenViewed from "../hooks/useHasBeenViewed";
import { Link, useLocation } from "react-router-dom";
import Layout from "../layouts/DefaultLayout";
import CustomHelmet from "../components/elements/CustomHelmet";
import Button from "../components/elements/Button";
import CartTotale from "../components/CartComponents/CartTotale";
import CartItem from "../components/CartComponents/CartItem";
import useIsAllowed from "../hooks/useIsAllowed";
import useTrackHovers from "../hooks/useTrackHovers";
import usePageClicks from "../hooks/usePageClicks";
import usePageVisits from "../hooks/usePageVisits";
import usePageScrolls from "../hooks/usePagsScrolls";
import { productList } from "../utils/Products";

const CartPage = () => {
  const location = useLocation();
  const pageStatus = useIsAllowed(location?.pathname);
  usePageClicks(pageStatus?.clicks, "mousedown", location?.pathname);
  useTrackHovers(pageStatus?.hovers, "mousemove", location?.pathname);
  usePageScrolls(pageStatus?.scroll, "scroll", location?.pathname);
  usePageVisits(pageStatus?.visits, pageStatus?.pageID);

  const H1Variants = {
    hidden: { opacity: 0, y: "100px" },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 1, type: "Inertia" },
    },
  };

  const [empty, setEmpty] = useState(false);
  const [initaldata, setInitialdata] = useState(productList);
  const [hasBeenViewed, ref] = useHasBeenViewed();

  const productCost = (i) => {
    // return i?.qte * parseFloat(i?.product?.variants[0]?.price, 10);
  };

  const cartTotalCost = () => {
    // let total = null;
    // cartItems?.map((item) => {
    //   total += parseFloat(item?.product?.variants[0]?.price * item?.qte);
    // });
    // return total;
  };

  return (
    <Layout>
      <Container
        exit={{
          opacity: 0,
          transition: { ease: "easeInOut" },
        }}
      >
        <CustomHelmet title="Panier" />
        {empty && (
          <motion.div
            ref={ref}
            animate={hasBeenViewed ? "visible" : "hidden"}
            initial="hidden"
            variants={H1Variants}
            className="empty-cart-wrp"
          >
            <h1>Votre panier est actuellement vide.</h1>

            <Link to="/">
              <Button
                title="Retour à la boutique"
                color="#fff"
                border="#393d46"
                hover="#393d46"
                bg="#fff"
                color="#393d46"
                radius="0"
                margin="3em"
              />
            </Link>
          </motion.div>
        )}

        {!empty && (
          <>
            <motion.h2 animate="visible" initial="hidden" variants={H1Variants}>
              Votre Panier
            </motion.h2>
            <div className="cart-content-wrp">
              <div className="cart-product-list">
                {initaldata?.map((item, index) => {
                  return (
                    <CartItem
                      key={`item-${index}`}
                      name={item?.name}
                      // name={item?.product?.title.replace("-", "  ")}
                      // img={item?.product?.images[0]?.src}
                      img={item?.img}
                      brand={item?.product?.vendor}
                      // price={productCost(item)}
                      cid={item?.cid}
                      uid={item?.uid}
                      // updateQte={updateProductQte}
                      qte={item?.qte}
                      // removeProduct={removeProduct}
                    />
                  );
                })}
              </div>
              <CartTotale price={cartTotalCost()} /*checkoutEC={checkoutEC}*/ />
            </div>
          </>
        )}
      </Container>
    </Layout>
  );
};

export default CartPage;

const Container = styled(motion.div)`
  padding: 2em 150px;
  h2 {
    color: #393d46;
    font-size: 2.5rem;
    font-weight: 400;
    line-height: 2em;
    letter-spacing: 2px;
    grid-column: 1/3;
    margin: 0.5em 0;
  }
  .empty-cart-wrp {
    min-height: calc(100vh - 150px);
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    h1 {
      font-weight: 300 !important;
      text-align: center;
      line-height: 1.5em;
      margin-bottom: 0.75em;
      margin-top: 2em;
      color: #393d46;
    }
  }
  .cart-top-section {
    padding: 1em;
    h3 {
      font-weight: 300 !important;
      font-size: 2rem;
    }
    .cart-top-section-sub {
      margin-top: 0.5em;
      font-weight: 600;
      color: #222;
      display: flex;
      align-items: center;
      justify-content: space-between;
      .sort {
        display: flex;
        align-items: center;
        justify-content: center;
        p {
          margin-right: 0.5em;
        }
      }
    }
  }
  .cart-content-wrp {
    display: grid;
    grid-template-columns: 60% 40%;
  }
  .cart-similar-products {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    padding: 2em 0;
    width: 80%;
    margin: 0em auto;
    .h2-product {
      margin: 0.5em 0;
      font-weight: 600;
      font-size: 2rem;
      color: #aaa;
      text-overflow: ellipsis;
      white-space: nowrap;
      overflow: hidden;
    }
    .product-list {
      width: 100%;
      display: grid;
      grid-template-columns: repeat(auto-fill, minmax(310px, 1fr));
      grid-template-rows: auto;
      height: fit-content;
    }
  }
  @media only screen and (max-width: 1200px) {
    padding: 2em;
    h2 {
      font-size: 2rem;
    }
    .cart-content-wrp {
      grid-template-columns: 100% !important;
      grid-template-rows: auto;
    }
  }
  @media only screen and (max-width: 768px) {
    padding: 1em;
    h2 {
      font-size: 1.5rem;
    }
    .cart-similar-products {
      margin: 0;
      width: 100%;
    }
  }
  @media only screen and (max-width: 600px) {
    .cart-top-section-sub {
      flex-direction: column;
    }
    .cart-top-section {
      h3 {
        width: fit-content;
        margin: 0 auto;
      }
    }
  }
`;
