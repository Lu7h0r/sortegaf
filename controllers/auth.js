const { response } = require('express');
const bcrypt = require('bcryptjs');
const Usuario = require('../models/usuario');
const { generarJWT } = require('../helpers/jwt');

const login = async(req, res = response) => {
    const { email, password } = req.body;
    try {
        const usuarioDB = await Usuario.findOne({ email });
        //verificaremail
        if (!usuarioDB) {
            return res.status(404).json({
                ok: false,
                msg: 'Email no existe',
            });
        }
        //verificar constraseña
        const validarPassword = bcrypt.compareSync(password, usuarioDB.password);
        if (!validarPassword) {
            return res.status(400).json({
                ok: false,
                msg: 'Contraseña incorrecta',
            });
        }
        // generar token
        const token = await generarJWT(usuarioDB.id);

        res.status(200).json({
            ok: true,
            token,
        });
    } catch (error) {
        res.status(400).json({
            ok: false,
            msg: 'error inesperado',
        });
    }
};

const renewToken = async(req, res = response) => {
    const uid = req.uid;

    // Generar el TOKEN - JWT
    const token = await generarJWT(uid);

    // Obtener el usuario por UID
    const usuario = await Usuario.findById(uid);

    res.json({
        ok: true,
        token,
        usuario,
    });
};

module.exports = {
    login,
    renewToken,
};