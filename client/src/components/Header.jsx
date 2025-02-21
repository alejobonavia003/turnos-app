import { useState, useEffect } from 'react'
import { Link, useLocation } from "react-router-dom";
import axios from "axios";
import styles from "../styles/Header.module.css";

const Header = () => {
  const location = useLocation(); // Hook para obtener la ruta actual


  
  useEffect(() => {
    axios.get( "http://localhost:5000/api/contenido/")
      .then((res) => console.log(res))
      .catch((err) => console.error("Error al obtener configuración:", err));
  }, []);
 

  return (
    <header className={styles.header}>
      <ul className={styles.navList}>
        <li className={styles.navItem}>
          <Link to="/" className={styles.navLink}>Inicio</Link>
        </li>
        <li className={styles.navItem}>
          <Link to="/nosotros" className={styles.navLink}>Nosotros</Link>
        </li>
        <li className={styles.navItem}>
          <Link to="/cuadernillos" className={styles.navLink}>Cuadernillos</Link>
        </li>
        <li className={styles.navItem}>
          <Link to="/turnos" className={styles.navLink}>Turnos</Link>
        </li>
        {/* Ocultar el enlace "Admin" si no estamos en la ruta /admin */}
        <li className={styles.navItem}>
          <Link
            to="/admin"
            className={`${styles.navLink} ${
              location.pathname !== "/admin" ? styles.hidden : ""
            }`}
          >
            Admin
          </Link>
        </li>
      </ul>
    </header>
  );
};

export default Header;