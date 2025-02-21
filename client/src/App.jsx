import { useState, useEffect } from 'react'
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import axios from "axios";
import Home from "./pages/Home";
import About from "./pages/About";
import Cuadernillos from "./pages/Cuadernillos";
import Turnos from "./pages/Turnos";
import Admin from "./pages/Admin";
import Header from "./components/Header"; // Opcional: Barra de navegación
import Footer from "./components/Footer"; // Opcional: Pie de página
import './styles/App.css'

function App() {
 // const [settings, setSettings] = useState({ title: "", description: "" });
  
 /**  useEffect(() => {
    axios.get("http://localhost:3000/api/settings")
      .then((res) => setSettings(res.data))
      .catch((err) => console.error("Error al obtener configuración:", err));
  }, []);
 */

  return (
    <Router>
      <Header /> {/* Opcional: Barra de navegación */}
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/nosotros" element={<About />} />
        <Route path="/cuadernillos" element={<Cuadernillos />} />
        <Route path="/turnos" element={<Turnos />} />
        <Route path="/admin" element={<Admin />} />
      </Routes>
      <Footer /> {/* Opcional: Pie de página */}
    </Router>
  );
}

export default App
