import React, { useState, useContext, useEffect } from "react";
import styled from "styled-components";
import { useHistory } from "react-router-dom";
import { motion } from "framer-motion";
import firebase from "firebase/app";
import { graphql } from "react-apollo";
import { useMutation } from "@apollo/react-hooks";
import gql from "graphql-tag";
import LoginForm from "../components/FormeComponents/LoginForm";
import SigninForm from "../components/FormeComponents/SigninForm";
import AdminContext from "../contexts/AuthContext";
import jwt from "jsonwebtoken";

const LoginPage = () => {
  const db = firebase.firestore();
  const Logincustomer = gql`
    mutation customerAccessTokenCreate(
      $input: CustomerAccessTokenCreateInput!
    ) {
      customerAccessTokenCreate(input: $input) {
        userErrors {
          field
          message
        }
        customerAccessToken {
          accessToken
          expiresAt
        }
      }
    }
  `;

  const createCustomer = gql`
    mutation customerCreate($input: CustomerCreateInput!) {
      customerCreate(input: $input) {
        userErrors {
          field
          message
        }
        customer {
          id
          createdAt
          displayName
          email
          firstName
          lastName
        }
      }
    }
  `;
  const { setCustomer, setCustomertoken, getToken, setGettoken } =
    useContext(AdminContext);
  const history = useHistory();
  const [show, setShow] = useState(true);
  const [errors, setErrors] = useState(false);
  const [customerCreate, { data, loading, error }] =
    useMutation(createCustomer);
  const [customerAccessTokenCreate, { dd, ll, er }] =
    useMutation(Logincustomer);

  const signup = async (d, newPhone) => {
    console.log(newPhone);
    setErrors(false);

    const input = {
      email: d.email,
      password: d.pwd,
      firstName: d.fname,
      lastName: d.lname,
      phone: newPhone,
    };

    customerCreate({ variables: { input } }).then(async (res) => {
      if (res.data.customerCreate.customer) {
        console.log(res);
        const userToken = {};
        userToken.shopifyID = res.data.customerCreate.customer.id;
        userToken.createdAt = res.data.customerCreate.customer.createdAt;
        userToken.displayName = res.data.customerCreate.customer.displayName;
        userToken.email = res.data.customerCreate.customer.email;
        userToken.firstName = res.data.customerCreate.customer.firstName;
        userToken.lastName = res.data.customerCreate.customer.lastName;
        userToken.phone = newPhone;
        const ec_auth_token = jwt.sign(
          userToken,
          "d6d82b79-5226-454c-a36d-17bc13bcd6f2"
        );
        localStorage.setItem("ec_shopify_token", ec_auth_token);
        await db
          .collection("shopifyUsers")
          .doc(userToken.shopifyID)
          .set({ ...userToken })
          .then(() => {
            console.log("user saved to firebase");
            setGettoken({
              ...getToken,
              status: true,
              email: userToken.email,
              password: d.pwd,
            });
            setCustomer(userToken);
            history.push("/");
          })
          .catch((err) => {
            console.log(err.message);
          });
      } else {
        console.log("error has happened");
        console.log(res.data.customerCreate.userErrors);
        res.data.customerCreate.userErrors.forEach(function (error) {
          if (error.field && error.field === "email") {
            console.log(error.message);
          } else if (error.field && error.field === "password") {
            console.log(error.message);
          } else if (error.field && error.field === "phone") {
            console.log(error.message);
          }
        });
        setErrors(true);
      }
    });
  };

  const login = (d) => {
    setErrors(false);
    const input = {
      email: d.email,
      password: d.pwd,
    };
    customerAccessTokenCreate({
      variables: { input },
    }).then(async (res) => {
      if (res.data.customerAccessTokenCreate.customerAccessToken) {
        console.log(res);
        await db
          .collection("shopifyUsers")
          .where("email", "==", d.email)
          .get()
          .then((snapshot) => {
            snapshot.forEach((doc) => {
              const result = doc.data();
              const ec_auth_token = jwt.sign(
                result,
                "d6d82b79-5226-454c-a36d-17bc13bcd6f2"
              );
              localStorage.setItem("ec_shopify_token", ec_auth_token);
              setCustomer(result);
            });
          })
          .catch((err) => console.log(err.message));

        setCustomertoken(
          res.data.customerAccessTokenCreate.customerAccessToken
        );
        const ec_access_token = jwt.sign(
          res.data.customerAccessTokenCreate.customerAccessToken,
          "d6d82b79-5226-454c-a36d-17bc13bcd6f2"
        );
        localStorage.setItem("ec_shopify_accessToken", ec_access_token);
        history.push("/");
      } else {
        setErrors(true);
        res.data.customerAccessTokenCreate.userErrors.forEach(function (error) {
          if (error.field && error.field === "email") {
            console.log(error.message);
          } else if (error.field && error.field === "password") {
            console.log(error.message);
          } else {
            console.log(error.message);
          }
        });
      }
    });

    return data;
  };

  return (
    <Container
      exit={{
        opacity: 0,
        transition: { ease: "easeInOut" },
      }}
    >
      {show ? (
        <LoginForm setState={setShow} state={show} handleLogin={login} />
      ) : (
        <SigninForm
          setState={setShow}
          state={show}
          handleSignup={signup}
          errors={errors}
        />
      )}
    </Container>
  );
};

export default LoginPage;

const Container = styled(motion.div)`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: 100vh;
  background: #f8f8f8;
`;
