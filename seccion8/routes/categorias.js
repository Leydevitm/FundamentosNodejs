
const{ Router } = require('express');
const { check,} = require('express-validator');

const { validarCampos } = require('../middlewares/validar-campos');

const router = Router();

//Obtener todas las categorias -publico 
router.get('/', (req,resp)=>{
    resp.json('GET ')
});

//Obtener una categoria por id -publico 
router.get('/', (req,resp)=>{
    resp.json('GET -ID ')
});


//Crear categoria -privado 
router.post('/', (req,resp)=>{
    resp.json('POST')
});

//actualizar - privado cualquiera con token valido 
router.put('/:id', (req,resp)=>{
    resp.json('PUT')
});


//Borrar  - privado cualquiera con token valido 
router.delete('/:id', (req,resp)=>{
    resp.json('PUT')
});

module.exports = router;