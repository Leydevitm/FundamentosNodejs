
const { response } = require('express');
const Usuario = require('../models/usuario');
const bcryptjs = require('bcryptjs');

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



      res.json({
        msg: 'Login ok'
    });
} catch (error) {
    console.log(error);
    res.status(500).json({
        msg: 'Hable con el administrador'
    });
}

  

}

module.exports = {
    login     
}              