import { useState, useEffect } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";
import { Formulario } from "./components/Formulario";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import { ListaTareas } from "./components/ListaTareas";

function App() {
  const [count, setCount] = useState(0);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  return (
    <Router>
      <Routes>
        <Route path="/" element={<Formulario setIsAuthenticated={setIsAuthenticated} />} />
        <Route path="/listatareas" element={isAuthenticated ? <ListaTareas /> : <Navigate to="/"></Navigate>} />
      </Routes>
    </Router>
  );
}

export default App;
