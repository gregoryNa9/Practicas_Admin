const Usuario = require("../models/Usuario");

exports.getAll = async (req, res) => {
    try {
        const data = await Usuario.findAll();
        res.json(data);
    } catch (error) {
        res.status(500).json({ message: "Error al obtener usuarios", error });
    }
};

exports.create = async (req, res) => {
    try {
        const data = await Usuario.create(req.body);
        res.status(201).json({ message: "Usuario creado", data });
    } catch (error) {
        res.status(400).json({ message: "Error al crear usuario", error });
    }
};

exports.update = async (req, res) => {
    try {
        await Usuario.update(req.body, { where: { id_usuario: req.params.id } });
        res.json({ message: "Usuario actualizado" });
    } catch (error) {
        res.status(400).json({ message: "Error al actualizar usuario", error });
    }
};

exports.delete = async (req, res) => {
    try {
        await Usuario.destroy({ where: { id_usuario: req.params.id } });
        res.json({ message: "Usuario eliminado" });
    } catch (error) {
        res.status(400).json({ message: "Error al eliminar usuario", error });
    }
};
