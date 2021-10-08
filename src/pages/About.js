import React, { useContext } from "react";
import styled from "styled-components";
import { useLocation } from "react-router-dom";
import { motion } from "framer-motion";
import Layout from "../layouts/DefaultLayout";
import CustomHelmet from "../components/elements/CustomHelmet";
import HomeAdvantagesCart from "../components/CartComponents/HomeAdvantagesCart";
import ExtraAdvantagesCart from "../components/CartComponents/ExtraAdvanatagesCart";
import HomePartnersCart from "../components/CartComponents/HomePartenersCart";
import AboutUsCart from "../components/CartComponents/AboutUsCart";
import useIsAllowed from "../hooks/useIsAllowed";
import useTrackHovers from "../hooks/useTrackHovers";
import usePageClicks from "../hooks/usePageClicks";
import usePageVisits from "../hooks/usePageVisits";
import usePageScrolls from "../hooks/usePagsScrolls";

const AboutPage = () => {
  const location = useLocation();
  const pageStatus = useIsAllowed(location?.pathname);
  usePageClicks(pageStatus?.clicks, "mousedown", location?.pathname);
  useTrackHovers(pageStatus?.hovers, "mousemove", location?.pathname);
  usePageScrolls(pageStatus?.scroll, "scroll", location?.pathname);
  usePageVisits(pageStatus?.visits, pageStatus?.pageID);
  return (
    <Layout>
      <Container
        exit={{
          opacity: 0,
          transition: { ease: "easeInOut" },
        }}
      >
        <CustomHelmet title="À propos de nous" />
        <AboutUsCart />
        <HomeAdvantagesCart />
        <ExtraAdvantagesCart />
        <HomePartnersCart />
      </Container>
    </Layout>
  );
};

export default AboutPage;

const Container = styled(motion.div)``;
