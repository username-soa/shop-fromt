import React from "react";
import styled from "styled-components";

const AdvantagesCart = ({ Icon, title, text, bg }) => {
  return (
    <Container bg={bg}>
      {Icon ? <Icon /> : null}
      <h3>{title}</h3>
      <p>{text}</p>
    </Container>
  );
};

export default AdvantagesCart;

const Container = styled.div`
  background: #fff;
  margin: 1em;
  padding: 2em;
  box-shadow: 0px 50px 130px 0px rgb(57 61 70 / 15%);
  background: ${(props) => (props.bg ? props.bg : null)};
  svg {
    width: 50px;
    height: 50px;
  }
  h3,
  p {
    margin: 1em 0;
    text-align: justify;
  }
  h3 {
    color: #393d46;
    font-size: 24px;
    font-weight: 500;
    line-height: 1.5em;
  }
  p {
    color: #68768e;
    font-size: 15px;
    font-weight: 400;
    line-height: 1.8em;
  }
  @media only screen and (max-width: 1200px) {
    svg {
      width: 40px;
      height: 40px;
    }
    h3 {
      font-size: 18px;
    }
    p {
      font-size: 14px;
    }
  }
  @media only screen and (max-width: 768px) {
  }
`;
