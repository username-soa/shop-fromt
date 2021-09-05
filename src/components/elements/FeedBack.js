import React from "react";
import styled from "styled-components";

const FeedBack = ({ message, bg, opacity, color }) => {
  return (
    <Container className="feedback" bg={bg} opacity={opacity} color={color}>
      <span>{message}</span>
    </Container>
  );
};

export default FeedBack;

const Container = styled.div`
  transition: all 0.3s;
  background: ${(props) => (props.bg ? props.bg : "#000")};
  border-radius: 7px;
  padding: 0.5em 0.75em;
  width: fit-content;
  height: fit-content;
  margin: 0 1em;
  position: fixed;
  right: 10px;
  bottom: 10px;
  z-index: 99999;
  span {
    color: ${(props) => (props.color ? props.color : "#000")};
  }
`;
