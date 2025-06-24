

const{ Router } = require('express');
const { check} = require('express-validator');

const { validarJWT, validarCampos, esAdminRole } = require('../middlewares');
const { crearProducto, obtenerProductos, obtenerProducto, actualizarProducto, borrarProducto} = require('../controllers/productos');
const {  existeProductoPorId } = require('../helpers/db-validators');

const router = Router();

//Obtener todas las productos -publico 
router.get('/', obtenerProductos);

//Obtener un producto por id -publico 
router.get('/:id',[
    check('id', 'No es un id de Mongo valido').isMongoId(),
     check('id').custom(existeProductoPorId),
    validarCampos,
   ],obtenerProducto);


//Crear categoria -privado 
router.post('/',[validarJWT,
    check('nombre', 'El nombre es obligatorio').not().isEmpty(),
    check('categoria', 'No es un id de Mongo').isMongoId(),
     check('categoria').custom(existeProductoPorId),
    validarCampos
], crearProducto);

//actualizar - privado cualquiera con token valido 
router.put('/:id',[
    validarJWT,
   // check('categoria', 'No es un id de Mongo').isMongoId,
      check('id').custom(existeProductoPorId),
      validarCampos,
], actualizarProducto);


//Borrar  - privado cualquiera con token valido 
router.delete('/:id',[
    validarJWT,
    esAdminRole,
     check('id', 'No es un id de Mongo valido').isMongoId(),
    check('id').custom(existeProductoPorId),
    validarCampos
],borrarProducto);

module.exports = router;