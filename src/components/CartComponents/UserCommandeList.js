import React, { Fragment } from "react";
import styled from "styled-components";
import Button from "../elements/Button";
import { ordersList } from "../../utils/orders";

const UserCommandeList = () => {
  return (
    <Container>
      <div className="table">
        <div className="grid">
          <h6>Name </h6>
          <h6>Email</h6>
          <h6>Username</h6>
          <h6>Role</h6>
          <h6 className="empty-h6" />
        </div>
        {ordersList.map((i, index) => {
          return (
            <div className="grid hover-grid">
              <h5>{i.name}</h5>
              <h5>{i.date}</h5>
              <h5>{i.status}</h5>
              <h5>{i.total}</h5>
              <h5 className="empty-h6">
                <Button
                  handleClick={() => {
                    console.log("soon!");
                  }}
                  bg="#fff"
                  color="#393d46"
                  title="Voir plus"
                  border="#393d46"
                  hover="#393d46"
                  margin="0"
                  radius="0"
                  padding="7px 10px"
                />
              </h5>
            </div>
          );
        })}
      </div>
    </Container>
  );
};

export default UserCommandeList;
const Container = styled.div`
  padding: 1em;
  background: #fff;
  box-shadow: rgb(237 239 247 / 47%) 0px 10px 20px,
    rgb(237 239 247 / 47%) 0px 6px 6px;
  h5 {
    font-size: 14px;
    font-weight: 400;
    color: #726e6e;
    display: flex;
    align-items: center;
    white-space: nowrap;
    padding: 1em 0.5em 1em 0;
    position: relative;
    &.h5-no-padding {
      padding: 0.5em !important;
    }
    &.no-border {
      border-bottom: none;
    }
  }
  h6 {
    font-size: 13px;
    font-weight: 600;
    color: #000;
    display: flex;
    align-items: center;
    white-space: nowrap;
    padding: 1em 0.5em 1em 0;
    border-bottom: 1px solid #dfe0eb;
  }
  .empty-h6 {
    height: 47px;
  }
  .table {
    overflow-x: auto;
  }
  .grid {
    display: grid;
    grid-template-columns: 1fr 1fr 1fr 1fr 0.5fr;
    grid-template-rows: auto;
    align-items: center;
    padding: 0.5em 1em;
  }
  .hover-grid {
    &:hover {
      > h5 {
        color: #000 !important;
      }
      background: RGBA(159, 162, 180, 0.08);
    }
  }
  @media only screen and (max-width: 1200px) {
    margin-top: 1em;
  }
`;
