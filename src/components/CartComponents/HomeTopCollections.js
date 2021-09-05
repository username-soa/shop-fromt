import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { motion, useAnimation } from "framer-motion";
import { useInView } from "react-intersection-observer";
import useHasBeenViewed from "../../hooks/useHasBeenViewed";
import HomeCollectionCart from "../elements/HomeCollectionCart";
import collection1 from "../../assets/collection1.png";
import collection2 from "../../assets/collection2.png";

const HomeTopCollections = () => {
  let isMounted = true;
  const [hasBeenViewed, ref] = useHasBeenViewed();

  return (
    <Container ref={ref}>
      <HomeCollectionCart
        origin="-100vw"
        hasBeenViewed={hasBeenViewed}
        img={collection1}
        title="THE BLACK BEAUTY"
        text="Look sophisticated in our new collection of all-black clothing ensemble."
        type="NOUVELLES ARRIVÉES"
      />
      <HomeCollectionCart
        origin="100vw"
        hasBeenViewed={hasBeenViewed}
        img={collection2}
        title="WINTER’S BEST"
        text="Check out our best winter collection to stay warm in style this season."
        type="WINTER COLLECTION"
      />
    </Container>
  );
};

export default HomeTopCollections;

const Container = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  margin: 2em 150px;
  grid-gap: 1em;

  @media only screen and (max-width: 1200px) {
    margin: 1em;
  }
  @media only screen and (max-width: 768px) {
    grid-template-columns: 100%;
  }
`;
