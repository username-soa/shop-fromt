import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { motion } from "framer-motion";
import { useLocation } from "react-router-dom";
import Layout from "../layouts/DefaultLayout";
import CustomHelmet from "../components/elements/CustomHelmet";
import UserProfileNavigator from "../components/elements/UserProfileNavigator";
import UserProfileContainer from "../layouts/UserAccountContainer";
import UserCommandeList from "../components/CartComponents/UserCommandeList";
import Pagination from "../components/elements/Pagination";
import UserOrdersSkeleton from "../components/skeletons/UserOrdersSkeleton";
import useIsAllowed from "../hooks/useIsAllowed";
import useTrackHovers from "../hooks/useTrackHovers";
import usePageClicks from "../hooks/usePageClicks";
import usePageVisits from "../hooks/usePageVisits";
import usePageScrolls from "../hooks/usePagsScrolls";

const UserOrders = () => {
  const location = useLocation();
  const pageStatus = useIsAllowed(location?.pathname);
  usePageClicks(pageStatus?.clicks, "mousedown", location?.pathname);
  useTrackHovers(pageStatus?.hovers, "mousemove", location?.pathname);
  usePageScrolls(pageStatus?.scroll, "scroll", location?.pathname);
  usePageVisits(pageStatus?.visits, pageStatus?.pageID);

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
          <CustomHelmet title="Page Commandes" />
          <UserProfileContainer>
            <UserProfileNavigator />
            <UserOrdersSkeleton />
          </UserProfileContainer>
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
        <CustomHelmet title="Page Commandes" />
        <UserProfileContainer>
          <UserProfileNavigator />
          <div>
            <UserCommandeList />
            <Pagination
              postsPerPage={10}
              paginate={() => {
                return null;
              }}
              setCurrrentPage={() => {
                return null;
              }}
              totalPosts={20}
              currentPage={1}
            />
          </div>
        </UserProfileContainer>
      </Container>
    </Layout>
  );
};

export default UserOrders;

const Container = styled(motion.div)`
  /* .grid {
    display: grid;
    grid-template-columns: 1fr 1fr 1fr 1fr 0.5fr;
    grid-gap: 1em;
    grid-template-rows: auto;
    align-items: center;
    padding: 0.5em 1em;
  } */
`;
