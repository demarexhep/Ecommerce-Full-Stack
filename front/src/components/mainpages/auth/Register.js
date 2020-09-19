import React, { useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";

export default function Register() {
  const [user, setUser] = useState({
    name: "",
    email: "",
    password: "",
  });
  const [err, setErr] = useState("");

  const onChangeInput = (e) => {
    const { name, value } = e.target;

    setUser({ ...user, [name]: value });
    setErr("");
  };

  const registerSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post("/user/register", { ...user });

      localStorage.setItem("firtLogin", true);

      window.location.href = "/";
    } catch (err) {
      err.response.data.msg && setErr(err.response.data.msg);
    }
  };

  return (
    <div className="login-page">
      {err && <h3>{err}</h3>}
      <form onSubmit={registerSubmit}>
        <h2>Register</h2>
        <input
          type="name"
          name="name"
          required
          placeholder="Name"
          value={user.name}
          onChange={onChangeInput}
        />

        <input
          type="email"
          name="email"
          required
          placeholder="Email"
          value={user.email}
          onChange={onChangeInput}
        />

        <input
          type="password"
          name="password"
          placeholder="Password"
          value={user.password}
          onChange={onChangeInput}
          autoComplete="on"
          required
        />

        <div className="row">
          <button type="submit">Register</button>
          <Link to="/login">Login</Link>
        </div>
      </form>
    </div>
  );
}
