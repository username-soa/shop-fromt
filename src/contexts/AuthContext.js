import React, { createContext, useState, useEffect } from "react";
import jwt from "jsonwebtoken";
import gql from "graphql-tag";
import { useMutation } from "@apollo/react-hooks";

const AdminContext = createContext({});

export const AdminProvider = ({ children }) => {
  const [customer, setCustomer] = useState({});
  const [customerToken, setCustomertoken] = useState({});
  const [getToken, setGettoken] = useState({
    status: null,
    email: null,
    password: null,
  });

  //   const updateUser = (update) => {
  //     const Obj = { ...customer, ...update };
  //     const token = jwt.sign(Obj, "d6d82b79-5226-454c-a36d-17bc13bcd6f2");
  //     localStorage.removeItem("ec_shopify_token");
  //     localStorage.setItem("ec_shopify_token", token);
  //     setCustomer({ ...customer, update });
  //   };

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

  const [customerAccessTokenCreate, { dd, ll, er }] =
    useMutation(Logincustomer);

  const adminContext = {
    customer,
    setCustomer,
    customerToken,
    setCustomertoken,
    getToken,
    setGettoken,
    // updateUser,
  };

  useEffect(() => {
    const storage = localStorage.getItem("ec_shopify_token");
    jwt.verify(
      storage,
      "d6d82b79-5226-454c-a36d-17bc13bcd6f2",
      (err, decoded) => {
        if (decoded) {
          setCustomer(decoded);
        }
      }
    );
    //get accesstoken from localstorege
    if (localStorage.getItem("ec_shopify_accessToken") !== null) {
      let currentToken;
      const accessToken = localStorage.getItem("ec_shopify_accessToken");
      jwt.verify(
        accessToken,
        "d6d82b79-5226-454c-a36d-17bc13bcd6f2",
        (err, decoded) => {
          if (decoded) {
            currentToken = decoded;
            setCustomertoken(decoded);
          }
        }
      );
      const expirationDate = new Date(currentToken.expiresAt);
      console.log(expirationDate);
    }
  }, []);

  useEffect(() => {
    if (
      localStorage.getItem("ec_shopify_accessToken") === null &&
      getToken?.status !== null
    ) {
      console.log("inside getting user access token");
      const input = {
        email: getToken?.email,
        password: getToken?.password,
      };
      console.log(input);
      customerAccessTokenCreate({
        variables: { input },
      }).then((res) => {
        console.log("success while getting user access token : ", res);
        if (res.data.customerAccessTokenCreate.customerAccessToken) {
          console.log(res);
          setCustomertoken(
            res.data.customerAccessTokenCreate.customerAccessToken
          );
          const ec_access_token = jwt.sign(
            res.data.customerAccessTokenCreate.customerAccessToken,
            "d6d82b79-5226-454c-a36d-17bc13bcd6f2"
          );
          localStorage.setItem("ec_shopify_accessToken", ec_access_token);
        } else {
          console.log("error while getting user access token : ", res);
          res.data.customerAccessTokenCreate.userErrors.forEach(function (
            error
          ) {
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
    }
  }, [getToken]);

  return (
    <AdminContext.Provider value={adminContext}>
      {children}
    </AdminContext.Provider>
  );
};

export const AdminConsumer = AdminContext.Consumer;

export default AdminContext;
