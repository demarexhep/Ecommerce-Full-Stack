import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { GobalState } from "../../../GobalState";

export default function OrderHistory() {
  const value = useContext(GobalState);
  const [history] = value.history;

  const style = {
    textAlign: "center",
    margin: "20px",
    color: "#fdfdfd",
    textTransform: "uppercase",
    letterSpacing: "1.2px",
  };
  return (
    <div>
      <h2 style={style}>History</h2>

      <h4 style={style}>You have {history.length} ordered</h4>

      <div className="history-page">
        <table>
          <thead>
            <tr>
              <th>Payment ID</th>
              <th>Date of Purchased</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {history.map((items) => (
              <tr key={items._id}>
                <td>{items.paymentID}</td>
                <td>{new Date(items.createdAt).toLocaleDateString()}</td>
                <td>
                  <Link to={`/history/${items._id}`}>View</Link>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
