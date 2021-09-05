import React, { useState } from "react";
import styled from "styled-components";
import { motion } from "framer-motion";
import { Formik, Form } from "formik";
import * as Yup from "yup";
import { Link } from "react-router-dom";
import logo from "../../assets/thelogo.jpg";
import { ReactComponent as LogoIcone } from "../../assets/logo.svg";
import CustomInput from "../elements/CustomInput";
import Button from "../elements/Button";

const SigninForm = ({ setState, state, handleSignup, errors }) => {
  const SigninVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { delay: 0.5, type: "Inertia" },
    },
  };

  const handlePhone = (f) => {
    var newstring = f.substring(1);
    return "+212" + newstring;
  };
  return (
    <Container
      animate="visible"
      initial="hidden"
      variants={SigninVariants}
      // exit={{ opacity: 0, transition: { duration: 0.5, type: "Inertia" } }}
    >
      <Formik
        enableReinitialize={true}
        initialValues={{
          fname: "",
          lname: "",
          phone: "",
          email: "",
          pwd: "",
        }}
        validationSchema={Yup.object({
          fname: Yup.string().required("Champ obligatoire"),
          lname: Yup.string().required("Champ obligatoire"),
          phone: Yup.string()
            .min(10, "minimum 10")
            .required("Champ obligatoire"),
          email: Yup.string()
            .email("doit être une adresse e-mail")
            .required("Champ obligatoire"),
          pwd: Yup.string().required("Champ obligatoire"),
        })}
        onSubmit={async (data) => {
          const newPhone = handlePhone(data.phone);
          await handleSignup(data, newPhone);
        }}
      >
        {({ handleSubmit, isSubmitting, values }) => (
          <Form className="form first-form">
            <div className="svg-wrp">
              <Link to="/">
                <img src={logo} className="the-logo" />
              </Link>
            </div>
            <CustomInput placeholder="Prénom" name="fname" id="fname" />
            <CustomInput placeholder="Nom" name="lname" id="lname" />
            <CustomInput placeholder="Téléphone" name="phone" id="phone" />
            <CustomInput placeholder="Email" name="email" id="email" />
            <CustomInput
              placeholder="Mot de passe"
              name="pwd"
              id="pwd"
              type="password"
            />
            {errors ? (
              <p className="errors-red">
                Nne erreur s'est produite, Veuillez réessayer plus tard
              </p>
            ) : null}
            <div className="btn-wrp-login">
              <Button
                radius="0"
                color="#fff"
                bg="#393d46"
                padding="10px 26px"
                title={isSubmitting ? "Signing up ..." : "Sign up"}
                border="#393d46"
                hover="#f8f8f8"
                handleClick={handleSubmit}
                type="submit"
              />
              <Button
                radius="0"
                type="submit"
                color="#393d46"
                bg="#fff"
                title="Log in"
                border="#393d46"
                hover="#393d46"
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

export default SigninForm;

const Container = styled(motion.div)`
  width: 600px;
  min-width: 300px;
  background: #fff;
  border-radius: 10px;
  padding: 1em;
  box-shadow: rgb(237 239 247 / 47%) 0px 10px 20px,
    rgb(237 239 247 / 47%) 0px 6px 6px;
  .errors-red {
    color: red;
    font-size: 0.9rem;
    margin: 0.5em 0 0 0;
  }
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
  .btn-next-step {
    padding: 1em;
    background: transparent;
  }
  .roteted-svg {
    width: 10px;
    height: 10px;
    margin: 0 0.5em;
    transform: rotate(90deg);
  }
`;
