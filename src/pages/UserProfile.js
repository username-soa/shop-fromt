import React, { useContext } from "react";
import styled from "styled-components";
import { motion } from "framer-motion";
import Layout from "../layouts/DefaultLayout";
import CustomHelmet from "../components/elements/CustomHelmet";
import UserProfileNavigator from "../components/elements/UserProfileNavigator";
import UserProfileContainer from "../layouts/UserAccountContainer";
import UserInfoForm from "../components/FormeComponents/UserInfoForm";
import UserContext from "../contexts/UserExperienceContext";
import jwt from "jsonwebtoken";

const UserProfilePage = () => {
  const { updateUserCreds } = useContext(UserContext);

  const updateUserInfo = async (data, shopifyID) => {
    if (localStorage.getItem("ec_user_token") !== null) {
      const userToken = localStorage.getItem("ec_user_token");
      jwt.verify(
        userToken,
        "d6d82b79-5226-454c-a36d-17bc13bcd6f2",
        async (err, decoded) => {
          const newUser = decoded;
          const obj = {};
          obj.email = data?.email;
          obj.firstname = data?.fname;
          obj.lastname = data?.lname;
          obj.phone = data?.phone;
          newUser.userCreds = obj;
          await updateUserCreds(obj, decoded?.documentId, newUser);
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
        <CustomHelmet title="Page Profile" />
        <UserProfileContainer>
          <UserProfileNavigator />
          <UserInfoForm updateInfo={updateUserInfo} />
        </UserProfileContainer>
      </Container>
    </Layout>
  );
};

export default UserProfilePage;

const Container = styled(motion.div)``;
