const {response , request} = require('express');
const bcryptjs = require('bcryptjs');
const Usuario = require('../models/usuario');



const usuariosGet = (req = request,res = response)=> {
    const {q,nombre='No name',apikey, page=1,} = req.query;
        res.json({
             msg: 'get API - controlador',
             q,
             nombre,
             apikey,
             page,
             limit
            });
   }

const usuariosPut = async(req,res = response)=> {
    const {id}= req.params;
    const {_id, password,google,email, ...resto} = req.body;

    //TODO validar contra base de datos
    if(password){
        const salt= bcryptjs.genSaltSync(10);
        resto.password = bcryptjs.hashSync(password,salt);
    }
    const usuario = await Usuario.findByIdAndUpdate(id,resto);


    res.json({
        msg: 'put API',
        usuario
    });
}

const usuariosPost = async(req,res = response)=> {

    const {name,email,password,role} = req.body;
    const usuario = new Usuario({name,email,password,role});
   
    //Ecriptar la contraseña 
    const salt = bcryptjs.genSaltSync(10);
    usuario.password=bcryptjs.hashSync(password,salt);
    //Guardar en base de datos
    await usuario.save();
    res.json({
        usuario
    });
}

const usuariosDelete = (req,res = response)=> {
    res.json({
        msg: 'delete API'
    });
}

const usuariosPatch = (req,res = response)=> {
    res.json({
        msg: 'patch API'
    });
}

module.exports = {
    usuariosGet,
    usuariosPut,
    usuariosPost,
    usuariosDelete,
    usuariosPatch
}