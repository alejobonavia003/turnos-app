import { Sequelize } from "sequelize";
import dotenv from "dotenv";

dotenv.config();

// Extraer credenciales de la cadena de conexión
const DB_URL = process.env.DB_URL; // Cadena de conexión completa
const url = new URL(DB_URL);

const sequelize = new Sequelize({
  database: url.pathname.slice(1), // Nombre de la base de datos (neondb)
  username: url.username,          // Usuario (neondb_owner)
  password: url.password,          // Contraseña (npg_rzOSg54jJHGh)
  host: url.hostname,              // Host (ep-icy-bush-a6a1t6dz-pooler.us-west-2.aws.neon.tech)
  dialect: "postgres",
  dialectOptions: {
    ssl: {
      require: true, // Neon requiere SSL
      rejectUnauthorized: false, // Ignorar errores de certificado (solo para desarrollo)
    },
  },
});

export default sequelize;