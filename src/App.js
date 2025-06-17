import React, { useState, useEffect } from "react";
import ProductList from "./components/ProductList";
import "./styles/index.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import ComparePage from "./components/ComparePage";
import Header from "./components/Header";

function App() {
  const [darkMode, setDarkMode] = useState(() => localStorage.getItem("theme") === "dark");

  useEffect(() => {
    document.body.className = darkMode ? "dark" : "";
    localStorage.setItem("theme", darkMode ? "dark" : "light");
  }, [darkMode]);

  const toggleTheme = () => setDarkMode(prev => !prev);

  return (
    <Router>
      <div className="app">
      <Header darkMode={darkMode} toggleTheme={toggleTheme} />
        <h1>Product Comparison App</h1>
        <Routes>
          <Route path="/" element={<ProductList />} />
          <Route path="/compare" element={<ComparePage />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;