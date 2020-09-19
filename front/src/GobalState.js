import React, { useState, createContext, useEffect } from "react";
import axios from "axios";

export const GobalState = createContext();

export const DataProvider = ({ children }) => {
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [token, setToken] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false);
  const [isLogged, setIsLogged] = useState(false);

  const [cart, setCart] = useState([]);
  const [history, setHistory] = useState([]);

  const [callback, setCallback] = useState(false);

  const [category, setCategory] = useState("");
  const [sort, setSort] = useState("");
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(1);
  const [result, setResult] = useState(0);

  const getCategory = async () => {
    const res = await axios.get("/api/category");
    setCategories(res.data);
  };
  const refreshToken = async () => {
    const refresh = await axios.post("/user/refresh_token", null);

    setToken(refresh.data.accesstoken);
  };

  const addCart = async (id) => {
    if (!isLogged) return alert("Please login to continue buying");

    const check = cart.every((item) => {
      return item._id !== id;
    });

    if (check) {
      const data = products.filter((product) => {
        return product._id === id;
      });

      setCart([...cart, { ...data[0], quantity: 1 }]);

      // const token = localStorage.getItem('tokenAccess')
      await axios.patch(
        "user/addcart",
        { cart: [...cart, { ...data[0], quantity: 1 }] },
        {
          headers: { Authorization: token },
        }
      );
    } else {
      alert("The product has been added to cart.");
    }
  };

  useEffect(() => {
    const getProducts = async () => {
      const res = await axios.get(
        `/api/products?limit=${
          page * 9
        }&${category}&${sort}&title[regex]=${search}`
      );

      setProducts(res.data.products);
      setResult(res.data.result);
    };

    getProducts();
  }, [category, sort, search, page, callback]);

  useEffect(() => {
    getCategory();

    const firtLogin = localStorage.getItem("firtLogin");

    if (firtLogin) refreshToken();
  }, []);

  useEffect(() => {
    if (token) {
      const getUser = async () => {
        try {
          const res = await axios.get("/user/infor", {
            headers: { Authorization: token },
          });

          setIsLogged(true);
          setCart(res.data.cart);

          if (res.data.role !== 1) setIsAdmin(false);

          if (res.data.role === 1) setIsAdmin(true);
        } catch (err) {
          alert(err.response.data.msg);
        }
      };
      getUser();
    }
  }, [token]);

  useEffect(() => {
    if (token) {
      const getHistory = async () => {
        if (isAdmin) {
          const res = await axios.get("api/payment", {
            headers: { Authorization: token },
          });
          setHistory(res.data);
        } else {
          const res = await axios.get("/user/history", {
            headers: { Authorization: token },
          });
          setHistory(res.data);
        }
      };

      getHistory();
    }
  }, [isAdmin, token, callback]);

  const state = {
    token: [token, setToken],
    refreshToken: refreshToken,
    isAdmin: [isAdmin, setIsAdmin],
    isLogged: [isLogged, setIsLogged],

    products: [products, setProducts],
    categories: [categories, setCategories],
    category: [category, setCategory],
    sort: [sort, setSort],
    search: [search, setSearch],
    page: [page, setPage],
    result: [result, setResult],

    history: [history, setHistory],
    cart: [cart, setCart],
    addCart: addCart,

    callback: [callback, setCallback],
  };

  return <GobalState.Provider value={state}>{children}</GobalState.Provider>;
};
