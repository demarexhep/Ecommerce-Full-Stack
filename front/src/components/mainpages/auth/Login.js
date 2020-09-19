import React, { useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";

export default function Login() {
  const [user, setUser] = useState({
    email: "",
    password: "",
  });

  const [err, setErr] = useState("");

  const onChangeInput = (e) => {
    const { name, value } = e.target;

    setUser({ ...user, [name]: value });
    setErr("");
  };

  const loginSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post("/user/login", { ...user });

      localStorage.setItem("firtLogin", true);

      window.location.href = "/";
    } catch (err) {
      setErr(err.response.data.msg);
    }
  };

  return (
    <div className="login-page">
      {err && <h3>{err}</h3>}
      <form onSubmit={loginSubmit}>
        <h2>Login</h2>
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
          required
          placeholder="Password"
          value={user.password}
          onChange={onChangeInput}
          autoComplete="on"
        />

        <div className="row">
          <button type="submit">Login</button>
          <Link to="/register">Register</Link>
        </div>
      </form>
    </div>
  );
}
