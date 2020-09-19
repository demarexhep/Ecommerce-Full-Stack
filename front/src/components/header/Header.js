import React, { useState, useContext } from "react";
import Menu from "./icon/menu.svg";
import Close from "./icon/close.svg";
import Cart from "./icon/shopping_cart-blue.svg";
import { Link } from "react-router-dom";
import axios from "axios";
import { GobalState } from "../../GobalState";

function Header() {
  const value = useContext(GobalState);
  const [isAdmin] = value.isAdmin;
  const [isLogged] = value.isLogged;
  const [cart] = value.cart;
  const [menu, setMenu] = useState(false);

  const logoutUser = async () => {
    await axios.post("/user/logout");
    localStorage.clear();
    window.location.href = "/";
  };

  const user = {
    display: isLogged ? "inline-block" : "none",
  };

  const admin = {
    display: isAdmin ? "inline-block" : "none",
  };

  const toggleMenu = () => {
    setMenu(!menu);
  };

  const styleMenu = {
    left: menu ? 0 : "-100%",
  };

  return (
    <header>
      <div className="menu" onClick={toggleMenu}>
        <img src={Menu} alt="" width="30" />
      </div>

      <div className="logo">
        <h1>
          <Link to="/"> {isAdmin ? "Admin" : "Dema Store"}</Link>
        </h1>
      </div>

      <ul style={styleMenu}>
        <li>
          <Link to="/">{isAdmin ? "Products" : "Shop"}</Link>
        </li>

        <li style={admin}>
          <Link to="/create_product">Create Products</Link>
        </li>
        <li style={admin}>
          <Link to="/category">Categories</Link>
        </li>

        <li style={user}>
          <Link to="/history">History</Link>{" "}
        </li>
        <li style={user}>
          <Link to="/" onClick={logoutUser}>
            Logout
          </Link>{" "}
        </li>

        <li style={{ display: isLogged ? "none" : "inline-block" }}>
          <Link to="/login">Login or Register</Link>
        </li>

        <li onClick={toggleMenu}>
          <img src={Close} alt="" width="30" className="menu" />
        </li>
      </ul>

      <div
        className="cart-icon"
        style={{ display: isAdmin ? "none" : "inline-block" }}
      >
        <span>{cart.length}</span>
        <Link to="/cart">
          <img src={Cart} alt="" width="30" />
        </Link>
      </div>
    </header>
  );
}

export default Header;
