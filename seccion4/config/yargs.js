
const { hideBin } = require('yargs/helpers');
const yargs = require('yargs');


// Uso yargs junto con hideBin para procesar los argumentos que se pasan por línea de comandos
const argv = yargs(hideBin(process.argv))

    // Defino la opción -b o --base
    .option('b', {
        alias: 'base',                  // Permite usar --base o -b
        type: 'number',                 // Espero un valor numérico
        demandOption: true,             // Hago obligatorio este argumento
        describe: 'Es la base de la tabla de multiplicar' // Descripción que se mostrará en la ayuda
    })

    // Defino la opción -h o --hasta
    .option('h', {
        alias: 'hasta',
        type: 'number',
        default: 10,                    // Si no se indica, por defecto será hasta el 10
        describe: 'Muestra el límite de la tabla'
    })

    // Defino la opción -l o --listar
    .option('l', {
        alias: 'listar',
        type: 'boolean',
        default: false,                // Por defecto no se muestra la tabla en consola
        describe: 'Muestra la tabla en consola'
    })

    // Agrego una validación para asegurarme de que el valor de base sea un número
    .check((argv, options) => {
        if (isNaN(argv.b)) {
            throw 'La base tiene que ser un número'; // Lanzo un error si no es numérico
        }
        return true; // Si todo está bien, regreso true
    })

    // Finalizo la configuración y obtengo los argumentos procesados
    .argv;

// Exporto los argumentos para poder usarlos en otros archivos, como app.js
module.exports = argv;
