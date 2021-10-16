import { gql } from "@apollo/client";

const getProducts = gql`
  query {
    products(first: 10) {
      edges {
        node {
          id
          title
          images(first: 1) {
            edges {
              node {
                originalSrc
              }
            }
          }
          variants(first: 1) {
            edges {
              cursor
              node {
                quantityAvailable
                priceV2 {
                  amount
                  currencyCode
                }
              }
            }
          }
        }
      }
    }
  }
`;

const getCoolectionByHandler = gql`
  {
    collectionByHandle(handle: "Leurres") {
      id
      handle
    }
  }
`;

// title
// image {
//   originalSrc
// }
const getCollections = gql`
  {
    collections(first: 10) {
      edges {
        cursor
        node {
          id
          title
          image {
            originalSrc
          }
        }
      }
    }
  }
`;

export { getProducts, getCollections, getCoolectionByHandler };
