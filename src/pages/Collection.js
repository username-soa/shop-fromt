import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { useLocation } from "react-router-dom";
import styled from "styled-components";
import useHasBeenViewed from "../hooks/useHasBeenViewed";
import Layout from "../layouts/DefaultLayout";
import CustomHelmet from "../components/elements/CustomHelmet";
import ProductCart from "../components/CartComponents/ProductCard";
import HomeMainCart from "../components/CartComponents/HomeMainCart";
import CollectionSkeleton from "../components/skeletons/CollectionSkeleton";
import ProductCartSkeleton from "../components/skeletons/ProductCartSkeleton";
import HeaderSkeleton from "../components/skeletons/HeaderSkeleton";
import useIsAllowed from "../hooks/useIsAllowed";
import useTrackHovers from "../hooks/useTrackHovers";
import usePageClicks from "../hooks/usePageClicks";
import usePageVisits from "../hooks/usePageVisits";
import usePageScrolls from "../hooks/usePagsScrolls";
import { productList } from "../utils/Products";

const Collection = () => {
  const location = useLocation();
  const pageStatus = useIsAllowed(location?.pathname);
  usePageClicks(pageStatus?.clicks, "mousedown", location?.pathname);
  useTrackHovers(pageStatus?.hovers, "mousemove", location?.pathname);
  usePageScrolls(pageStatus?.scroll, "scroll", location?.pathname);
  usePageVisits(pageStatus?.visits, pageStatus?.pageID);

  const H2Variants = {
    hidden: { opacity: 0, y: "100px" },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.5, delay: 1, type: "Inertia" },
    },
  };
  const ProductsVariants = {
    hidden: { opacity: 0, y: "100px" },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.5, delay: 0.5, type: "Inertia" },
    },
  };
  const [hasBeenViewed, ref] = useHasBeenViewed();
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
    }, 2000);
    return () => {
      clearTimeout(timer);
    };
  }, []);

  if (loading) {
    return (
      <Layout>
        <Container>
          <CollectionSkeleton margin />
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
            <ProductCartSkeleton />
            <ProductCartSkeleton />
            <ProductCartSkeleton />
            <ProductCartSkeleton />
            <ProductCartSkeleton />
            <ProductCartSkeleton />
          </div>
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
        <CustomHelmet title="Catégorie détails" />
        <HomeMainCart collection />
        <motion.h2
          className="categorie-h2"
          ref={ref}
          animate={hasBeenViewed ? "visible" : "hidden"}
          initial="hidden"
          variants={H2Variants}
        >
          List Des Produits
        </motion.h2>
        <motion.div
          className="similar-products-container page-row"
          ref={ref}
          animate={hasBeenViewed ? "visible" : "hidden"}
          initial="hidden"
          variants={ProductsVariants}
        >
          {productList.map((i, index) => {
            return (
              <ProductCart
                key={`similar-p-${index}`}
                title={i.name}
                price={i.price}
              />
            );
          })}
        </motion.div>
      </Container>
    </Layout>
  );
};

export default Collection;

const Container = styled(motion.div)`
  .categorie-h2 {
    color: #393d46;
    font-size: 4rem;
    font-weight: 400;
    line-height: 2em;
    margin: 1em 0 1em 1em;
  }
  .similar-products-container {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
    padding: 0 150px;
  }
  @media only screen and (max-width: 1400px) {
    .similar-products-container {
      padding: 1em;
    }
  }
  @media only screen and (max-width: 1200px) {
    .product-info-top {
      grid-template-columns: 100% !important;
      grid-template-rows: auto auto;
    }
    .categorie-h2 {
      font-size: 30px;
    }
  }
  @media only screen and (max-width: 768px) {
    .categorie-h2 {
      font-size: 24px;
    }
  }
`;
