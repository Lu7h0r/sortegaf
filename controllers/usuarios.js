const { response } = require('express');
const Usuario = require('../models/usuario');
const bcrypt = require('bcryptjs');
const { generarJWT } = require('../helpers/jwt');

const getUsuarios = async(req, res) => {
    const usuarios = await Usuario.find({}, 'nombre email');
    res.status(200).json({
        ok: true,
        usuarios,
        uid: req.uid,
    });
};
const crearUsuario = async(req, res = response) => {
    const { email, password, nombre } = req.body;

    try {
        const existeEmail = await Usuario.findOne({ email });
        if (existeEmail) {
            return res.status(400).json({
                ok: false,
                msg: 'Correo ya registrado',
            });
        }
        const usuario = new Usuario(req.body);
        //encriptar password
        const salt = bcrypt.genSaltSync();
        usuario.password = bcrypt.hashSync(password, salt);

        await usuario.save();
        // generar jwt - token
        const token = await generarJWT(usuario.id);
        res.status(200).json({
            ok: true,
            usuario,
            token,
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: 'consulte con el administrador',
        });
    }
};
const actualizarUsuario = async(req, res = response) => {
    const uid = req.params.id;
    try {
        const usuarioDB = await Usuario.findById(uid);
        if (!usuarioDB) {
            return res.status(404).json({
                ok: false,
                msg: 'usuario no encontrado',
            });
        }
        if (usuarioDB.email === req.body.email) {
            delete campos.email;
        } else {
            const existeEmail = await Usuario.findOne({ email: req.body.email });
            if (existeEmail) {
                return res.status(400).json({
                    ok: false,
                    msg: 'el correo que intentas actualizar ya fue usado por otro usuario',
                });
            }
        }
        //actualizar usuario
        const campos = req.body;
        delete campos.password;
        const usuarioActualizado = await Usuario.findByIdAndUpdate(uid, campos, {
            new: true,
        });
        res.status(200).json({
            ok: true,
            usuarioActualizado,
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: 'error inesperado',
        });
    }
};
const eliminarUsuario = async(req, res = response) => {
    const uid = req.params.id;

    try {
        const usuarioDB = await Usuario.findById(uid);
        if (!usuarioDB) {
            return res.status(404).json({
                ok: false,
                msg: 'usuario no encontrado',
            });
        }
        await Usuario.findByIdAndDelete(uid);
        res.status(200).json({
            ok: true,
            msg: 'usuario eliminado correctamente',
        });
    } catch (error) {
        console.log(error);
        res.status(400).json({
            ok: false,
            msg: 'error inesperado',
        });
    }
};
module.exports = {
    getUsuarios,
    crearUsuario,
    actualizarUsuario,
    eliminarUsuario,
};