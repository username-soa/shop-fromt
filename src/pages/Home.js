import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { motion } from "framer-motion";
import Layout from "../layouts/DefaultLayout";
import CustomHelmet from "../components/elements/CustomHelmet";
import HomeMainCart from "../components/CartComponents/HomeMainCart";
import HomeAdvantagesCart from "../components/CartComponents/HomeAdvantagesCart";
import HomePartnersCart from "../components/CartComponents/HomePartenersCart";
import HomeTopCollections from "../components/CartComponents/HomeTopCollections";
import HomeProductsShowcase from "../components/CartComponents/HomeProductsShowcase";
import CollectionSkeleton from "../components/skeletons/CollectionSkeleton";
import ProductCartSkeleton from "../components/skeletons/ProductCartSkeleton";
import HeaderSkeleton from "../components/skeletons/HeaderSkeleton";

const Home = () => {
  const exitVariants = {
    exit: {
      x: "-100vh",
      transition: { ease: "easeInOut" },
    },
  };
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
    }, 1000);
    return () => {
      clearTimeout(timer);
    };
  }, []);

  if (loading) {
    return (
      <Layout>
        <Container>
          <CollectionSkeleton margin />
          <div className="page-row row-1">
            <CollectionSkeleton />
            <CollectionSkeleton />
          </div>
          <div className="page-row">
            <HeaderSkeleton />
          </div>
          <div className="page-row row-2">
            <ProductCartSkeleton />
            <ProductCartSkeleton />
            <ProductCartSkeleton />
            <ProductCartSkeleton />
            <ProductCartSkeleton />
            <ProductCartSkeleton />
          </div>
          <HomeAdvantagesCart />
          <HomePartnersCart />
        </Container>
      </Layout>
    );
  }
  return (
    <Layout>
      <Container
        exit={{
          opacity: 0,
          transition: { ease: "easeInOut" },
        }}
      >
        <CustomHelmet title="Page d'accueils" />
        <HomeMainCart />
        <HomeProductsShowcase />
        <HomeTopCollections />
        <HomeAdvantagesCart />
        <HomePartnersCart />
      </Container>
    </Layout>
  );
};

export default Home;

const Container = styled(motion.div)`
  .void-space {
    height: 100vh;
  }
`;
