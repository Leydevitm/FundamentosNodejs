
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

    const googleUser =  await googleVerify(id_token);
    console.log(googleUser);
          res.json ({
        msg: 'Todo bien',
        id_token
    });
    } catch (error) {
        json.status(400).json({
            ok:false,
            msg: 'Token no se pudo verificar '
        });
    }

  
   
    
}

module.exports = {
    login  
    ,googleSignIn   
}              