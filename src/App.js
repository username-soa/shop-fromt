import { Switch, Route, useLocation } from "react-router-dom";
import { AnimatePresence } from "framer-motion";
import NotFound from "./pages/NotFound";
import Home from "./pages/Home";
import ContactPage from "./pages/Contact";
import SearchPage from "./pages/SearchPage";
import LoginPage from "./pages/LoginPage";
import Product from "./pages/Product";
import ScrollToTop from "./components/ScrollToTop";
import CartPage from "./pages/Cart";
import AboutPage from "./pages/About";
import UserProfilePage from "./pages/UserProfile";
import UserOrders from "./pages/UserOrders";
import UserAdresse from "./pages/UserAdresse";
import FAQs from "./pages/FAQs";
import PrivacyPolicy from "./pages/PrivacyPolicy";
import TermesConditions from "./pages/TermesConditions";
import ShippingInfo from "./pages/ShippingInfo";
import Collection from "./pages/Collection";
import { ClientProvider } from "./contexts/ClientContext";
import { UserProvider } from "./contexts/UserExperienceContext";

function App() {
  const location = useLocation();
  return (
    <UserProvider>
      {/* <ClientProvider> */}
      <ScrollToTop />
      <AnimatePresence exitBeforeEnter>
        <Switch location={location} key={location.key}>
          <Route exact path="/" component={Home} />
          <Route exact path="/product-details/:uid/:cid" component={Product} />
          <Route exact path="/contact" component={ContactPage} />
          <Route exact path="/search/:p" component={SearchPage} />
          <Route exact path="/account/login" component={LoginPage} />
          <Route exact path="/shopping-cart" component={CartPage} />
          <Route exact path="/about" component={AboutPage} />
          <Route exact path="/account" component={UserProfilePage} />
          <Route exact path="/account/commandes" component={UserOrders} />
          <Route exact path="/account/adresse" component={UserAdresse} />
          <Route exact path="/faqs" component={FAQs} />
          <Route exact path="/privacy-policy" component={PrivacyPolicy} />
          <Route exact path="/livraison" component={ShippingInfo} />
          <Route exact path="/termes-conditions" component={TermesConditions} />
          <Route exact path="/collection/:cid" component={Collection} />
          <Route path="*" component={NotFound} />
        </Switch>
      </AnimatePresence>
      {/* </ClientProvider> */}
    </UserProvider>
  );
}

export default App;
