import React, { useState } from "react";
import API from "../api";
import "./Auth.css";

export default function Login({ onBack, onLoginSuccess }) {
  const [form, setForm] = useState({ email: "", password: "" });

  const change = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const submit = async (e) => {
    e.preventDefault();
    try {
      const res = await API.post("/auth/login", form);
      localStorage.setItem("token", res.data.token);
      if (onLoginSuccess) onLoginSuccess(res.data.user);  // <-- pass user info here
    } catch (err) {
      alert(err.response?.data?.message || "Login failed");
    }
  };

  return (
    <div className="form-container">
      <h2>Login</h2>
      <form onSubmit={submit} className="form">
        <input
          name="email"
          type="email"
          placeholder="Email"
          value={form.email}
          onChange={change}
          required
        />
        <input
          name="password"
          type="password"
          placeholder="Password"
          value={form.password}
          onChange={change}
          required
        />
        <button type="submit">Login</button>
      </form>

      {onBack && (
        <button
          style={{ marginTop: "10px", background: "gray", color: "white" }}
          onClick={onBack}
        >
          Back
        </button>
      )}
    </div>
  );
}
