import React, { useState } from "react";
import styled from "styled-components";
import { motion, AnimatePresence } from "framer-motion";
import { Link } from "react-router-dom";
import { Formik, Form } from "formik";
import * as Yup from "yup";
import logo from "../../assets/thelogo.jpg";
import { ReactComponent as LogoIcone } from "../../assets/logo.svg";
import CustomInput from "../elements/CustomInput";
import Button from "../elements/Button";

const LoginForm = ({ setState, state, handleLogin }) => {
  const LoginVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      // y: 0,
      transition: { delay: 0.5, type: "Inertia" },
    },
  };
  return (
    <Container animate="visible" initial="hidden" variants={LoginVariants}>
      <Formik
        enableReinitialize={true}
        initialValues={{
          email: "",
          pwd: "",
        }}
        validationSchema={Yup.object({
          email: Yup.string()
            .email("doit être une adresse e-mail")
            .required("Champ obligatoire"),
          pwd: Yup.string().required("Champ obligatoire"),
        })}
        onSubmit={(data) => {
          handleLogin(data);
        }}
      >
        {({ handleSubmit, isSubmitting, values }) => (
          <Form className="form first-form">
            <div className="svg-wrp">
              <Link to="/">
                <img src={logo} className="the-logo" />
              </Link>
            </div>
            <CustomInput placeholder="Email" name="email" id="email" />
            <CustomInput
              placeholder="Password"
              name="pwd"
              id="pwd"
              type="password"
            />
            <div className="btn-wrp-login">
              <Button
                radius="0"
                type="submit"
                color="#fff"
                bg="#393d46"
                title="Log in"
                border="#393d46"
                hover="#f8f8f8"
                handleClick={handleSubmit}
              />
              <Button
                radius="0"
                type="submit"
                color="#393d46"
                bg="#fff"
                title="Sign up"
                border="#393d46"
                hover="#393d46"
                padding="10px 26px"
                margin="0.5em"
                handleClick={(event) => {
                  event.preventDefault();
                  setState(!state);
                }}
              />
            </div>
          </Form>
        )}
      </Formik>
    </Container>
  );
};

export default LoginForm;

const Container = styled(motion.div)`
  width: 600px;
  min-width: 300px;
  background: #fff;
  border-radius: 10px;
  padding: 1em;
  box-shadow: rgb(237 239 247 / 47%) 0px 10px 20px,
    rgb(237 239 247 / 47%) 0px 6px 6px;
  form {
    width: 100% !important;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
  }
  input {
    width: 100% !important;
    margin: 0.5em 0;
  }
  .svg-wrp {
    display: flex;
    cursor: pointer;
    svg {
      width: 150px;
      height: 50px;
      margin: 1em auto 2em auto;
      path {
        fill: #222 !important;
      }
    }
  }
  .the-logo {
    width: 100px;
    margin: 2em 0;
  }
  .btn-wrp-login {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
  }
  .btn-next-step {
    padding: 1em;
    background: transparent;
  }
  .roteted-svg {
    width: 10px;
    height: 10px;
    margin: 0 0.1em;
    transform: rotate(-90deg);
  }
`;
