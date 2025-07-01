// Importo el módulo 'path' para trabajar con rutas de archivos y carpetas
const path = require('path');

// Importo la función v4 de la librería 'uuid' y la renombro como uuidv4 para generar nombres únicos
const { v4: uuidv4 } = require('uuid');

// Defino la función subirArchivo que manejará la subida de archivos al servidor
// Recibe: files (archivo subido), extensiones permitidas y la carpeta destino
const subirArchivo = (files, extensionesValidas = ['png', 'jpg', 'jpeg', 'gif'], carpeta = '') => {

    // Retorno una Promesa porque la operación es asincrónica
    return new Promise((resolve, reject) => {

        // Extraigo el archivo del objeto files
        const { archivo } = files;

        // Obtengo el nombre del archivo y lo separo por puntos para extraer la extensión
        const nombreCortado = archivo.name.split('.');
        const extension = nombreCortado[nombreCortado.length - 1]; // Me quedo con la última parte, que es la extensión

        // Verifico si la extensión del archivo es válida
        if (!extensionesValidas.includes(extension)) {
            return reject(`La extensión ${extension} no es permitida - ${extensionesValidas}`);
        }

        // Si es válida, creo un nombre único para el archivo con uuid y le agrego la extensión original
        const nombreTemp = uuidv4() + '.' + extension;

        // Defino la ruta donde se va a guardar el archivo (en /uploads/carpeta/nombreGenerado)
        const uploadPath = path.join(__dirname, '../uploads/', carpeta, nombreTemp);

        // Uso el método .mv del archivo para moverlo a la ruta de destino
        archivo.mv(uploadPath, (err) => {
            // Si ocurre un error durante el movimiento, lo rechazo
            if (err) {
                reject(err);
            }

            // Si todo sale bien, resuelvo la promesa con el nuevo nombre del archivo
            resolve(nombreTemp);
        });

    });
}

// Exporto la función para poder utilizarla en rutas, controladores u otros módulos
module.exports = {
    subirArchivo
}
