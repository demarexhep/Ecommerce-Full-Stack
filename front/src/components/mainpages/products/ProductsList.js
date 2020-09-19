import React, { useContext } from "react";
import { GobalState } from "../../../GobalState";
import ProductContainer from "../../utils/productContainer/ProductContainer";
import Filters from "./filter/Filters";
import LoadMore from "./loadmore/LoadMore";
import Loading from "../../utils/loading/Loading";

export default function ProductsList({ props }) {
  const value = useContext(GobalState);
  const [products] = value.products;
  const [token] = value.token;
  const [isAdmin] = value.isAdmin;
  const addCart = value.addCart;

  return (
    <>
      <Filters />

      <ProductContainer
        isAdmin={isAdmin}
        productsOutside={products}
        token={token}
        addCart={addCart}
      />

      <LoadMore />
      {products.length === 0 && <Loading />}
    </>
  );
}
