import { HashRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import "./App.css";  // ✅ add this line

export default function App() {
  return (
    <Router>
      <Routes>
        {/* Open Home first */}
        <Route path="/" element={<Home />} />

        {/* Other pages */}
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
      </Routes>
    </Router>
  );
}
