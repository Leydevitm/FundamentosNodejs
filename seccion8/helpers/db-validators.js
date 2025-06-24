const Role = require('../models/rol');
const {Usuario, Categoria }= require('../models');

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

const existeUsuarioPorId = async(id) =>{
    
    const existeUsuario = await Usuario.findById(id);
    if(!existeUsuario){
        throw new Error(`El usuario con id ${id} no existe en la base de datos`);
    }
}
/**
 * 
 * Categorias 
 */
const existeCategoriaPorId = async(id)=>{
    const existeCategoria= await Categoria.findById(id);
    if(!existeCategoria){
         throw new Error(`La categoria con id ${id} no existe en la base de datos`);
    }
}



module.exports = {
    esRoleValido,
    existeEmail,
    existeUsuarioPorId,
    existeCategoriaPorId
}