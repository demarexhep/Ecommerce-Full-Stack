import React, { useContext } from "react";
import { Switch, Route } from "react-router-dom";
import Products from "./products/ProductsList";
import DetailProduct from "./detailProduct/DetailProduct";
import Login from "./auth/Login";
import Resgister from "./auth/Register";
import Cart from "./cart/Cart";
import CreateProduct from "./create_edit_product/CreateProduct";
import Categories from "./categories/Categories";
import OrderHistory from "./order/OrderHistory";
import OrderDetail from "./order/OrderDetail";

import NotFound from "../utils/notfound/NotFound";
import { GobalState } from "../../GobalState";

function Pages() {
  const value = useContext(GobalState);
  const [isAdmin] = value.isAdmin;
  const [isLogged] = value.isLogged;

  return (
    <Switch>
      <Route path="/" exact>
        <Products />
      </Route>

      <Route path="/details/:id" component={DetailProduct} exact />
      <Route path="/login" component={isLogged ? NotFound : Login} exact />
      <Route
        path="/register"
        component={isLogged ? NotFound : Resgister}
        exact
      />
      <Route
        path="/create_product"
        component={isAdmin ? CreateProduct : NotFound}
        exact
      />
      <Route
        path="/edit_product/:id"
        component={isAdmin ? CreateProduct : NotFound}
        exact
      />
      <Route
        path="/category"
        component={isAdmin ? Categories : NotFound}
        exact
      />
      <Route path="/history" component={OrderHistory} exact />
      <Route path="/history/:id" component={OrderDetail} exact />
      <Route path="/cart" component={Cart} exact />

      <Route path="*" component={NotFound} />
    </Switch>
  );
}

export default Pages;
