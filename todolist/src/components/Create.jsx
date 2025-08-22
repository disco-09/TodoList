import React, { useState } from "react";
import API from "../api";
import "./Create.css"; // ✅ Import CSS

export default function Create({ onCreated }) {
  const [task, setTask] = useState("");

  const submit = async (e) => {
    e.preventDefault();
    if (!task.trim()) return;
    try {
      await API.post("/todos", { task });
      setTask("");
      onCreated();
    } catch (err) {
      alert("Could not create todo");
    }
  };

  return (
    <div className="create-container">
      <form onSubmit={submit}>
        <input
          value={task}
          onChange={(e) => setTask(e.target.value)}
          placeholder="New todo"
        />
        <button type="submit" className="create-btn">
          Add
        </button>
      </form>
    </div>
  );
}
