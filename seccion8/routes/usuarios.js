
const{ Router } = require('express');
const {validarCampos} =require('../middlewares/validar-campos.js');
const { check } = require('express-validator');
const { usuariosGet, usuariosPost,usuariosPut,usuariosDelete,usuariosPatch } = require('../controllers/usuarios.js');
const { validarCampos } = require('../middlewares/validar-campos.js');
const router = Router();

router.get('/',usuariosGet);
router.put('/:id',usuariosPut);
router.post('/',[
    check('email','El correo no es válido').isEmail(),
    check('name','El nombre es obligatorio').not().isEmpty(),
    check('password','La contraseña debe tener más de 6 letras').isLength({min:6}),
    check('role', 'No es un rol valido').isIn(['ADMIN_ROLE','USER_ROLE']),
    validarCampos
],usuariosPost);
router.delete('/',usuariosDelete);
router.patch('/',usuariosPatch);




module.exports = router;