
const{ Router } = require('express');

const { check } = require('express-validator');
const { usuariosGet, usuariosPost,usuariosPut,usuariosDelete,usuariosPatch } = require('../controllers/usuarios.js');
const router = Router();

router.get('/',usuariosGet);
router.put('/:id',usuariosPut);
router.post('/',[
    check('email','El correo no es válido').isEmail(),
],usuariosPost);
router.delete('/',usuariosDelete);
router.patch('/',usuariosPatch);




module.exports = router;