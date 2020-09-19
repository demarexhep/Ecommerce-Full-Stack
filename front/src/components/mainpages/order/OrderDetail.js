import React, { useState, useEffect, useContext } from "react";
import { useParams } from "react-router-dom";
import { GobalState } from "../../../GobalState";

export default function OrderDetail() {
  const value = useContext(GobalState);
  const [history] = value.history;
  const [orderDetail, setOrderDetail] = useState([]);

  const id = useParams().id;

  useEffect(() => {
    if (id) {
      const newArr = history.filter((item) => {
        return item._id === id;
      });
      setOrderDetail(newArr);
    }
  }, [id, history]);

  return (
    <div className="history-page">
      {orderDetail.length === 0 && <h2>Nothings</h2>}
      <table>
        <thead>
          <tr>
            <th>Name</th>
            <th>Address</th>
            <th>Postal Code</th>
            <th>Country Code</th>
          </tr>
        </thead>
        <tbody>
          {orderDetail.map((order) => (
            <tr key={order._id}>
              <td>{order.address.recipient_name} </td>
              <td>{order.address.line1 + " - " + order.address.city}</td>
              <td>{order.address.postal_code}</td>
              <td>{order.address.country_code}</td>
            </tr>
          ))}
        </tbody>
      </table>

      <table style={{ marginTop: "30px" }}>
        <thead>
          <tr>
            <th></th>
            <th>Product</th>
            <th>Quantity</th>
            <th>Price</th>
          </tr>
        </thead>
        <tbody>
          {orderDetail.map((order) =>
            order.cart.map((items) => (
              <tr key={items._id}>
                <td>
                  <img src={items.images.url} alt="" />{" "}
                </td>
                <td>{items.title}</td>
                <td>{items.quantity}</td>
                <td>$ {items.price * items.quantity}</td>
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
}
