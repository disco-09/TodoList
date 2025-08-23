import React, { useState } from "react";
import "./Home.css";
import Login from "./Login";
import Register from "./Register";
import Todos from "../components/Todos";

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
        <div className="header-top">
          <h1 className="app-name">My ToDo List</h1>
          <nav className="nav-links">
            {user ? (
              <button onClick={handleLogout} className="nav-btn">Logout</button>
            ) : (
              <>
                <button onClick={() => setView("login")} className="nav-btn">Login</button>
                <button onClick={() => setView("register")} className="nav-btn">Register</button>
              </>
            )}
          </nav>
        </div>
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

        <div className="app-container">
          {!user && view === "login" && (
            <Login onBack={() => setView("welcome")} onLoginSuccess={handleLoginSuccess} />
          )}

          {!user && view === "register" && (
            <Register onBack={() => setView("welcome")} />
          )}

          {user && view === "todos" && (
            <Todos user={user} />   
          )}
        </div>
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
