import React, { useEffect, useState } from "react";
import API from "../api";
import Create from "../components/Create";
import TodoItem from "../components/TodoItem";

export default function Dashboard() {
  const [todos, setTodos] = useState([]);

  const fetchTodos = async () => {
    try {
      const res = await API.get("/todos");
      setTodos(res.data);
    } catch (err) {
      console.error(err);
      alert("Failed to fetch todos");
    }
  };

  useEffect(() => { fetchTodos(); }, []);

  return (
    <div>
      <h2>Your Todos</h2>
      <Create onCreated={fetchTodos} />
      <ul>
        {todos.map(t => <TodoItem key={t._id} todo={t} onChange={fetchTodos} />)}
      </ul>
    </div>
  );
}
