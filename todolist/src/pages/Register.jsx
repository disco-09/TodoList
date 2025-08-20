import React, { useState } from "react";
import API from "../api";
import "./Register.css";

export default function Register({ onBack }) {
  const [form, setForm] = useState({ name: "", email: "", password: "" });

  const change = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const submit = async (e) => {
    e.preventDefault();
    try {
      await API.post("/auth/register", form);
      alert("Registration successful! Please login.");
      if (onBack) onBack(); // Go back to welcome or show login
    } catch (err) {
      alert(err.response?.data?.message || "Register failed");
    }
  };

  return (
    <div className="register-container">
      <h2 className="register-title">Register</h2>

      <form onSubmit={submit} className="register-form">
        <input
          name="name"
          placeholder="Name"
          value={form.name}
          onChange={change}
          required
          className="register-input"
        />
        <input
          name="email"
          type="email"
          placeholder="Email"
          value={form.email}
          onChange={change}
          required
          className="register-input"
        />
        <input
          name="password"
          type="password"
          placeholder="Password"
          value={form.password}
          onChange={change}
          required
          className="register-input"
        />
        <button type="submit" className="register-btn">Register</button>
      </form>

      {onBack && (
        <button onClick={onBack} className="back-btn">
          Back
        </button>
      )}
    </div>
  );
}
