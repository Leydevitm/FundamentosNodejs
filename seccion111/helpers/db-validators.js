// Importo el modelo Role y desestructuro los modelos Usuario, Categoria y Producto
const Role = require('../models/role');
const { Usuario, Categoria, Producto } = require('../models');

// Esta función verifica si el rol recibido existe en la base de datos
const esRoleValido = async(rol = '') => {
    // Busco si el rol existe
    const existeRol = await Role.findOne({ rol });

    // Si no existe, lanzo un error personalizado
    if (!existeRol) {
        throw new Error(`El rol ${ rol } no está registrado en la BD`);
    }
}

// Esta función comprueba si el correo ya está registrado
const emailExiste = async(correo = '') => {
    // Verifico si ya existe un usuario con ese correo
    const existeEmail = await Usuario.findOne({ correo });

    // Si ya existe, lanzo un error
    if (existeEmail) {
        throw new Error(`El correo: ${ correo }, ya está registrado`);
    }
}

// Esta función valida si existe un usuario con el ID proporcionado
const existeUsuarioPorId = async(id) => {
    // Busco al usuario por ID
    const existeUsuario = await Usuario.findById(id);

    // Si no lo encuentro, lanzo un error
    if (!existeUsuario) {
        throw new Error(`El id no existe ${ id }`);
    }
}

/**
 * Validación para Categorías
 */
const existeCategoriaPorId = async(id) => {
    // Busco la categoría por ID
    const existeCategoria = await Categoria.findById(id);

    // Si no existe, lanzo un error
    if (!existeCategoria) {
        throw new Error(`El id no existe ${ id }`);
    }
}

/**
 * Validación para Productos
 */
const existeProductoPorId = async(id) => {
    // Busco el producto por ID
    const existeProducto = await Producto.findById(id);

    // Si no existe, lanzo un error
    if (!existeProducto) {
        throw new Error(`El id no existe ${ id }`);
    }
}

/**
 * Validación para colecciones permitidas (útil en subidas de archivos o rutas dinámicas)
 */
const coleccionesPermitidas = (coleccion = '', colecciones = []) => {
    // Verifico si la colección solicitada está dentro del listado permitido
    const incluida = colecciones.includes(coleccion);

    // Si no está permitida, lanzo un error
    if (!incluida) {
        throw new Error(`La colección ${ coleccion } no es permitida, ${ colecciones }`);
    }

    // Si es válida, retorno true
    return true;
}

// Exporto todas las funciones para que puedan ser usadas en rutas o middlewares de validación
module.exports = {
    esRoleValido,
    emailExiste,
    existeUsuarioPorId,
    existeCategoriaPorId,
    existeProductoPorId,
    coleccionesPermitidas
}
