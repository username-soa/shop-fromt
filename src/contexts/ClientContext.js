import React, {
  createContext,
  useState,
  useEffect,
  useLayoutEffect,
} from "react";
import Client from "shopify-buy";
const ClientContext = createContext({});

const store = Client.buildClient({
  storefrontAccessToken: "bc34d8195aadb3c8b794f906fe2745e7",
  domain: "digitalerag.myshopify.com",
});

export const ClientProvider = ({ children }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [client, setClient] = useState({});
  const [checkoutEC, setCheckout] = useState({});
  const [brandnames, setBrandNames] = useState([]);
  const [categorinames, setCategorieNames] = useState([]);
  const [collections, setCollections] = useState([]);
  const [dayOffre, setDayOffre] = useState({ item: null, description: null });
  const [brands, setBrands] = useState([]);
  const [homeoffers, setHomeoffres] = useState([]);
  const [newProducts, setNewproducts] = useState([]);
  const [isLoading, setIsloading] = useState(false);
  const [globalwishlist, setGlobalwishlist] = useState([]);
  const [cartItems, setCartitems] = useState([]);
  const [cartsidemenu, setCartsidemenu] = useState(false);
  const [dayoffrepID, setDayoffrepID] = useState(null);
  let mounted = true;

  const createCheckout = async () => {
    client?.checkout?.create().then((c) => {
      localStorage.setItem("ec-shopify-checkout-id", c.id);
      setCheckout(c);
    });
  };

  const fetchCheckout = () => {
    const id = localStorage.getItem("ec-shopify-checkout-id");
    client?.checkout
      ?.fetch(id)
      .then((c) => {
        setCheckout(c);
      })
      .catch((err) => console.log(err));
  };

  const updateCheckout = async (variantId, quantity) => {
    console.log("updating checkout : ", variantId);
    const lineItemsToAdd = [
      {
        variantId,
        quantity,
      },
    ];

    const cout = await client.checkout.addLineItems(
      checkoutEC?.id,
      lineItemsToAdd
    );
    setCheckout(cout);
    const t = [...cout.lineItems];
    console.log(t);
    return t;
  };

  const updateCheckoutQte = async (id, quantity) => {
    console.log("updating checkout itmes qte: ", id);
    const i = null;
    const lineItemsToUpdate = [
      {
        id,
        quantity,
      },
    ];
    client?.checkout
      ?.updateLineItems(checkoutEC?.id, lineItemsToUpdate)
      .then((checkout) => {
        console.log(checkout.lineItems);
      });
  };

  const deletProductFromCheckout = async (id) => {
    client?.checkout?.removeLineItems(checkoutEC?.id, id).then((checkout) => {
      // Do something with the updated checkout
      console.log(checkout.lineItems); // Checkout with line item 'Z2lkOi8vc2hvcGlmeS9Qcm9kdWN0Lzc4NTc5ODkzODQ=' removed
    });
  };

  const addTocart = async (item, uid, cid) => {
    const newItem = {};
    newItem.product = item;
    newItem.qte = 1;
    newItem.cid = cid;
    newItem.uid = uid;
    const newArr = [...cartItems];
    let upID = null;

    const olditemIndex = newArr.findIndex((i) => item.id === i?.product?.id);
    console.log(olditemIndex);
    if (olditemIndex !== -1) {
      console.log("index of : ", olditemIndex);
      newItem.qte += newArr[olditemIndex]?.qte;
      newArr.splice(olditemIndex, 1);
    } else if (olditemIndex === -1) {
      newArr.push(newItem);
      console.log("hello there");
    }

    const s = await updateCheckout(item?.variants[0].id, 1);
    if (s) {
      const updateID = s.findIndex(
        (i) => item?.variants[0].id === i?.variant?.id
      );
      console.log(updateID);
      newItem.updateID = s[updateID]?.id;
      setCartitems(newArr);
      setCartsidemenu(true);
      console.log(newArr);
      console.log(s);
    }
  };

  const AddItem2 = async (product, uid, cid) => {
    const temp = [];
    temp.push(product?.variants?.edges[0]?.node);
    const newItem = {};
    newItem.qte = 1;
    newItem.product = product;
    newItem.cid = cid;
    newItem.uid = uid;
    newItem.product.variants = temp;
    const newArr = [...cartItems];
    let upID = null;
    const olditemIndex = newArr.findIndex((i) => product.id === i?.product?.id);
    if (olditemIndex !== -1) {
      console.log("index of : ", olditemIndex);
      newItem.qte += newArr[olditemIndex]?.qte;
      newArr.splice(olditemIndex, 1);
    } else if (olditemIndex === -1) {
      newArr.push(newItem);
      console.log("hello there : ", newArr);
    }

    const s = await updateCheckout(product?.variants[0].id, 1);
    if (s) {
      const updateID = s.findIndex(
        (i) => product?.variants[0].id === i?.variant?.id
      );
      console.log(updateID);
      newItem.updateID = s[updateID]?.id;
      setCartitems(newArr);
      setCartsidemenu(true);
      console.log(newArr);
      console.log(s);
    }
  };

  const removeProduct = async (id) => {
    const tempArr = [...cartItems];
    const index = tempArr.findIndex((i) => id === i?.product?.id);
    const updateID = tempArr[index]?.updateID;
    const newArr = tempArr.filter((i) => {
      return i.uid !== id;
    });
    await deletProductFromCheckout(updateID);
    setCartitems(newArr);
  };

  const updateProductQte = (op, uid) => {
    const tempArr = [...cartItems];
    const deleteItem = (a, i) => {
      return a.splice(i, 1);
    };
    const plusQte = async () => {
      let qte = null;
      let item = null;
      for (let index = 0; index < tempArr.length; index++) {
        if (tempArr[index].uid === uid) {
          tempArr[index].qte += 1;
          qte = tempArr[index].qte;
          item = tempArr[index];
          break;
        }
      }

      const result = await updateCheckoutQte(item.updateID, qte);
      setCartitems(tempArr);
    };
    const minusQte = async () => {
      let qte = null;
      let item = null;
      for (let index = 0; index < tempArr.length; index++) {
        if (tempArr[index].uid === uid) {
          if (tempArr[index].qte === 1) {
            removeProduct(uid);
            // deleteItem(tempArr);
            return;
          }
          tempArr[index].qte -= 1;
          item = tempArr[index];
          qte = tempArr[index].qte;
          break;
        }
      }
      const result = await updateCheckoutQte(item.updateID, qte);
      setCartitems(tempArr);
    };
    switch (op) {
      case 1:
        plusQte();
        break;
      case -1:
        minusQte();
        break;
      default:
        break;
    }
  };

  const addFromproductDT = async (item, uid, cid, qte) => {
    const Item = {
      product: item,
      qte: parseInt(qte, 10),
      cid: cid,
      uid: uid,
    };
    console.log(cartItems);
    const newArr = [...cartItems];
    const olditemIndex = newArr.findIndex((i) => item.id === i?.product?.id);
    Item.updateID = newArr[olditemIndex]?.updateID;
    if (olditemIndex !== -1) {
      console.log("item already exists");
      const newQte = parseInt(qte, 10) + newArr[olditemIndex]?.qte;
      const updateID = newArr[olditemIndex]?.updateID;
      Item.qte = newQte;
      await updateCheckoutQte(updateID, newQte);
      newArr.splice(olditemIndex, 1);
      newArr.push(Item);
      setCartitems(newArr);
      setCartsidemenu(true);
      console.log(newArr);
    } else {
      const s = await updateCheckout(item?.variants[0].id, parseInt(qte, 10));
      if (s) {
        const index = s.findIndex(
          (i) => item?.variants[0].id === i?.variant?.id
        );
        console.log(index);
        Item.updateID = s[index]?.id;
        newArr.push(Item);
        setCartitems(newArr);
        setCartsidemenu(true);
        console.log(newArr);
      }
    }

    return true;
  };

  const clientContext = {
    client,
    brands,
    homeoffers,
    dayOffre,
    addFromproductDT,
    isLoading,
    removeProduct,
    collections,
    addTocart,
    newProducts,
    setClient,
    globalwishlist,
    setGlobalwishlist,
    cartsidemenu,
    setCartsidemenu,
    cartItems,
    updateProductQte,
    brandnames,
    AddItem2,
    categorinames,
    dayoffrepID,
    checkoutEC,
    isOpen,
    setIsOpen,
  };

  useEffect(() => {
    if (mounted) {
      localStorage.setItem("ec_client_cart", JSON.stringify(cartItems));
    }
    return () => {
      mounted = false;
    };
  }, [cartItems]);

  useEffect(() => {
    if (mounted && client) {
      // create checkout

      if (localStorage.getItem("ec-shopify-checkout-id") === null) {
        createCheckout();
      } else if (localStorage.getItem("ec-shopify-checkout-id") !== null) {
        fetchCheckout();
      }
      const brandArry = [];
      const brandNamesArr = [
        {
          name: "Tous",
          value: "all",
        },
      ];
      const categorieNamesArr = [
        {
          name: "Tous",
          value: "all",
        },
      ];
      const newArrivales = [];
      const homeOffers = [];
      const theRest = [];
      client?.collection?.fetchAllWithProducts({ first: 100 }).then((col) => {
        setIsloading(true);
        col.map((item) => {
          if (item?.title?.toLowerCase().includes("dayoffre")) {
            try {
              const j = JSON.parse(item?.description);
              const id = item?.products[0];
              setDayoffrepID(id);
              setDayOffre({ ...dayOffre, item: item, description: j });
            } catch (err) {
              console.log(err);
            }
          } else if (item?.title?.toLowerCase().includes("brand")) {
            brandNamesArr.push({
              name: item?.title.replace("-brand", ""),
              value: item?.title.replace("-brand", ""),
            });
            brandArry.push(item);
          } else if (item?.title?.toLowerCase().includes("newarrivales")) {
            newArrivales.push(item);
          } else if (item?.title?.toLowerCase().includes("homeoffer")) {
            homeOffers.push(item);
          } else if (!item?.title?.toLowerCase().includes("-")) {
            theRest.push(item);
            categorieNamesArr.push({
              name: item?.title,
              value: item?.title,
            });
          }
        });
        setCategorieNames(categorieNamesArr);
        setBrandNames(brandNamesArr);
        setBrands(brandArry);
        setCollections(theRest);
        setHomeoffres(homeOffers);
        setNewproducts(newArrivales);
        setIsloading(false);
      });
    }

    if (
      localStorage.getItem("ec_client_cart") !== null &&
      cartItems?.length === 0
    ) {
      try {
        const result = JSON.parse(localStorage.getItem("ec_client_cart"));
        setCartitems(result);
      } catch (err) {
        console.log(err.message);
      }
    }
    return () => {
      mounted = false;
    };
  }, [client]);

  useLayoutEffect(() => {
    setClient(store);
  }, [store]);

  return (
    <ClientContext.Provider value={clientContext}>
      {children}
    </ClientContext.Provider>
  );
};

export const ClientConsumer = ClientContext.Consumer;

export default ClientContext;
