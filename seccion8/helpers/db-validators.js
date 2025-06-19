const Role = require('../models/rol');
const Usuario = require('../models/usuario');

const esRoleValido = async(rol ='') =>{
        const existeRol = await Role.findOne({rol})
        if(!existeRol){
            throw new Error(`El rol ${rol} no está registrado en la base de datos`)
        }

    }
const existeEmail = async(email = '') =>{
    const existeEmail = await Usuario.findOne({email});
    if(existeEmail){
        throw new Error(`El email ${email} ya está registrado en la base de datos`)
    }
}


module.exports = {
    esRoleValido,
    existeEmail
}