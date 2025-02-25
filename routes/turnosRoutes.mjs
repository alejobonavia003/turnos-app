import express from 'express';
const router = express.Router();
import nodemailer from 'nodemailer';

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: "mantis.servicios.lby@gmail.com",
    pass: "ivdx ddca qmhm yynn",
  },
});

router.post('/', async (req, res) => {
  try {
    const { nombre, apellidos, email, telefono, horario, motivo } = req.body;
    
    await transporter.sendMail({
      from: "mantis.servicios.lby@gmail.com",
      to: "bonaviaalejo@gmail.com",
      subject: "Nuevo turno solicitado",
      text: `Nombre: ${nombre} ${apellidos}\nTeléfono: ${telefono}\nEmail: ${email}\nHorario: ${horario}\nMotivo: ${motivo}`
    });
    
    res.status(200).json({ message: "Correo enviado con éxito" });
  } catch (error) {
    res.status(500).json({ message: "Error al enviar el correo" });
  }
});

export default router;