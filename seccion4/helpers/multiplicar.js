
const fs=require('fs');
const colors = require('colors');

// Defino la función asincrónica crearArchivo con tres parámetros:
// base: número base de la tabla, listar: si quiero mostrar en consola, hasta: hasta qué número multiplicar
const crearArchivo = async (base = 5, listar = false, hasta = 10) => {

    try {
        // Inicializo dos variables para construir el contenido: una para el archivo, otra con colores para consola
        let salida = '';
        let consola = '';

        // Recorro desde 1 hasta el valor indicado en 'hasta' para construir la tabla
        for (let index = 1; index <= hasta; index++) {
            // Armo la cadena simple para guardar en archivo
            salida += (`${base} x ${index} = ${base * index}\n`);

            // Armo la cadena con colores para mostrar en consola
            consola += (`${base} ${'x'.green} ${index} ${'='.green} ${base * index}\n`);
        }

        // Si el usuario indicó que quiere listar la tabla en consola
        if (listar) {
            // Muestro un encabezado decorado con colores
            console.log('=============='.green);
            console.log('Tabla del:'.green, colors.blue(base));
            console.log('=============='.green);

            // Imprimo la versión sin formato (opcional) y la versión coloreada
            console.log(salida);
            console.log(consola);
        }

        // Guardo el contenido generado en un archivo dentro de la carpeta 'salida'
        fs.writeFileSync(`./salida/tabla-${base}.txt`, salida);

        // Devuelvo un mensaje indicando que el archivo fue creado correctamente
        return (`tabla-${base}.txt creada`);

    } catch (error) {
        // Si ocurre algún error, lo lanzo para que pueda ser capturado desde fuera
        throw error;
    }

}

// Exporto la función para poder utilizarla desde otros módulos del proyecto
module.exports = {
    crearArchivo
}

