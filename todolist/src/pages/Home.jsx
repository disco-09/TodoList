import React, { useState } from "react";
import "./Home.css";
import Login from "./Login";
import Register from "./Register";
import Todos from "../components/Todos"; // No Create here

function Home() {
  const [user, setUser] = useState(null);
  const [view, setView] = useState("welcome");

  const handleLoginSuccess = (userData) => {
    setUser(userData);
    setView("todos");
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    setUser(null);
    setView("welcome");
  };

  return (
    <div className="home-container">
      {/* HEADER */}
      <header className="home-header">
        <h1 className="app-name">My ToDo List</h1>
        {user ? (
          <nav className="nav-links">
            <span className="user-name">{user.name}</span>
            <button onClick={handleLogout} className="nav-btn">Logout</button>
          </nav>
        ) : (
          <nav className="nav-links">
            <button onClick={() => setView("login")} className="nav-btn">Login</button>
            <button onClick={() => setView("register")} className="nav-btn">Register</button>
          </nav>
        )}
      </header>

      {/* MAIN CONTENT */}
      <main className="home-main">
        {!user && view === "welcome" && (
          <section className="welcome-section">
            <h2>Welcome to My ToDo App</h2>
            <p>
              Stay organized, boost productivity, and manage your daily tasks with ease.
            </p>
          </section>
        )}

        {!user && view === "login" && (
          <div >
            <Login onBack={() => setView("welcome")} onLoginSuccess={handleLoginSuccess} />
          </div>
        )}

        {!user && view === "register" && (
          <div >
            <Register onBack={() => setView("welcome")} />
          </div>
        )}

        {user && view === "todos" && (
          <div className="todos-wrapper">
            <Todos />
          </div>
        )}
      </main>

      {/* FOOTER */}
      <footer className="home-footer">
        <p>
          This ToDo List helps you plan your day, set priorities, and keep track of
          everything in one place.
        </p>
      </footer>
    </div>
  );
}

export default Home;
