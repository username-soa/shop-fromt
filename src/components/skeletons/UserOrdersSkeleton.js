import React from "react";
import styled from "styled-components";
import SkeletonElement from "./SkeletonElement";
import Shimmer from "./Shimmer";

const UserOrdersSkeleton = ({ margin }) => {
  const renderSkeletonElements = () => {
    const items = [];
    for (let index = 0; index < 10; index++) {
      items.push(
        <div className="grid-skeleton">
          <SkeletonElement type="text" />
          <SkeletonElement type="text" />
          <SkeletonElement type="text" />
          <SkeletonElement type="text" />
          <SkeletonElement type="text" />
        </div>
      );
    }
    return items;
  };
  return (
    <Container
      className={
        margin ? `skeleton-wrapper light extra-m` : `skeleton-wrapper light`
      }
    >
      <div className="table">
        <div className="grid-skeleton">
          <SkeletonElement type="text" />
          <SkeletonElement type="text" />
          <SkeletonElement type="text" />
          <SkeletonElement type="text" />
          <h6 className="empty-h6" />
        </div>
        {renderSkeletonElements()}
      </div>
      <Shimmer />
    </Container>
  );
};

export default UserOrdersSkeleton;

const Container = styled.div`
  .grid-skeleton {
    display: grid;
    grid-template-columns: 1fr 1fr 1fr 1fr 0.5fr;
    grid-gap: 1em;
    grid-template-rows: auto;
    align-items: center;
    padding: 0.5em 1em;
  }
  @media only screen and (max-width: 1200px) {
    margin-top: 1em;
  }
`;
