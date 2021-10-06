import React, { useState, useContext, useEffect } from "react";
import styled from "styled-components";
import { motion } from "framer-motion";
import Layout from "../layouts/DefaultLayout";
import CustomHelmet from "../components/elements/CustomHelmet";
import UserProfileNavigator from "../components/elements/UserProfileNavigator";
import UserProfileContainer from "../layouts/UserAccountContainer";
import UserAdresseForm from "../components/FormeComponents/UserAdresseForm";
import UserContext from "../contexts/UserExperienceContext";
import jwt from "jsonwebtoken";

const UserAdresse = () => {
  const { updateUserAdresse } = useContext(UserContext);

  const updateAdresse = async (data) => {
    //graphQl mutation soon ...
    //update lead address firestore
    if (localStorage.getItem("ec_user_token") !== null) {
      const userToken = localStorage.getItem("ec_user_token");
      jwt.verify(
        userToken,
        "d6d82b79-5226-454c-a36d-17bc13bcd6f2",
        async (err, decoded) => {
          const newUser = decoded;
          newUser.userAdresse = data;
          await updateUserAdresse(data, decoded?.documentId, newUser);
        }
      );
    }
  };

  return (
    <Layout>
      <Container
        exit={{
          opacity: 0,
          transition: { ease: "easeInOut" },
        }}
      >
        <CustomHelmet title="Page Adresse" />
        <UserProfileContainer>
          <UserProfileNavigator />
          <UserAdresseForm updateAdresse={updateAdresse} />
        </UserProfileContainer>
      </Container>
    </Layout>
  );
};

export default UserAdresse;

const Container = styled(motion.div)``;
