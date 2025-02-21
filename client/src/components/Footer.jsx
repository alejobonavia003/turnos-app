import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <footer>
      <ul>
        <li><Link to="/">Inicio</Link></li>
        <li><Link to="/nosotros">Nosotros</Link></li>
        <li><Link to="/cuadernillos">Cuadernillos</Link></li>
        <li><Link to="/turnos">Turnos</Link></li>
        <li><Link to="/admin">Admin</Link></li>
      </ul>
      <p>Footer</p>
    </footer>
  );
};

export default Footer;