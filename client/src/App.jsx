import { useState, useEffect } from 'react'
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import axios from "axios";
import Home from "./pages/Home";
import About from "./pages/About";
import Cuadernillos from "./pages/Cuadernillos";
import RolPage from "./pages/RolTerapeuta";
import Turnos from "./pages/Turnos";
import Admin from "./pages/Admin";
import Header from "./components/Header";
import Footer from "./components/Footer";
import WhatsAppButton from "./components/WhatsAppButton";
import PageEditor from "./components/AdminPageEditor";
import PsychologistProfile from "./pages/PsychologistProfile";
import SingleProduct from "./pages/SingleProduct";
import './styles/style.css'

function App() {
  return (
    <Router>
      <Header />
      <main className="content">
      <Routes>
        {/* Rutas públicas */}
        <Route path="/" element={<Home />} />
        <Route path="/nosotros" element={<About />} />
        <Route path="/cuadernillos" element={<Cuadernillos />} />
        <Route path="/rol-del-terapeuta" element={<RolPage />} />
        <Route path="/productos/:id" element={<SingleProduct />} />
        <Route path="/turnos" element={<Turnos />} />

        <Route path="/psicologos/:slug" element={<PsychologistProfile />} />
        <Route path="/admin" element={<Admin />} />
      </Routes>
      </main>
      <WhatsAppButton />
      <Footer />
    </Router>
  );
}

export default App;