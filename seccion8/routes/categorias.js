
const{ Router } = require('express');
const { check,} = require('express-validator');

const { validarJWT, validarCampos, esAdminRole } = require('../middlewares');
const { crearCategoria, obtenerCategorias, obtenerCategoria, actualizarCategorias, borrarCategroias, borrarCategoria} = require('../controllers/categorias');
const {  existeCategoriaPorId } = require('../helpers/db-validators');

const router = Router();

//Obtener todas las categorias -publico 
router.get('/', obtenerCategorias);

//Obtener una categoria por id -publico 
router.get('/:id',[
    check('id', 'No es un id de Mongo valido').isMongoId(),
     check('id').custom(existeCategoriaPorId),
    validarCampos,
   ],obtenerCategoria);


//Crear categoria -privado 
router.post('/',[validarJWT,
    check('nombre', 'El nombre es obligatorio').not().isEmpty(),
    validarCampos
], crearCategoria);

//actualizar - privado cualquiera con token valido 
router.put('/:id',[
    validarJWT,
    check('nombre', 'El nombre es obligatorio').not().isEmpty(),
      check('id').custom(existeCategoriaPorId),
      validarCampos,
], actualizarCategorias);


//Borrar  - privado cualquiera con token valido 
router.delete('/:id',[
    validarJWT,
    esAdminRole,
     check('id', 'No es un id de Mongo valido').isMongoId(),
    check('id').custom(existeCategoriaPorId),
    validarCampos
],borrarCategoria);

module.exports = router;