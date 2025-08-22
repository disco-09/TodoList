import React, { useState, useEffect } from "react";
import API from "../api";
import Create from "./Create";
import TodoItem from "./TodoItem";
import "./Todos.css";

export default function Todos() {
  const [todos, setTodos] = useState([]);

  const fetchTodos = async () => {
    try {
      const res = await API.get("/todos");
      setTodos(res.data);
    } catch (err) {
      alert("Failed to load todos");
    }
  };

  useEffect(() => {
    fetchTodos();
  }, []);

  return (
    <div className="todos-container">
      <div className="todos-box">
        <h2>Your Todos</h2>
        <div className="todo-create">
          <Create onCreated={fetchTodos} />
        </div>
        <ul className="todo-list">
          {todos.map((todo) => (
            <TodoItem key={todo._id} todo={todo} onChange={fetchTodos} />
          ))}
        </ul>
      </div>
    </div>
  );
}
