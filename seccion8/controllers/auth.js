
const { response } = require('express');
const Usuario = require('../models/usuario');
const bcryptjs = require('bcryptjs');
const { generarJWT } = require('../helpers/generarJWT');
const { googleVerify } = require('../helpers/google-verify');

const login = async(req,res=response)=>{
const {email,password} = req.body;
try {
    //verificar si el email existe 
    const usuario = await Usuario.findOne({email});
    if(!usuario){
        return res.status(400).json({
            msg: 'Usuario / Password no son correctos - email'
        });
    }

    //verificar si el usuario esta activo
    if(!usuario.estado){
        return res.status(400).json({
            msg: 'Usuario / Password no son correctos -estado: false'
        });
    }

    //verificar la contraseña
    const validPassword = bcryptjs.compareSync(password,usuario.password);
    if(!validPassword){
        return res.status(400).json({
            msg: 'Usuario / Password no son correctos -password'
        });
    }


    //generar el JWT
    const token = await generarJWT(usuario.id);


      res.json({
        usuario,
        token
    });
} catch (error) {
    console.log(error);
    res.status(500).json({
        msg: 'Hable con el administrador'
    });
}

  

}

const googleSignIn = async(req,res = response)=>{
    const {id_token} = req.body;
    try {

    const {email,name,img} =  await googleVerify(id_token);
    
    let usuario = await Usuario.findOne({email});
    if(!usuario){

        const data ={
           name,
           email,
           password: ':p',
           img,
           google:true
        };
        usuario = new Usuario(data);
        await usuario.save();
    }
    //Si el usuario en DB esta deshabilitado
    if(!usuario.estado){
        return res.status(401).json({
            msg: 'Hable con el administrador, usuario bloqueado'

        });
    }
     //generar el JWT
    const token = await generarJWT(usuario.id);

          res.json ({
       usuario,
        token
    });
    } catch (error) {
         console.error('Error en googleSignIn:', error);
     res.status(400).json({

            ok:false,
            msg: 'Token de Google no es valido '
        });
    }

  
   
    
}

module.exports = {
    login  
    ,googleSignIn   
}              