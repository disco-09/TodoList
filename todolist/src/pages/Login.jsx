import React, { useState } from "react";
import API from "../api";
import "./Login.css";

export default function Login({ onBack, onLoginSuccess }) {
  const [form, setForm] = useState({ email: "", password: "" });

  const change = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const submit = async (e) => {
    e.preventDefault();
    try {
      const res = await API.post("/auth/login", form);
      localStorage.setItem("token", res.data.token);
      if (onLoginSuccess) onLoginSuccess(res.data.user); // pass user info
    } catch (err) {
      alert(err.response?.data?.message || "Login failed");
    }
  };

  return (
    <div className="login-container">
      <h2 className="login-title">Login</h2>

      <form onSubmit={submit} className="login-form">
        <input
          name="email"
          type="email"
          placeholder="Email"
          value={form.email}
          onChange={change}
          required
          className="login-input"
        />
        <input
          name="password"
          type="password"
          placeholder="Password"
          value={form.password}
          onChange={change}
          required
          className="login-input"
        />
        <button type="submit" className="login-btn">Login</button>
      </form>

      {onBack && (
        <button onClick={onBack} className="back-btn">
          Back
        </button>
      )}
    </div>
  );
}
