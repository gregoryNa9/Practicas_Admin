const Confirmacion = require("../models/Confirmacion");

exports.getAll = async (req, res) => {
    try {
        const data = await Confirmacion.findAll();
        res.json(data);
    } catch (error) {
        res.status(500).json({ message: "Error al obtener confirmaciones", error });
    }
};

exports.create = async (req, res) => {
    try {
        const data = await Confirmacion.create(req.body);
        res.status(201).json({ message: "Confirmación creada", data });
    } catch (error) {
        res.status(400).json({ message: "Error al crear confirmación", error });
    }
};

exports.update = async (req, res) => {
    try {
        await Confirmacion.update(req.body, { where: { id_confirmacion: req.params.id } });
        res.json({ message: "Confirmación actualizada" });
    } catch (error) {
        res.status(400).json({ message: "Error al actualizar confirmación", error });
    }
};

exports.delete = async (req, res) => {
    try {
        await Confirmacion.destroy({ where: { id_confirmacion: req.params.id } });
        res.json({ message: "Confirmación eliminada" });
    } catch (error) {
        res.status(400).json({ message: "Error al eliminar confirmación", error });
    }
};
