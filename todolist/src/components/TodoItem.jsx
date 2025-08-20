import React from "react";
import API from "../api";
import "./TodoItem.css"; // ✅ Import CSS

export default function TodoItem({ todo, onChange }) {
  const toggle = async () => {
    try {
      await API.put(`/todos/${todo._id}`, { completed: !todo.completed });
      onChange();
    } catch (err) {
      alert("Update failed");
    }
  };

  const remove = async () => {
    if (!window.confirm("Delete this?")) return;
    try {
      await API.delete(`/todos/${todo._id}`);
      onChange();
    } catch (err) {
      alert("Delete failed");
    }
  };

  return (
    <li className={`todo-item ${todo.completed ? "completed" : ""}`}>
      <input
        type="checkbox"
        checked={todo.completed}
        onChange={toggle}
        className="todo-checkbox"
      />
      <span className="todo-text">{todo.task}</span>
      <button onClick={remove} className="todo-delete-btn">
        Delete
      </button>
    </li>
  );
}
