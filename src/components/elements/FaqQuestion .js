import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { motion, AnimatePresence } from "framer-motion";
import { ReactComponent as CloseIcone } from "../../assets/close.svg";

const FaqQuestion = ({ state, setState, title, children }) => {
  const CartVariants = {
    hidden: { opacity: 0, y: "100px" },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 1, delay: 0.5, type: "Inertia" },
    },
  };
  const ExtrainfoVariants = {
    hidden: { opacity: 0, y: "-100px" },
    visible: {
      opacity: 1,
      y: 0,
      transition: { type: "Inertia" },
    },
  };

  const [open, setOpen] = useState(false);
  useEffect(() => {
    console.log(open);
  }, [open]);
  return (
    <Container animate="visible" initial="hidden" variants={CartVariants}>
      <div className="question-wrp">
        <h4>{title}</h4>
        <CloseIcone
          className={open ? "rotated" : null}
          onClick={() => {
            setOpen(!open);
          }}
        />
      </div>
      <AnimatePresence>
        {open && (
          <motion.div
            animate={open ? "visible" : ""}
            initial="hidden"
            variants={ExtrainfoVariants}
            exit={{
              opacity: 0,
              y: "100vh",
              transition: { type: "Inertia" },
            }}
            className="extra-info active"
          >
            {children}
          </motion.div>
        )}
      </AnimatePresence>
    </Container>
  );
};

export default FaqQuestion;

const Container = styled(motion.div)`
  h4 {
    color: rgb(29, 43, 63);
    font-size: 1.2rem;
    font-weight: 600;
    letter-spacing: 0px;
    line-height: 1.4em !important;
    text-transform: uppercase;
    margin: 0 0.5em;
  }
  .question-wrp {
    background: #fff;
    padding: 1em;
    margin: 1em 0.5em;
    box-shadow: rgb(237 239 247 / 47%) 0px 10px 20px,
      rgb(237 239 247 / 47%) 0px 6px 6px;
    display: grid;
    grid-template-columns: auto 20px;
  }
  .extra-info {
    background: rgb(247, 250, 252);
    padding: 1em;
    border: 2px solid rgb(243, 244, 245);
    border-radius: 10px;
    margin: 0.5em 0.5em 1em 0.5em;
    display: none;
    height: 0;
    transition: all 0.3s ease-in-out;
    &.active {
      display: flex;
      height: fit-content;
    }
  }
  display: flex;
  flex-direction: column;
  svg {
    width: 16px;
    height: 16px;
    cursor: pointer;
    transform: rotate(45deg);
    transition: all 0.3s ease-in-out;
    margin: auto;
    fill: #393d46;
    &.rotated {
      transform: rotate(0deg);
    }
  }
  .brandname-button {
    cursor: pointer;
    padding: 0.5em;
    background: transparent;
  }
  .brandname-h4 {
    font-size: 1.1rem;
    font-weight: 400 !important;
  }
  @media only screen and (max-width: 768px) {
    h4 {
      font-size: 1rem;
      line-height: 1.2rem;
    }
  }
`;
