const {response , request} = require('express');
const bcryptjs = require('bcryptjs');
const Usuario = require('../models/usuario');



const usuariosGet = async(req = request,res = response)=> {
  const{limite =5, desde =0} = req.query;
  const query = {estado: true};
  const [total,usuarios] = await Promise.all([
        Usuario.countDocuments(query),
        Usuario.find(query)
                .skip(Number(desde))
                .limit(Number(limite))
    ]) ;
    res.json({
        total,
        usuarios
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


    res.json(usuario);
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

const usuariosDelete = async(req,res = response)=> {
    const {id}= req.params;
    //Fisicamente lo borramos
    //const usuario = await Usuario.findByIdAndDelete(id);
    const usuario = await Usuario.findByIdAndUpdate(id,{estado: false});
    res.json(usuario);
}

const usuariosPatch = (req,res = response)=> {
    //Patch es para actualizar parcialmente
    //En este caso no se hace nada, solo es un ejemplo

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