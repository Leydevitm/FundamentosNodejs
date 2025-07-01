const jwt = require('jsonwebtoken');
const { Usuario } = require('../models')



// Esta función genera un JWT usando el uid como información del payload
const generarJWT = (uid = '') => {

    // Retorno una promesa, ya que la generación del token puede fallar
    return new Promise((resolve, reject) => {

        // Defino el payload que va dentro del token, en este caso solo el uid
        const payload = { uid };

        // Uso jwt.sign para generar el token, pasando el payload, la clave secreta y opciones
        jwt.sign(payload, process.env.SECRETORPRIVATEKEY, {
            expiresIn: '4h' // El token será válido por 4 horas
        }, (err, token) => {

            // Si ocurre un error al generar el token, lo muestro y rechazo la promesa
            if (err) {
                console.log(err);
                reject('No se pudo generar el token');
            } else {
                // Si todo sale bien, resuelvo la promesa con el token generado
                resolve(token);
            }
        });

    });
}

// Esta función comprueba si un token JWT es válido y devuelve el usuario asociado
const comprobarJWT = async(token = '') => {

    try {
        // Si el token tiene menos de 10 caracteres, lo considero inválido
        if (token.length < 10) {
            return null;
        }

        // Verifico el token usando la clave secreta y extraigo el uid del payload
        const { uid } = jwt.verify(token, process.env.SECRETORPRIVATEKEY);

        // Busco al usuario en la base de datos usando el uid
        const usuario = await Usuario.findById(uid);

        // Si el usuario existe y su estado está activo, lo retorno
        if (usuario) {
            if (usuario.estado) {
                return usuario;
            } else {
                // Si el usuario está deshabilitado, retorno null
                return null;
            }
        } else {
            // Si no existe el usuario, también retorno null
            return null;
        }

    } catch (error) {
        // Si ocurre cualquier error al verificar el token, retorno null
        return null;
    }
}

// Exporto ambas funciones para usarlas en otras partes del proyecto (por ejemplo, en middlewares o sockets)
module.exports = {
    generarJWT,
    comprobarJWT
}