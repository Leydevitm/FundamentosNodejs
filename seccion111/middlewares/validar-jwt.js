// Importo los objetos response y request desde Express para usarlos como referencia
const { response, request } = require('express');

// Importo la librería jsonwebtoken para verificar y decodificar el token
const jwt = require('jsonwebtoken');

// Importo el modelo Usuario para poder consultar al usuario en la base de datos
const Usuario = require('../models/Usuario');

// Defino el middleware validarJWT, que recibe la petición y la respuesta, y continúa con next si el token es válido
const validarJWT = async( req = request, res = response, next ) => {

    // Obtengo el token desde los headers personalizados, con la clave 'x-token'
    const token = req.header('x-token');

    // Si no hay token, devuelvo una respuesta de error 401 (no autorizado)
    if ( !token ) {
        return res.status(401).json({
            msg: 'No hay token en la petición'
        });
    }

    try {
        // Verifico el token y extraigo el uid del payload usando la clave secreta
        const { uid } = jwt.verify(token, process.env.SECRETORPRIVATEKEY);

        // Busco al usuario en la base de datos con el uid obtenido del token
        const usuario = await Usuario.findById(uid);

        // Si el usuario no existe, devuelvo error 401
        if (!usuario) {
            return res.status(401).json({
                msg: 'Token no válido - usuario no existe DB'
            });
        }

        // Si el usuario está en la base de datos pero tiene estado inactivo, también rechazo
        if (!usuario.estado) {
            return res.status(401).json({
                msg: 'Token no válido - usuario con estado: false'
            });
        }

        // Si todo es válido, adjunto el usuario autenticado a la petición para su uso posterior
        req.usuario = usuario;

        // Continúo al siguiente middleware o controlador
        next();

    } catch (error) {
        // Si ocurre cualquier error al verificar el token, lo muestro en consola y devuelvo error 401
        console.log(error);
        res.status(401).json({
            msg: 'Token no válido'
        });
    }
}

// Exporto el middleware para usarlo en rutas protegidas
module.exports = {
    validarJWT
}
