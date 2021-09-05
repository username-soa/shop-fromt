import React, { useState, useRef, useEffect, useContext } from "react";
import styled from "styled-components";
import { motion } from "framer-motion";
import { ReactComponent as Close } from "../../assets/close.svg";
import CartSideMenuBottom from "../CartComponents/CartSideMenuBottom";
import CartSideMenuItem from "../CartComponents/CartSideMenuItem";
import ClientContext from "../../contexts/ClientContext";
import { productList } from "../../utils/Products";

const CartSideMenu = ({ menuStatus, closeSideMenu, checkoutEC }) => {
  let isMounted = true;
  const Containervariants = {
    hidden: { x: "100vw" },
    visible: {
      x: 0,
      transition: {
        type: "Inertia",
        delay: 0.3,
      },
    },
  };
  const exitVariants = {
    opacity: 0,
    transition: { type: "Inertia" },
  };
  const variants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        type: "Inertia",
      },
    },
  };
  const Contentvariants = {
    hidden: { opacity: 0, y: "100vh" },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        type: "Inertia",
        delay: 0.7,
        duration: 0.6,
      },
    },
  };
  const ContentTopvariants = {
    hidden: { opacity: 0, y: "100vh" },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        type: "Inertia",
        delay: 0.3,
        duration: 0.6,
      },
    },
  };
  const ContentBottomvariants = {
    hidden: { opacity: 0, y: "100vh" },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        type: "Inertia",
        delay: 1,
        duration: 0.6,
      },
    },
  };
  const { cartItems, updateProductQte } = useContext(ClientContext);
  const getTotal = () => {
    let total = null;
    cartItems?.map((item) => {
      total += parseFloat(item?.product?.variants[0]?.price * item?.qte);
    });
    return total;
  };

  // useEffect(() => {
  //   if (isMounted) {
  //     if (cartItems?.length === 0) {
  //       closeSideMenu();
  //     }
  //   }
  //   return () => {
  //     isMounted = false;
  //   };
  // }, [cartItems]);

  return (
    <Container
      active={menuStatus}
      exit={exitVariants}
      variants={variants}
      initial="hidden"
      animate="visible"
    >
      <div
        className="cart-items-wrp"
        variants={Containervariants}
        initial="hidden"
        animate="visible"
      >
        <motion.div
          variants={ContentTopvariants}
          initial="hidden"
          animate="visible"
          className="cart-items-wrp-top"
        >
          <h3>panier</h3>
          <Close onClick={closeSideMenu} />
        </motion.div>
        <motion.div
          variants={Contentvariants}
          initial="hidden"
          animate="visible"
          className="cart-items-wrp-middle"
        >
          {productList?.map((item, index) => {
            return (
              <CartSideMenuItem
                price={parseFloat(item?.product?.variants[0]?.price, 10)}
                // name={item?.product?.title}
                name={item?.name}
                brand={item?.product?.vendor}
                img={item?.img}
                // img={item?.product?.images[0]?.src}
                key={`sidecart-item-${index}`}
                qte={item?.qte}
                gotoProduct={closeSideMenu}
                cid={item?.cid}
                uid={item?.uid}
                updateQte={updateProductQte}
              />
            );
          })}
        </motion.div>
        <motion.div
          variants={ContentBottomvariants}
          initial="hidden"
          animate="visible"
          className="cart-items-wrp-bottom"
        >
          <CartSideMenuBottom
            price={getTotal()}
            seeCatalogue={closeSideMenu}
            checkoutEC={checkoutEC}
          />
        </motion.div>
      </div>
    </Container>
  );
};

export default CartSideMenu;

const Container = styled(motion.div)`
  position: fixed;
  top: 0;
  right: 0;
  display: flex;
  flex-direction: column;
  width: ${(props) => (props.active ? "100%" : "0")};
  height: 100vh;
  z-index: 999999;
  background: rgba(0, 0, 0, 0.4);
  backdrop-filter: blur(3px);
  -webkit-backdrop-filter: blur(3px);
  transition: all 0.9s ease-in-out;
  .cart-items-wrp {
    width: 340px;
    height: 100vh;
    background: #fff;
    position: absolute;
    right: 0;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
  }
  .cart-items-wrp-top {
    width: 100%;
    height: 80px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 1em;
    h3 {
      text-transform: capitalize;
    }
    svg {
      width: 18px;
      height: 18px;
      cursor: pointer;
      fill: #878787;
    }
  }
  .cart-items-wrp-middle {
    width: 100%;
    height: calc(100vh - 80px - 244px);
    overflow-y: scroll;
  }
  @media only screen and (max-width: 400px) {
    .cart-items-wrp {
      width: 100%;
    }
  }
`;
