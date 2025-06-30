// Definí una función llamada crearMensaje que recibe el nombre del remitente y el mensaje como parámetros
const crearMensaje = (nombre, mensaje) => {

    // Devuelvo un objeto que contiene el nombre, el mensaje y la hora actual formateada como string legible
    return {
        nombre,
        mensaje,
        fecha: new Date().toLocaleTimeString()
    }
}

// Exporto la función para poder usarla en otros archivos del proyecto
module.exports = { crearMensaje };
