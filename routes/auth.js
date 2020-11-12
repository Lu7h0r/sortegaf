const { Router } = require('express');
const { check } = require('express-validator');
const { login, renewToken } = require('../controllers/auth');
const { validarCampos } = require('../middlewares/validar-campos');
const { validarJWT } = require('../helpers/validar-jwt');

const router = Router();

router.post(
    '/', [
        check('email', 'El email es un campo obligatorio').isEmail(),
        check('password', 'El password es un campo obligatorio').not().isEmpty(),
        validarCampos,
    ],
    login
);
router.get('/renew', validarJWT, renewToken);

module.exports = router;