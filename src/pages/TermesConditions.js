import React from "react";
import styled from "styled-components";
import { motion } from "framer-motion";
import { useLocation } from "react-router-dom";
import CustomHelmet from "../components/elements/CustomHelmet";
import Layout from "../layouts/DefaultLayout";
import { ReactComponent as TermsIcone } from "../assets/terms.svg";
import useIsAllowed from "../hooks/useIsAllowed";
import useTrackHovers from "../hooks/useTrackHovers";
import usePageClicks from "../hooks/usePageClicks";
import usePageVisits from "../hooks/usePageVisits";
import usePageScrolls from "../hooks/usePagsScrolls";

const TermesConditions = () => {
  const location = useLocation();
  const pageStatus = useIsAllowed(location?.pathname);
  usePageClicks(pageStatus?.clicks, "mousedown", location?.pathname);
  useTrackHovers(pageStatus?.hovers, "mousemove", location?.pathname);
  usePageVisits(pageStatus?.visits, pageStatus?.pageID);
  usePageScrolls(pageStatus?.scroll, "scroll", location?.pathname);

  const HeaderVariants = {
    hidden: { y: "100px", opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: { duration: 1, type: "Inertia" },
    },
  };
  const InfoVariants = {
    hidden: { y: "100px", opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: { duration: 1, delay: 0.5, type: "Inertia" },
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
        <CustomHelmet title="Termes et conditions" />
        <motion.h2 initial="hidden" animate="visible" variants={HeaderVariants}>
          Termes et conditions
        </motion.h2>
        <div className="privacy-policy-container">
          <motion.div
            className="page-div-content"
            initial="hidden"
            animate="visible"
            variants={InfoVariants}
          >
            <p>
              Cette politique de confidentialité décrit les politiques et
              pratiques de prooV Inc et de ses affiliés et les choix que vous
              avez en matière de collecte, d'utilisation et de divulgation des
              informations fournies à nous, collectées par nous ou qui peuvent
              être générées par votre utilisation de notre site Web et de nos
              services (le «Service»). Veuillez lire attentivement cette
              politique de confidentialité avant d'utiliser le service. Chaque
              utilisation du Service par vous constitue votre consentement à la
              collecte, au transfert, au stockage, à la divulgation et à
              d'autres utilisations de vos informations personnelles telles que
              décrites dans la présente politique de confidentialité. SI VOUS
              N'ACCEPTEZ PAS DE RESPECTER CETTE POLITIQUE DE CONFIDENTIALITÉ,
              VEUILLEZ NE PAS UTILISER LE SERVICE. Cette politique décrit
              comment prooV Inc traite vos informations, et non comment d'autres
              organisations traitent vos informations. Si vous utilisez prooV
              Inc dans un lieu de travail ou sur un appareil ou un compte qui
              vous a été émis par votre employeur ou une autre organisation,
              cette société ou organisation a probablement ses propres
              politiques concernant le stockage, l'accès, la modification, la
              suppression et la conservation des communications et du contenu
              qui peut s'appliquer à votre utilisation de prooV Inc. Le contenu
              qui serait autrement considéré comme privé pour vous ou pour un
              groupe limité de personnes peut, dans certains cas, être
              accessible par votre administrateur réseau. Veuillez vérifier
              auprès de votre employeur les politiques qu'il a en place
              concernant vos communications et le contenu connexe sur prooV Inc.
            </p>
            <h4>LA PHILOSOPHIE DE CONFIDENTIALITÉ DE PROOV INC</h4>
            <p>
              Votre vie privée est importante pour prooV Inc. Nous suivons les
              normes généralement acceptées de l'industrie pour protéger les
              renseignements personnels qui nous sont soumis, à la fois pendant
              la transmission et une fois que nous les recevons. Cependant, en
              raison de la nature des communications Internet et des
              technologies en constante évolution, de l'entrée ou de
              l'utilisation non autorisée, d'une défaillance matérielle ou
              logicielle et d'autres facteurs, la sécurité des informations
              utilisateur peut être compromise à tout moment. Aucune méthode de
              transmission sur Internet ou méthode de stockage électronique
              n'est sécurisée à 100%. Si vous prenez connaissance d'une
              vulnérabilité de sécurité ou d'une violation potentielle des
              données, veuillez nous contacter immédiatement et nous prendrons
              les mesures appropriées pour résoudre cet incident, si nécessaire.
            </p>
            <h4>QUELLES INFORMATIONS NOUS COLLECTONS</h4>
            <p>
              Nous recueillons des informations personnelles ainsi que des
              informations non personnelles dans le cadre de la fourniture du
              Service; le mode de collecte et le mode d'utilisation de chaque
              type d'infarctus sont détaillés ci-dessous et nous ne ferons aucun
              usage des informations divulguées ou collectées de toute autre
              manière. Il est important de noter que l'utilisation des
              informations est nécessaire pour fournir le Service. Comme le
              Service peut évoluer et changer de temps à autre, les informations
              que nous collecterons utiliseront également. Nous vous conseillons
              vivement de consulter cette page fréquemment afin de vous assurer
              que vous êtes à jour avec la politique la plus récente alors en
              vigueur la date de la dernière mise à jour puis politique en
              vigueur est clairement indiquée en haut de la page.
            </p>
            <p>
              <strong>Informations personnelles</strong>
              désigne des informations qui identifient ou pourraient être
              utilisées par nous pour identifier un individu. Sauf tel que
              décrit dans cette politique, nous ne partagerons pas, donnerons,
              vendrons, louerons ou prêterons des informations personnelles à
              des tiers. Les informations personnelles que nous collectons
              peuvent inclure, mais sans s'y limiter, votre nom, votre adresse
              e-mail, vos sociétés affiliées, votre photo et vos informations
              d'identification avec un site Web ou des services tiers désignés.
              Lorsque vous soumettez ou mettez à disposition vos informations
              personnelles via le service, vous consentez à la collecte, à
              l'utilisation et à la divulgation de ces informations conformément
              à la présente politique. Si vous ne souhaitez pas que nous
              collections des informations personnelles vous concernant,
              veuillez ne pas nous fournir ces informations. Cependant, si vous
              ne nous fournissez pas les informations requises, nous ne pourrons
              peut-être pas vous fournir les informations ou les services que
              vous avez demandés.
            </p>
            <p>
              Les informations personnelles n'incluent pas les données
              d'utilisation que nous définissons comme des informations agrégées
              ou anonymisées que nous pouvons collecter sur vous ou votre groupe
              ou catégorie de services dans lesquels vous êtes référencé ou
              auquel vous appartenez, ou un ensemble de fonctionnalités ou
              d'utilisateurs qui ne contiennent pas informations
              d'identification personnelle. Les informations personnelles
              n'incluent pas non plus d'autres informations vous concernant qui
              ne vous identifient pas personnellement.
            </p>
            <h4>COLLECTE ET UTILISATION DES INFORMATIONS</h4>
            <p>
              Lorsque vous créez un compte chez nous afin d'utiliser le Service,
              il vous sera demandé de fournir certaines informations
              personnelles telles que votre nom, votre adresse e-mail ainsi que
              certaines informations relatives à votre entreprise, groupe ou
              association. Sauf comme expliqué dans cette politique de
              confidentialité, nous ne donnerons pas ces informations à des
              tiers sans votre approbation. Voici les types d'informations que
              nous collectons ou recevons:
            </p>
            <p>
              <strong>Données d'utilisateur. </strong>
              Les données utilisateur sont toutes les données ou informations
              électroniques que vous soumettez via le Service, y compris tous
              les fichiers texte, son, logiciel ou image que vous nous
              fournissez via votre utilisation du Service. Nous ne revendiquons
              pas la propriété des données utilisateur. Utilisé pour: Sauf dans
              les cas prévus dans la présente politique de confidentialité, nous
              utilisons uniquement les données utilisateur pour fournir et
              améliorer le service, pour soutenir et administrer votre
              utilisation de celui-ci et pour toute autre interaction avec nous
              (par exemple, via l'option «nous contacter» ou autre
              communications par courrier électronique). Nous ne partageons pas
              les données utilisateur avec les annonceurs ou avec quiconque,
              sauf dans les circonstances limitées décrites ci-dessous.
            </p>
            <p>
              <strong>Information sur le compte.</strong>
              Les informations de compte comprennent le numéro de téléphone,
              votre nom, le nom de votre entreprise, l'affiliation, le titre,
              l'emplacement et d'autres informations de contact que vous
              choisissez volontairement de partager avec nous au-delà des
              informations d'enregistrement requises et que nous pouvons
              collecter via votre utilisation du Service. Utilisé pour: Les
              informations de compte sont utilisées pour vous permettre de
              communiquer avec d'autres utilisateurs du Service. Les
              informations de compte que vous fournissez dans le cadre de votre
              compte seront disponibles pour les autres utilisateurs du service
              en fonction de la manière et des paramètres que vous choisissez
              lors de l'utilisation du service. Les paramètres peuvent être
              définis par vous et modifiés de temps à autre à l'aide de la
              fonction Paramètres du service.
            </p>
            <p>
              <strong>Détails de facturation. </strong>
              Selon les services que vous choisissez d'utiliser, vous devrez
              peut-être fournir des informations de paiement. Utilisé pour: Nous
              ne stockons, ne conservons ni n'utilisons vos informations de
              facturation à quelque fin que ce soit. Nous utilisons des
              prestataires de services tiers reconnus et réputés pour le
              traitement des paiements. Veuillez consulter les conditions
              d'utilisation et la politique de confidentialité du fournisseur de
              services de traitement tiers ou assurez-vous de les connaître
              avant de choisir le mode de paiement approprié. Nous déclinons
              expressément et n'assumons aucune responsabilité pour toute
              utilisation des informations relatives au processus de paiement ou
              des informations collectées au cours de ce processus.
            </p>
            <p>
              <strong>Données d'utilisation. </strong>
              Nous pouvons utiliser des données statistiques, des analyses, des
              tendances et des informations d'utilisation dérivées de votre
              utilisation du Service. Utilisé pour: Certaines des façons dont
              nous utilisons les données d'utilisation comprennent
              l'exploitation, l'amélioration et la personnalisation du service
              et de nos offres, ainsi que d'autres produits et services. Nous
              pouvons surveiller et analyser les données d'utilisation pour
              l'administration technique; pour augmenter la fonctionnalité et la
              convivialité du service; pour mieux l'adapter à vos besoins; et
              pour générer et obtenir des données et informations utiles
              concernant les intérêts, les caractéristiques et le comportement
              d'utilisation du site Web de nos utilisateurs. Nous pouvons
              partager les données d'utilisation avec des tiers, y compris nos
              partenaires et fournisseurs de services, à diverses fins, y
              compris, mais sans s'y limiter, notre propre avantage commercial.
            </p>
            <p>
              <strong>Données de support. </strong>
              Les données d'assistance sont les informations que nous collectons
              lorsque vous soumettez une demande d'assistance ou exécutez un
              outil de dépannage automatisé, y compris des informations sur le
              matériel, les logiciels et d'autres détails liés à l'incident
              d'assistance, tels que: informations de contact ou
              d'authentification, informations sur l'état de l'ordinateur. , le
              système réseau et l'application au moment de la panne et pendant
              les diagnostics, les données système et de registre sur les
              installations logicielles et les configurations matérielles, et
              les fichiers de suivi des erreurs. Utilisé pour: Nous utilisons
              les données de support de la même manière que nous utilisons les
              données d'utilisation comme décrit dans cette politique de
              confidentialité.
            </p>
            <p>
              <strong>Données du journal. </strong>
              Nos serveurs collectent automatiquement des données sur votre
              adresse de protocole Internet (adresse IP) que le navigateur
              envoie lorsque vous nous visitez. Nous pouvons également collecter
              d'autres informations vous concernant qui ne vous identifient pas
              personnellement, telles que le type de navigateur et de système
              d'exploitation que vous utilisez; vos adresses de protocole
              Internet (y compris tout nom d'hôte ou toute information
              géographique associée à ces adresses); et des informations
              relatives à la configuration du système de votre ordinateur ou de
              votre appareil ou à votre activité d'utilisation du Web (y compris
              la page Web que vous visitiez avant d'arriver à notre service).
              Utilisé pour: Nous pouvons collecter des données de journal et
              utiliser la technologie des «cookies», effacer les gifs (également
              connus sous le nom de balises Web) et les informations du fichier
              journal à des fins telles que: (a) collecter les données
              d'utilisation des utilisateurs du site Web pour permettre un accès
              facile au service et autrement améliorer le Service; (b) fournir
              la coutume, contenu et informations personnalisés; (c) surveiller
              l'efficacité du service; (d) surveiller les paramètres globaux
              tels que le nombre total de visiteurs et de pages consultées; (e)
              suivre vos entrées et soumissions au Service; et (f) générer des
              données «analytiques» pour notre propre usage.
            </p>
            <p>
              Un cookie est un petit fichier de données, qui comprend souvent un
              identifiant unique anonyme, qui est transféré sur le disque dur de
              votre ordinateur pour faciliter l'accès futur de votre ordinateur
              à un site Web donné. Nous pouvons utiliser à la fois des cookies
              «de session» et des cookies «persistants». Les cookies persistants
              restent sur votre ordinateur jusqu'à ce que vous ou votre
              navigateur les supprimiez ou jusqu'à leur expiration. Les cookies
              persistants sont principalement utilisés pour enregistrer votre
              identifiant d'utilisateur et votre mot de passe de connexion afin
              de faciliter les visites ultérieures du Service. Les cookies de
              session ne durent que lorsque votre navigateur est ouvert et sont
              automatiquement supprimés lorsque vous fermez votre navigateur.
              Lorsque vous visitez notre Service, notre ordinateur peut demander
              à votre ordinateur la permission d'employer l'utilisation d'une
              session ou d'un cookie persistant. Notre Service enverra alors un
              cookie à votre navigateur si les préférences de votre navigateur
              le permettent, mais (pour protéger votre vie privée) votre
              navigateur autorise uniquement notre Service à accéder aux cookies
              qu'il vous a déjà envoyés et non aux cookies qui vous sont envoyés
              par d'autres sites Web. Veuillez noter que la plupart des
              navigateurs Internet acceptent automatiquement les cookies. Vous
              devez modifier les paramètres de votre navigateur si vous ne
              souhaitez pas accepter les cookies de notre part sur votre
              ordinateur. Cependant, le refus d'un cookie peut, dans certains
              cas, vous empêcher d'utiliser ou avoir un impact négatif sur
              l'affichage ou le fonctionnement de notre Service ou de certaines
              zones ou fonctionnalités de notre Service. Veuillez noter que nous
              ne reconnaissons ni ne répondons actuellement aux signaux Do Not
              Track lancés par le navigateur car il n'existe pas de norme de
              conformité cohérente dans l'industrie. Veuillez noter que la
              plupart des navigateurs Internet acceptent automatiquement les
              cookies. Vous devez modifier les paramètres de votre navigateur si
              vous ne souhaitez pas accepter les cookies de notre part sur votre
              ordinateur. Cependant, le refus d'un cookie peut, dans certains
              cas, vous empêcher d'utiliser ou avoir un impact négatif sur
              l'affichage ou le fonctionnement de notre Service ou de certaines
              zones ou fonctionnalités de notre Service. Veuillez noter que nous
              ne reconnaissons ni ne répondons actuellement aux signaux Do Not
              Track lancés par le navigateur car il n'existe pas de norme de
              conformité cohérente dans l'industrie. Veuillez noter que la
              plupart des navigateurs Internet acceptent automatiquement les
              cookies. Vous devez modifier les paramètres de votre navigateur si
              vous ne souhaitez pas accepter les cookies de notre part sur votre
              ordinateur. Cependant, le refus d'un cookie peut, dans certains
              cas, vous empêcher d'utiliser ou avoir un impact négatif sur
              l'affichage ou le fonctionnement de notre Service ou de certaines
              zones ou fonctionnalités de notre Service. Veuillez noter que nous
              ne reconnaissons ni ne répondons actuellement aux signaux Do Not
              Track lancés par le navigateur car il n'existe pas de norme de
              conformité cohérente dans l'industrie.
            </p>
            <h4>COMMENT NOUS PARTAGEONS VOS INFORMATIONS PERSONNELLES</h4>
            <p>
              En fonction de la manière dont vous choisissez d'utiliser le
              Service, vos informations peuvent être partagées avec d'autres
              utilisateurs des Services. prooV Inc s'efforce de rationaliser
              considérablement les processus pilotes en facilitant les
              démonstrations de preuve de concept entre les utilisateurs, les
              start-ups et les entreprises. Lors de chaque interaction avec
              d'autres utilisateurs, vos informations peuvent être partagées en
              fonction de la nature de la communication que vous établissez avec
              ces autres utilisateurs via le Service.
            </p>
            <p>
              Nous divulguons également des informations personnelles à ceux de
              nos employés et de nos fournisseurs de services qui: (a) ont
              besoin de connaître ces informations afin de les traiter en notre
              nom, ou de fournir des services offerts par ou liés aux services;
              et (b) ont accepté de ne pas le divulguer à des tiers.
            </p>
            <p>
              Nous pouvons également divulguer vos informations personnelles à
              des tiers (a) pour nous conformer à toute loi, réglementation,
              procédure légale (y compris toute ordonnance du tribunal) ou
              demande gouvernementale applicable, (b) pour exécuter certaines
              fonctions administratives conformément à notre politique de
              confidentialité en notre nom , (c) pour protéger nos biens et nos
              droits ou ceux d'un tiers, (d) pour empêcher ou arrêter toute
              activité que nous pourrions considérer comme présentant un risque
              d'être illégale, contraire à l'éthique, inappropriée ou légalement
              susceptible d'action, et (e) en relation avec l'application de
              cette politique de confidentialité et des conditions
              d'utilisation.
            </p>
            <p>
              Nous passons parfois des contrats avec d'autres entreprises pour
              fournir des services (tels que la gestion de données, des services
              d'analyse Web et des services d'infrastructure technique) en notre
              nom. Nous pouvons fournir à ces entreprises un accès à vos
              informations personnelles lorsque cela est nécessaire à leur
              engagement. Ces sociétés sont tenues de maintenir la
              confidentialité de vos informations personnelles et il leur est
              interdit de les utiliser à des fins autres que celles pour
              lesquelles elles sont engagées par nous.
            </p>
            <p>
              Nous pouvons vous cibler des publicités en fonction des
              informations que vous avez incluses dans votre compte. Nous nous
              réservons le droit de vous cibler des publicités de diverses
              manières via divers réseaux publicitaires et échanges d'annonces,
              tels que: l'utilisation de balises Web, de pixels, de tags
              publicitaires, de cookies; la publicité basée sur les informations
              de compte et les catégories fournies par l'utilisateur (par
              exemple, publicité ciblée sur les utilisateurs dans un certain
              domaine de pratique ou une certaine catégorie); Informations
              personnelles déduites de votre compte (par exemple, en utilisant
              les titres de poste pour déduire l'âge, le secteur d'activité,
              l'ancienneté ou les noms pour déduire le sexe); vos données
              d'utilisation; fournir des informations provenant de partenaires
              publicitaires que nous utilisons pour vous aider à diffuser des
              publicités plus pertinentes.
            </p>
            <h4>COMMENT VOUS POUVEZ PROTÉGER VOTRE VIE PRIVÉE</h4>
            <p>
              Votre compte personnel pour l'utilisation de nos Services est
              protégé par mot de passe pour votre confidentialité et votre
              sécurité. À tout moment, vous devez protéger votre mot de passe de
              manière appropriée et limiter l'accès à votre ordinateur pour
              empêcher tout accès non autorisé à votre compte et à vos
              informations personnelles.
            </p>
            <h4>OPTIONS D'OPT-IN ET DÉSABONNEMENT</h4>
            <p>
              Vous pouvez être invité à nous autoriser à utiliser votre adresse
              e-mail afin de vous présenter, de temps à autre, par courrier
              électronique, des nouvelles et des mises à jour sur nos Services,
              ainsi que d'autres communications marketing et offres
              promotionnelles.
            </p>
            <p>
              Si, à la suite de votre consentement initial, vous souhaitez, à
              tout moment, ne pas recevoir de notre part de telles
              communications marketing, ou nous demander de cesser de vous
              fournir ces informations, vous pouvez vous désinscrire en suivant
              les instructions de «désinscription» disponibles en bas de chacune
              de ces communications ou en nous envoyant un e-mail à
              ecoeco.sarl@gmail.com demandant la suppression de votre adresse
              e-mail de ces listes de diffusion. Assurez-vous d'inclure votre
              nom complet et votre adresse e-mail et d'indiquer le type de
              communications que vous ne souhaitez pas recevoir. Nous prendrons
              les mesures appropriées pour répondre à votre demande; Cependant,
              veuillez noter que le traitement de votre demande peut prendre
              quelques jours ou plus pendant lesquels vous pouvez toujours
              recevoir des communications marketing de notre part.
            </p>
            <h4>LIENS VERS D'AUTRES SITES WEB</h4>
            <p>
              Le Service peut contenir des liens vers des sites Web et des
              applications exploités par d'autres tiers. Bien que nous essayions
              de fournir des liens vers des sites qui valorisent votre vie
              privée, nous ne pouvons pas être responsables du contenu ou des
              politiques de confidentialité de ces sites. Si vous soumettez des
              informations personnelles à l'un de ces sites, vos informations
              sont régies par leurs politiques de confidentialité. Nous vous
              encourageons à lire attentivement les déclarations de
              confidentialité de ces sites Web et applications de tiers liés au
              Service.
            </p>
            <h4>LA CONSERVATION DES DONNÉES</h4>
            <p>
              Nous conserverons les informations personnelles que nous traitons
              au nom de nos utilisateurs ou collectons directement auprès de nos
              utilisateurs aussi longtemps que nécessaire pour fournir le
              service, sous réserve de notre conformité à la présente politique
              de confidentialité. Nous pouvons en outre conserver vos
              informations personnelles si nécessaire pour nous conformer à nos
              obligations légales, maintenir des registres comptables,
              financiers et opérationnels exacts, résoudre des litiges et faire
              appliquer nos accords. Si vous décidez de résilier votre compte
              chez nous, des copies de vos informations peuvent rester sur des
              supports de sauvegarde.
            </p>
            <h4>TRANSFERTS D'AFFAIRES</h4>
            <p>
              Dans la conduite de nos affaires, nous pouvons vendre certains de
              nos actifs (dans le cadre d'une fusion, d'une acquisition, d'une
              faillite, d'une dissolution, d'une réorganisation, de la vente de
              tout ou partie de nos actifs, ou d'une transaction ou procédure
              similaire). Les informations collectées auprès des utilisateurs du
              service, y compris les informations personnelles, pourraient être
              transférées dans le cadre d'une telle transaction. En soumettant
              vos informations personnelles via le service, vous acceptez que
              vos informations puissent être transférées à des tiers dans de
              telles circonstances ou des circonstances similaires.
            </p>
            <h4>MISE À JOUR DES INFORMATIONS IDENTIFIABLES</h4>
            <p>
              Vous pouvez accéder, corriger ou supprimer les informations
              personnelles que vous nous avez fournies en utilisant les outils
              du service (par exemple, en modifiant les informations de votre
              compte sur le service) ou en contactant notre support à
              digitalera.contact@gmail.com . Les modifications que vous apportez
              à vos informations personnelles sur le service prennent effet
              immédiatement, mais les données seront conservées dans un stockage
              sécurisé pendant une période limitée par la suite dans le cadre de
              notre processus de sauvegarde de données standard.
            </p>
            <h4>MODIFICATIONS DE CETTE POLITIQUE DE CONFIDENTIALITÉ</h4>
            <p>
              Nous pouvons modifier cette politique de temps à autre, et si nous
              le faisons, nous publierons tout changement sur cette page. Si
              vous continuez à utiliser le Service après l'entrée en vigueur de
              ces modifications, vous acceptez la Politique révisée. Si les
              changements sont importants, nous pouvons fournir un avis plus
              visible ou demander votre consentement à la nouvelle politique.
            </p>
            <h4>COMMENT NOUS CONTACTER</h4>
            <p>
              Si vous avez des questions ou des commentaires concernant cette
              politique de confidentialité, vous pouvez nous contacter par
              e-mail à digitalera.contact@gmail.com
            </p>
          </motion.div>
          <motion.div
            className="svg-div-container"
            initial="hidden"
            animate="visible"
            variants={InfoVariants}
          >
            <TermsIcone />
          </motion.div>
        </div>
      </Container>
    </Layout>
  );
};

export default TermesConditions;

const Container = styled(motion.div)`
  padding: 2em 150px;
  .privacy-policy-container {
    display: grid;
    grid-template-columns: 60% 40%;
    .page-div-content {
      height: calc(100vh - 310px);
      overflow-y: scroll;
      padding: 0 0.5em;
    }
  }
  h2 {
    color: #393d46;
    font-size: 3.5rem;
    font-weight: 500;
    line-height: 2em;
    text-transform: capitalize;
  }
  .svg-div-container {
    display: flex;
    justify-content: center;
    align-items: center;
    svg {
      width: 80% !important;
    }
  }
  h4 {
    color: #393d46;
    opacity: 0.7;
    font-weight: 400;
    font-size: 1.5rem;
    margin: 1em 0;
    line-height: 1.5em;
    text-transform: capitalize;
  }
  p {
    color: #68768e;
    opacity: 0.7;
    font-weight: 400;
    font-size: 1rem;
    text-align: justify;
    margin: 1em 0;
  }
  @media only screen and (max-width: 1200px) {
    padding: 2em;
    h2 {
      font-size: 30px;
    }
    .about-us-cart-container {
      grid-template-columns: 100% !important;
    }
  }
  @media only screen and (max-width: 1000px) {
    .privacy-policy-container {
      grid-template-columns: 100% !important;
      .page-div-content {
        height: calc(100vh - 250px);
      }
    }
    h4 {
      font-size: 18px;
    }
    .svg-div-container {
      display: none;
    }
  }
  @media only screen and (max-width: 768px) {
    h2 {
      font-size: 24px;
    }
  }
`;
