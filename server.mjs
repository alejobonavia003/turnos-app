import express from "express";
import sequelize from './config/db.mjs';
import path from "path";
import { fileURLToPath } from "url";
import cors from 'cors';
import authRoutes from './routes/authRoutes.mjs';
import contenidoRoutes from './routes/contenidoRoutes.mjs';
import turnosRoutes from './routes/turnosRoutes.mjs';
import uploadRoutes from './routes/uploadRoutes.mjs';
import productsRoutes from './routes/productsRoutes.mjs';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();

// Configura CORS para permitir tu frontend
const corsOptions = {
  origin: [
    'http://localhost:5173', // Frontend local (Vite)
    'http://localhost:5000', // Frontend antiguo (si aplica)
    'https://tu-dominio-production.com' // Producción
  ],
  methods: 'GET,PUT,POST,DELETE',
  allowedHeaders: 'Content-Type,Authorization'
};

// Configuración básica
app.use(express.json());
app.use(cors(corsOptions));
app.use(express.static(path.join(__dirname, "/dist")));
//app.use('/uploads', express.static(path.join(__dirname, '/uploads')));



//comprobar conexion con base de datos
sequelize
  .authenticate()
  .then(() => console.log("✅ Conectado a PostgreSQL en Railway"))
  .catch((error) => console.error("❌ Error de conexión:", error));

// Rutas
app.use('/api/auth', authRoutes);
app.use('/api/contenidos', contenidoRoutes);
app.use('/api/turnos', turnosRoutes);
app.use('/api/upload', uploadRoutes);
app.use('/api/productos', productsRoutes);


// Ruta catch-all para React Router
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'dist', 'index.html'));
});

app.get('/health', (req, res) => res.status(200).send('OK'));

const PORT = process.env.PORT;
app.listen(PORT, () => {
  console.log(`Servidor corriendo en http://localhost:${PORT}`);
});