import React, { useState } from "react";
import API from "../api";
import "./Auth.css";

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
    <div className="form-container">
      <h2>Register</h2>
      <form onSubmit={submit} className="form">
        <input
          name="name"
          placeholder="Name"
          value={form.name}
          onChange={change}
          required
        />
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
        <button type="submit">Register</button>
      </form>

      {/* Back button */}
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
