import sequelize from "./config/db.mjs";
import express from "express";
import path from "path";
import Contenido from "./models/Contenido.mjs";
import { fileURLToPath } from "url";
import cors from 'cors';
import pg from "pg";




const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();


// Habilitar CORS para todas las rutas
app.use(cors());

// Si solo quieres habilitar CORS para un origen específico (por ejemplo, http://localhost:5173):
// app.use(cors({ origin: 'http://localhost:5173' }));

//probar conexion con base de datos
sequelize
  .authenticate()
  .then(() => {
    console.log("Conexión a la base de datos establecida correctamente.");
    return sequelize.sync(); // Sincronizar modelos con la base de datos
  })
  .then(() => {
    console.log("Base de datos sincronizada.");
  })
  .catch((error) => {
    console.error("Error al conectar con la base de datos:", error);
  });

/*
  sequelize.sync({ force: true }).then(async () => {
    console.log("Tabla 'contenidos' creada correctamente.");
  
    // Insertar contenidos iniciales
    await Contenido.bulkCreate([
      { clave: "header_inicio", valor: "Inicio" },
      { clave: "header_nosotros", valor: "Nosotros" },
      { clave: "header_cuadernillos", valor: "Cuadernillos" },
      { clave: "header_turnos", valor: "Turnos" },
      { clave: "header_admin", valor: "Admin" },
    ]);
    console.log("Contenidos iniciales insertados.");
  });
 */


// Configurar el puerto

const PORT = process.env.PORT || 5000;


// Servir archivos estáticos desde la carpeta dist
app.use(express.static(path.join(__dirname, "../client/dist")));

// Cualquier ruta que no sea de la API devuelve index.html (para React Router)
app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "../client/dist", "index.html"));
});

app.get("/api/contenidos", async (req, res) => {
  try {
    // Realizar la consulta para obtener todos los registros de la tabla Contenido
    const contenidos = await Contenido.findAll();

    // Retornar los resultados en formato JSON
    res.json(contenidos);
  } catch (error) {
    console.error("Error al obtener los contenidos:", error);
    res.status(500).json({ error: "Error al obtener los contenidos" });
  }
});


app.get("/api/contenido/:clave", async (req, res) => {
  const { clave } = req.params;

  try {
    // Buscar el contenido por la clave
    const contenido = await Contenido.findOne({ where: { clave } });

    if (!contenido) {
      return res.status(404).json({ error: "Contenido no encontrado" });
    }

    res.json(contenido);
  } catch (error) {
    console.error("Error al obtener el contenido:", error);
    res.status(500).json({ error: "Error al obtener el contenido" });
  }
});


app.get("/api/settings", (req, res) => {
  res.json({ title: "Configuración", description: "Esto es una descripción" });
});

app.listen(PORT, () => {
  console.log(`Servidor corriendo en http://localhost:${PORT}`);
});
