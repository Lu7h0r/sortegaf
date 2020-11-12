const { Router } = require('express');
const {
    getUsuarios,
    crearUsuario,
    actualizarUsuario,
    eliminarUsuario,
} = require('../controllers/usuarios');
const { check } = require('express-validator');
const { validarCampos } = require('../middlewares/validar-campos');
const { validarJWT } = require('../helpers/validar-jwt');

const router = Router();

router.get('/', validarJWT, getUsuarios);
router.post(
    '/',
    validarJWT, [
        check('nombre', 'El nombre es un campo obligatorio').not().isEmpty(),
        check('password', 'El password es un campo obligatorio').not().isEmpty(),
        check('email', 'El email es un campo obligatorio').isEmail(),
    ],
    validarCampos,
    crearUsuario
);

router.put(
    '/:id', [
        check('nombre', 'El nombre es un campo obligatorio').not().isEmpty(),
        check('email', 'El email es un campo obligatorio').isEmail(),
    ],
    validarCampos,
    actualizarUsuario
);
// router.get('/:id');
router.delete('/:id', eliminarUsuario);

module.exports = router;