import React from "react";
import styled from "styled-components";
import { NavLink } from "react-router-dom";

const MenuLink = ({ to, title, SvgIcone, external, state, setState }) => {
  return (
    <Container>
      <button onClick={() => setState(false)}>
        <NavLink
          exact
          className="dash-link"
          to={
            external
              ? {
                  pathname: to,
                }
              : to
          }
          target={external ? "_blank" : null}
        >
          <SvgIcone />
          <span>{title}</span>
        </NavLink>
      </button>
    </Container>
  );
};

export default MenuLink;

const Container = styled.div`
  button {
    width: 100% !important;
    background: transparent;
    &:hover {
      span {
        background-color: #fff;
        color: #000;
        padding: 2px 10px !important;
        text-transform: capitalize;
      }
    }
  }
  .dash-link {
    padding: 0.5em;
    cursor: pointer;
    svg {
      margin-right: 0.75em;
      fill: #abb3c4 !important;
      transition: all 0.4s;
      width: 15px;
      height: 15px;
      g {
        path {
          fill: #abb3c4 !important;
        }
      }
    }
    span {
      font-size: 1.125rem;
      font-family: neue-haas-unica, sans-serif;
      font-weight: 800;
      display: inline-block;
      position: relative;
      color: #fff;
      padding: 2px 0;
      line-height: 1.2;
      text-transform: uppercase;
      transition: all 0.4s;
      white-space: nowrap;
    }
  }
`;
