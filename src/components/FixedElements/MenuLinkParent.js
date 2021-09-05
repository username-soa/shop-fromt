import React, { useState } from "react";
import styled from "styled-components";

const MenuLinkParent = ({ SvgComp, children, title }) => {
  const [isActive, setIsActive] = useState(false);
  return (
    <Container isActive={isActive}>
      <h4 className="parent-categorie-title">{title}</h4>
      <div className="child-link">{children}</div>
    </Container>
  );
};

export default MenuLinkParent;

const Container = styled.div`
  margin: 0.5em 1em;
  .parent-categorie-title {
    color: #d8d8d8;
    font-size: 0.875rem;
    font-family: neue-haas-unica, sans-serif;
    font-weight: 400;
    text-transform: uppercase;
    margin-bottom: 10px;
  }
`;
