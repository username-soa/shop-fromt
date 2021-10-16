import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter as Router } from "react-router-dom";
import { Helmet, HelmetProvider } from "react-helmet-async";
import { ApolloClient, ApolloProvider } from "@apollo/client";
import { createHttpLink } from "apollo-link-http";
import { setContext } from "apollo-link-context";
import { InMemoryCache } from "apollo-cache-inmemory";
import "./styles/main.scss";
import "./utils/firebase";
import App from "./App";
import reportWebVitals from "./reportWebVitals";

const httpLink = createHttpLink({
  uri: "https://yacado-peche.myshopify.com/api/2021-10/graphql.json",
});
const middlewareLink = setContext(() => ({
  headers: {
    /* "X-Shopify-Storefront-Access-Token": "bc34d8195aadb3c8b794f906fe2745e7", */
    "X-Shopify-Storefront-Access-Token": "211dc1eef2e2076151e87543a24ec18e",
  },
}));

const client = new ApolloClient({
  link: middlewareLink.concat(httpLink),
  cache: new InMemoryCache(),
});

ReactDOM.render(
  <React.StrictMode>
    <HelmetProvider>
      <Helmet>
        <meta charSet="utf-8" />
        <title>Shop</title>
        <meta name="description" content="Shop" />
      </Helmet>
      <Router>
        <ApolloProvider client={client}>
          <App />
        </ApolloProvider>
      </Router>
    </HelmetProvider>
  </React.StrictMode>,
  document.getElementById("root")
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
