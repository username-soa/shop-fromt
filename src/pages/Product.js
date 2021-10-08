import React, { useEffect, useState, useContext } from "react";
import { useParams, useLocation } from "react-router-dom";
import { motion } from "framer-motion";
import styled from "styled-components";
import useHasBeenViewed from "../hooks/useHasBeenViewed";
import Layout from "../layouts/DefaultLayout";
import ProductImages from "../components/CartComponents/ProductImages";
import ProductInfo from "../components/CartComponents/ProductInfo";
import CustomHelmet from "../components/elements/CustomHelmet";
import ProductCart from "../components/CartComponents/ProductCard";
import ProductInfoSkeleton from "../components/skeletons/ProductInfoSkeleton";
import ProductCartSkeleton from "../components/skeletons/ProductCartSkeleton";
import ProductImagesSkeleton from "../components/skeletons/ProductImagesSkeleton";
import HeaderSkeleton from "../components/skeletons/HeaderSkeleton";
import { productList } from "../utils/Products";
import useIsAllowed from "../hooks/useIsAllowed";
import useTrackHovers from "../hooks/useTrackHovers";
import usePageClicks from "../hooks/usePageClicks";
import usePageVisits from "../hooks/usePageVisits";
import usePageScrolls from "../hooks/usePagsScrolls";
import ClicksContext from "../contexts/ClicksContext";

const Product = () => {
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
  const { uid, cid } = useParams();
  const location = useLocation();
  const { allowedpages, trackHoverData } = useContext(ClicksContext);
  const [loading, setLoading] = useState(true);
  const [hasBeenViewed, ref] = useHasBeenViewed();
  const pageStatus = useIsAllowed(location?.pathname);
  usePageClicks(pageStatus?.clicks, "mousedown", location?.pathname);
  useTrackHovers(pageStatus?.hovers, "mousemove", location?.pathname);
  usePageScrolls(pageStatus?.scroll, "scroll", location?.pathname);
  usePageVisits(pageStatus?.visits, pageStatus?.pageID);
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
        <SkContainer>
          <div className="page-row row-3">
            <ProductImagesSkeleton />
            <ProductInfoSkeleton />
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
            <ProductCartSkeleton />
            <ProductCartSkeleton />
            <ProductCartSkeleton />
            <ProductCartSkeleton />
            <ProductCartSkeleton />
            <ProductCartSkeleton />
          </div>
        </SkContainer>
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
        <CustomHelmet title="Produit détails" />
        <div className="product-info-top">
          <ProductImages />
          <ProductInfo />
        </div>
        <motion.h2
          className="similar-products-h2"
          ref={ref}
          animate={hasBeenViewed ? "visible" : "hidden"}
          initial="hidden"
          variants={H2Variants}
        >
          Produits similaires
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

export default Product;

const Container = styled(motion.div)`
  padding: 2em;
  .product-info-top {
    display: grid;
    grid-template-columns: 50% 50%;
  }
  .similar-products-h2 {
    color: #393d46;
    font-size: 4rem;
    font-weight: 400;
    line-height: 2em;
    margin: 1em 0;
  }
  .similar-products-container {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
    padding: 0 150px;
  }
  @media only screen and (max-width: 1400px) {
    .similar-products-container {
      padding: 0;
    }
  }
  @media only screen and (max-width: 1200px) {
    .product-info-top {
      grid-template-columns: 100% !important;
      grid-template-rows: auto auto;
    }
    .similar-products-h2 {
      font-size: 30px;
    }
  }
  @media only screen and (max-width: 768px) {
    .similar-products-h2 {
      font-size: 24px;
    }
  }
`;

const SkContainer = styled.div``;
