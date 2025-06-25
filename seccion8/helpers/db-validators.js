const Role = require('../models/rol');
const {Usuario, Categoria, Producto }= require('../models');

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

/**
 * 
 * Productos 
 */
const existeProductoPorId = async(id)=>{
    const existeProducto= await Producto.findById(id);
    if(!existeProducto){
         throw new Error(`El producto con id ${id} no existe en la base de datos`);
    }
}

/**
 * 
 * Validar coleccione 
 */
const coleccionesPermitidas = async(coleccion ='',colecciones=[])=>{
      const incluida = colecciones.includes(coleccion);
      if(!incluida){
        throw new Error(`La coleccion ${coleccion} no es permitida ${coecciones} `)
      }
      return true;
}



module.exports = {
    esRoleValido,
    existeEmail,
    existeUsuarioPorId,
    existeCategoriaPorId,
    existeProductoPorId,
    coleccionesPermitidas
}