
const{ Router } = require('express');
const { check,} = require('express-validator');

const { validarJWT, validarCampos } = require('../middlewares');
const { crearCategoria } = require('../controllers/categorias');

const router = Router();

//Obtener todas las categorias -publico 
router.get('/', (req,res)=>{
    res.json('GET ')
});

//Obtener una categoria por id -publico 
router.get('/', (req,res)=>{
    res.json('GET -ID ')
});


//Crear categoria -privado 
router.post('/',[validarJWT,
    check('nombre', 'El nombre es obligatorio').not().isEmpty(),
    validarCampos
], crearCategoria);

//actualizar - privado cualquiera con token valido 
router.put('/:id', (req,res)=>{
    res.json('PUT')
});


//Borrar  - privado cualquiera con token valido 
router.delete('/:id', (req,res)=>{
    res.json('PUT')
});

module.exports = router;