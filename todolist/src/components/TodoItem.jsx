import React from "react";
import API from "../api";

export default function TodoItem({ todo, onChange }) {
  const toggle = async () => {
    try {
      await API.put(`/todos/${todo._id}`, { completed: !todo.completed });
      onChange();
    } catch (err) { alert("Update failed"); }
  };

  const remove = async () => {
    if (!confirm("Delete this?")) return;
    try {
      await API.delete(`/todos/${todo._id}`);
      onChange();
    } catch (err) { alert("Delete failed"); }
  };

  return (
    <li style={{ display: "flex", gap: 10, alignItems: "center" }}>
      <input type="checkbox" checked={todo.completed} onChange={toggle} />
      <span style={{ textDecoration: todo.completed ? "line-through" : "none" }}>{todo.task}</span>
      <button onClick={remove}>Delete</button>
    </li>
  );
}
