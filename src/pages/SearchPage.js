import React, {
  useState,
  useEffect,
  useContext,
  useCallback,
  useRef,
} from "react";
import styled from "styled-components";
import { motion } from "framer-motion";
import { useParams, useHistory, useLocation } from "react-router-dom";
import { useQuery, useLazyQuery } from "@apollo/react-hooks";
import gql from "graphql-tag";
import firebase from "firebase/app";
import Layout from "../layouts/DefaultLayout";
import Button from "../components/elements/Button";
import CustomHelmet from "../components/elements/CustomHelmet";
import { ReactComponent as LogoIcone } from "../assets/logo.svg";
// import Spinner from "../components/elements/Spinner";
// import IsEmpty from "../components/elements/IsEmpty";
// import Filter from "../components/Filter/Filter";
import ClientContext from "../contexts/ClientContext";
import "rc-slider/assets/index.css";
import useIsAllowed from "../hooks/useIsAllowed";
import useTrackHovers from "../hooks/useTrackHovers";
import usePageClicks from "../hooks/usePageClicks";
import usePageVisits from "../hooks/usePageVisits";
import usePageScrolls from "../hooks/usePagsScrolls";

const SearchPage = () => {
  let isMounted = true;
  let { p } = useParams();
  const history = useHistory();
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
        <CustomHelmet title="Search" />
        search
      </Container>
    </Layout>
  );
};

export default SearchPage;

const Container = styled(motion.div)``;
