import React, { useState } from "react";
import API from "../api";

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
    <form onSubmit={submit} className="form-inline">
      <input
        value={task}
        onChange={(e) => setTask(e.target.value)}
        placeholder="New todo"
      />
      <button type="submit">Add</button>
    </form>
  );
}
