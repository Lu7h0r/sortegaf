const { Router } = require('express');
const {
    crearUser,
    homeCRUD,
    actualizarUser,
    borrarUsuario,
    verUsuario,
} = require('../controllers/crud');

const router = Router();

router.get('/', homeCRUD);
router.get('/:id', verUsuario);
router.post('/', crearUser);
router.put('/:id', actualizarUser);
router.delete('/:id', borrarUsuario);

module.exports = router;