const { response } = require('express');

const Crud = require('../models/crud');

// Nos traemos lo que halla, para mostrarlo
const homeCRUD = async(req, res = response) => {
    const crud = await Crud.find();

    res.status(200).json({
        ok: true,
        crud,
    });
};

const crearUser = async(req, res = response) => {
    const { nombreCompleto, email, telefono, ciudad, salario } = req.body;

    try {
        const crud = new Crud(req.body);
        await crud.save();
        res.status(200).json({
            ok: true,
            crud,
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: 'Error inesperado',
        });
    }
};

const actualizarUser = async(req, res = response) => {
    const id = req.params.id;
    const uid = req.uid;

    try {
        const crud = await Crud.findById(id);
        if (!crud) {
            return res.status(400).json({
                ok: true,
                msg: 'Usuario no encontrado',
            });
        }

        const cambiosUser = {...req.body, crud: uid };
        const userActualizado = await Crud.findByIdAndUpdate(id, cambiosUser, {
            new: true,
        });
        res.status(200).json({
            ok: true,
            msg: 'Usuario actualizado correctamente',
            crud: userActualizado,
        });
    } catch (error) {
        res.status(500).json({
            ok: false,
            msg: 'Consulte al administrador',
        });
    }
};

const borrarUsuario = async(req, res = response) => {
    const id = req.params.id;
    try {
        const crud = await Crud.findById(id);
        if (!crud) {
            return res.status(400).json({
                ok: true,
                msg: 'Usuario no encontrado',
            });
        }
        await Crud.findByIdAndDelete(id);

        res.status(200).json({
            ok: true,
            msg: 'Usuario eliminado correctamente',
        });
    } catch (error) {
        res.status(500).json({
            ok: false,
            msg: 'Consulte al administrador',
        });
    }
};

const verUsuario = async(req, res = response) => {
    const id = req.params.id;

    try {
        const crud = await Crud.findById(id);
        res.status(200).json({
            ok: true,
            crud,
        });
    } catch (error) {
        res.status(400).json({
            ok: false,
            msg: 'Hable con el administrador',
        });
    }
};

module.exports = {
    homeCRUD,
    crearUser,
    actualizarUser,
    borrarUsuario,
    verUsuario,
};