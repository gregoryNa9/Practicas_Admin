// controllers/invitaciones.controller.js

const { v4: uuidv4 } = require("uuid");
const Invitacion = require("../models/Invitacion");
const Usuario = require("../models/Usuario");
const generateQR = require("../utils/generateQR");
const sendEmail = require("../utils/sendEmail");
const sendWhatsApp = require("../utils/whatsappApi");

exports.getAll = async (req, res) => {
    try {
        const data = await Invitacion.findAll();
        res.json(data);
    } catch (error) {
        res.status(500).json({ message: "Error al obtener invitaciones", error });
    }
};

exports.create = async (req, res) => {
    try {
        const { nombre, correo, telefono, id_evento, id_metodo_envio, id_estado } = req.body;

        // Crear o buscar usuario
        let usuario = await Usuario.findOne({ where: { correo } });
        if (!usuario) {
            usuario = await Usuario.create({ nombre, correo, telefono });
        }

        // Validar invitación duplicada
        const existe = await Invitacion.findOne({ where: { id_usuario: usuario.id_usuario, id_evento } });
        if (existe) return res.status(400).json({ message: "Ya existe invitación para este evento" });

        // Generar código único y QR
        const codigo_unico = uuidv4();
        const { qrDataURL, filePath } = await generateQR(codigo_unico, true);

        // Guardar invitación
        const invitacion = await Invitacion.create({
            id_usuario: usuario.id_usuario,
            id_evento,
            codigo_unico,
            qr_url: qrDataURL,
            fecha_envio: new Date(),
            id_estado,
            id_metodo_envio
        });

        // Enviar correo dinámico
        await sendEmail(usuario.correo, "Tu invitación al evento", `<p>Hola ${usuario.nombre}</p>
        <p>Tu código: <b>${codigo_unico}</b></p>
        <img src="${qrDataURL}" alt="QR">`, filePath);

        // Enviar WhatsApp dinámico
        await sendWhatsApp(usuario.telefono, `Hola ${usuario.nombre}, tu código de acceso es: ${codigo_unico}`, qrDataURL);

        res.status(201).json({ message: "Invitación enviada correctamente", invitacion });

    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Error al crear invitación", error: error.message });
    }
};

exports.update = async (req, res) => {
    try {
        await Invitacion.update(req.body, { where: { id_invitacion: req.params.id } });
        res.json({ message: "Invitación actualizada" });
    } catch (error) {
        res.status(400).json({ message: "Error al actualizar invitación", error });
    }
};

exports.delete = async (req, res) => {
    try {
        await Invitacion.destroy({ where: { id_invitacion: req.params.id } });
        res.json({ message: "Invitación eliminada" });
    } catch (error) {
        res.status(400).json({ message: "Error al eliminar invitación", error });
    }
};
