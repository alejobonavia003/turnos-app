import sequelize from "./config/db.mjs";
import express from "express";
import path from "path";
import Contenido from "./models/Contenido.mjs";
import { fileURLToPath } from "url";
import cors from 'cors';
import pg from "pg";
import nodemailer from "nodemailer";
import multer from "multer";





const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);


const app = express();
app.use(express.json());

// Habilitar CORS para todas las rutas
app.use(cors());

// Si solo quieres habilitar CORS para un origen específico (por ejemplo, http://localhost:5173):
// app.use(cors({ origin: 'http://localhost:5173' }));


// Configurar Multer para subir archivos
const upload = multer({ dest: "uploads/" });

//probar conexion con base de datos

sequelize
  .authenticate()
  .then(() => console.log("✅ Conectado a PostgreSQL en Railway"))
  .catch((error) => console.error("❌ Error de conexión:", error));

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
app.use(express.static(path.join(__dirname, "/dist")));

// segurdad para proteger la seccion de admin
app.post('/api/login', (req, res) => {
  const { password } = req.body;
  
  // La contraseña correcta está en las variables de entorno
  const correctPassword = process.env.ADMIN_PASSWORD; 

  if (password == correctPassword) {
    res.json({ success: true });
  } else {
    res.status(401).json({ success: false, error: "Contraseña incorrecta" });
  }
});

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




app.post("/api/turnos", async (req, res) => {
  console.log("req.body:  " + req.body);
  const {nombre, apellidos, edad, telefono, email, residencia, disponibilidad, motivo, horario, tipoSesion, frecuencia, conocio, dudas} = req.body;

  // Configuración de Nodemailer
  
  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: "mantis.servicios.lby@gmail.com",
      pass: "ivdx ddca qmhm yynn",
    },
  });

  const mailOptions = {
    from: "mantis.servicios.lby@gmail.com",
    to: "bonaviaalejo@gmail.com",
    subject: "Nuevo turno solicitado",
    text: `Nombre: ${nombre} ${apellidos}\nTeléfono: ${telefono}\nEmail: ${email}\nHorario disponible: ${horario}\nMotivo de consulta: ${motivo}\nedad: ${edad}\nresidencia: ${residencia}\ndisponibilidad: ${disponibilidad}\nTipo de sesión: ${tipoSesion}\nFrecuencia: ${frecuencia}\n¿Cómo nos conociste?: ${conocio}\nDudas: ${dudas}`,
  };

  try {
    await transporter.sendMail(mailOptions);
    res.status(200).json({ message: "Correo enviado con éxito" });
  } catch (error) {
    console.error("Error al enviar el correo:", error);
    res.status(500).json({ message: "Error al enviar el correo" });
  }
     
});

// Actualizar contenido
// Actualizar contenido
app.put("/api/contenido/:clave", async (req, res) => {
  const { clave } = req.params;
  const { valor } = req.body;

  try {
    const [updated] = await Contenido.update(
      { valor },
      { where: { clave } }
    );

    if (updated) {
      const contenido = await Contenido.findOne({ where: { clave } });
      res.json(contenido);
    } else {
      res.status(404).json({ error: "Contenido no encontrado" });
    }
  } catch (error) {
    console.error("Error al actualizar contenido:", error);
    res.status(500).json({ error: "Error al actualizar contenido" });
  }
});


app.post("/api/upload", upload.single("imagen"), (req, res) => {
  // Aquí deberías subir el archivo a un servicio como AWS S3 o Cloudinary
  // Por ahora devolvemos una URL temporal
  res.json({ 
    url: `/uploads/${req.file.filename}`,
    message: "Implementa la subida real de archivos según tu proveedor de almacenamiento"
  });
});

app.listen(PORT, () => {
  console.log(`Servidor corriendo en http://localhost:${PORT}`);
});
