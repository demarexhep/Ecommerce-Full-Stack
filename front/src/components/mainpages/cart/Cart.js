import React, { useState, useContext, useEffect } from "react";
import { GobalState } from "../../../GobalState";
import axios from "axios";
import Paypal from "./Paypal";

export default function Cart() {
  const value = useContext(GobalState);
  const [cart, setCart] = value.cart;
  const [token] = value.token;
  const [total, setTotal] = useState(0);
  const [isLogged] = value.isLogged;
  const [callback, setCallback] = value.callback;

  useEffect(() => {
    const getTotal = () => {
      const total = cart.reduce((prev, item) => {
        return prev + item.price * item.quantity;
      }, 0);
      setTotal(total);
    };
    getTotal();

    if (isLogged) {
      const addToCart = async () => {
        await axios.patch(
          "user/addcart",
          { cart },
          {
            headers: { Authorization: token },
          }
        );
      };
      addToCart();
    }
  }, [cart, isLogged, token]);

  const reduction = (id) => {
    cart.forEach((item) => {
      if (item._id === id) {
        item.quantity === 1 ? (item.quantity = 1) : (item.quantity -= 1);
      }
    });
    setCart([...cart]);
  };

  const increase = (id) => {
    cart.forEach((item) => {
      if (item._id === id) {
        item.quantity += 1;
      }
    });
    setCart([...cart]);
  };

  const removeProduct = (id) => {
    if (window.confirm("Do you want to delete this product?")) {
      cart.forEach((item, index) => {
        if (item._id === id) {
          cart.splice(index, 1);
        }
      });
      setCart([...cart]);
    }
  };

  const tranSuccess = async (payment) => {
    const { paymentID, address } = payment;

    await axios.post(
      "api/payment",
      { cart, paymentID, address },
      {
        headers: { Authorization: token },
      }
    );

    setCart([]);

    alert("You have successfully placed an order.");

    setCallback(!callback);
  };

  const transError = () => console.log("Paypal Error");

  const transCanceled = () => console.log("Transaction canceled");

  if (cart.length === 0)
    return (
      <h2 style={{ textAlign: "center", fontSize: "5rem", color: "#fdfdfd" }}>
        Cart Empty
      </h2>
    );

  return (
    <>
      {cart.map((product) => (
        <div className="details cart" key={product._id}>
          <img src={product.images.url} alt="" className="img-container" />

          <div className="box-details">
            <h2 title={product.title}>{product.title}</h2>
            <h3>${product.price * product.quantity}</h3>

            <p>{product.description}</p>
            <p>{product.content}</p>

            <div className="amount">
              <button className="count" onClick={() => reduction(product._id)}>
                {" "}
                -{" "}
              </button>
              <span>{product.quantity}</span>
              <button className="count" onClick={() => increase(product._id)}>
                {" "}
                +{" "}
              </button>
            </div>

            <div className="delete" onClick={() => removeProduct(product._id)}>
              X
            </div>
          </div>
        </div>
      ))}

      <div className="total">
        <h3>Total: $ {total}</h3>
        <Paypal
          total={total}
          tranSuccess={tranSuccess}
          transactionError={transError}
          transactionCanceled={transCanceled}
        />
      </div>
    </>
  );
}
