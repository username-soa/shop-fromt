import React from "react";
import styled from "styled-components";
import { motion } from "framer-motion";
import Layout from "../layouts/DefaultLayout";
import CustomHelmet from "../components/elements/CustomHelmet";
import UserProfileNavigator from "../components/elements/UserProfileNavigator";
import UserProfileContainer from "../layouts/UserAccountContainer";
import UserAdresseForm from "../components/FormeComponents/UserAdresseForm";

const UserAdresse = () => {
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
          <UserAdresseForm />
        </UserProfileContainer>
      </Container>
    </Layout>
  );
};

export default UserAdresse;

const Container = styled(motion.div)``;
