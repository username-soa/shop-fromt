import React from "react";
import styled from "styled-components";
import { motion } from "framer-motion";
import { Link, useLocation } from "react-router-dom";
import CustomHelmet from "../components/elements/CustomHelmet";
import Layout from "../layouts/DefaultLayout";
import FaqQuestion from "../components/elements/FaqQuestion ";
import useIsAllowed from "../hooks/useIsAllowed";
import useTrackHovers from "../hooks/useTrackHovers";
import usePageClicks from "../hooks/usePageClicks";
import usePageVisits from "../hooks/usePageVisits";
import usePageScrolls from "../hooks/usePagsScrolls";

const FAQs = () => {
  const location = useLocation();
  const pageStatus = useIsAllowed(location?.pathname);
  usePageClicks(pageStatus?.clicks, "mousedown", location?.pathname);
  useTrackHovers(pageStatus?.hovers, "mousemove", location?.pathname);
  usePageScrolls(pageStatus?.scroll, "scroll", location?.pathname);
  usePageVisits(pageStatus?.visits, pageStatus?.pageID);

  const ExtrainfoVariants = {
    hidden: { opacity: 0, y: "100px" },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 1, type: "Inertia" },
    },
  };
  return (
    <Layout>
      <Container
        exit={{
          opacity: 0,
          transition: { ease: "easeInOut" },
        }}
      >
        <CustomHelmet title="FAQs" />
        <motion.h2
          animate="visible"
          initial="hidden"
          variants={ExtrainfoVariants}
          className="popular-brands-h2"
        >
          Questions Fréquemment Posées
        </motion.h2>
        <FaqQuestion title="Je suis client et j'ai une question concernant mon achat. Qui dois-je contacter ?">
          <p>
            Nous sommes toujours là pour vous accompagner tout au long du
            processus ! Si vous êtes un client, vous pouvez vérifier ou demander
            de l'aide pour votre commande ici ou appeler le service client au
            +212 528230735, ou bien voir la page de{" "}
            <Link to="/contact">contact</Link> pour plus d'oinformations.
          </p>
        </FaqQuestion>
        <FaqQuestion title="Comment puis-je me tenir au courant des dernières nouvelles de Yacado Pêche ?">
          <p>
            Pour les dernières nouvelles de Yacado Pêche, veuillez vous inscrire
            à notre newsletter
          </p>
        </FaqQuestion>
        <FaqQuestion title="Où puis-je trouver la politique d'expédition de Yacado Pêche ?">
          <p>
            Vous pouvez trouver la politique d'expédition sur la page{" "}
            <Link to="/livraison">Livraison</Link>.
          </p>
        </FaqQuestion>

        <FaqQuestion title="Où puis-je trouver des informations sur l'entreprise ?">
          {/* <AnimatePresence> */}
          <p
          // exit={{
          //   opacity: 0,
          //   x: "100px",
          //   transition: { duration: 0.5, type: "Inertia" },
          // }}
          >
            Vous pouvez trouver tous les information sur le store Digital Era
            sur la page <Link to="/about">A propos.</Link>
          </p>
          {/* </AnimatePresence> */}
        </FaqQuestion>
      </Container>
    </Layout>
  );
};

export default FAQs;

const Container = styled(motion.div)`
  padding: 2em 150px;
  h2 {
    color: #393d46;
    font-size: 2.5rem;
    font-weight: 400;
    line-height: 2em;
    letter-spacing: 2px;
    grid-column: 1/3;
    margin: 0.5em;
  }
  p {
    text-align: justify;
  }
  a {
    text-decoration: underline;
    text-align: justify;
    display: inline;
    font-weight: bold;
  }
  @media only screen and (max-width: 1200px) {
    padding: 2em;
    h2 {
      font-size: 2rem;
    }
  }
  @media only screen and (max-width: 768px) {
    padding: 1em;
    h2 {
      font-size: 1.5rem;
    }
  }
`;
