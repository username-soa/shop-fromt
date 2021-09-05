import React from "react";
import styled from "styled-components";

const UserProfileContainer = ({ children }) => {
  return <Container>{children}</Container>;
};

export default UserProfileContainer;

const Container = styled.div`
  display: grid;
  grid-template-columns: 330px auto;
  padding: 2em 150px;
  @media only screen and (max-width: 1200px) {
    grid-template-columns: 100% !important;
    grid-template-rows: auto;
    padding: 2em;
  }
  @media only screen and (max-width: 768px) {
  }
`;
