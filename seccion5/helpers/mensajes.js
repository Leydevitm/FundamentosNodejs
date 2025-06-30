
require('colors');

// Defino la función mostrarMenu, que muestra un menú en consola y espera una opción del usuario
const mostrarMenu = () => {

    return new Promise(resolve => {
        // Limpio la consola para que se vea más ordenado
        console.clear();

        // Muestro el encabezado del menú
        console.log('========================'.green);
        console.log('  Seleccione una opción'.green);
        console.log('========================\n'.green);

        // Imprimo cada una de las opciones del menú, con su número correspondiente
        console.log(`${'1.'.green} Crear una tarea`);
        console.log(`${'2.'.green} Listar tareas`);
        console.log(`${'3.'.green} Listar tareas completadas`);
        console.log(`${'4.'.green} Listar tareas pendientes`);
        console.log(`${'5.'.green} Completar tarea(s)`);
        console.log(`${'6.'.green} Borrar tarea`);
        console.log(`${'0.'.green} Salir`);
        console.log('\n========================'.green);

        // Creo una interfaz para leer datos desde la consola
        const readline = require('readline').createInterface({
            input: process.stdin,
            output: process.stdout
        });

        // Muestro la pregunta y espero a que el usuario ingrese una opción
        readline.question('Seleccione una opción: ', (opt) => {
            // Cierro la interfaz de lectura
            readline.close();
            // Resuelvo la promesa con la opción seleccionada
            resolve(opt);
        });

    });
}

// Defino la función pausa, que sirve para detener la ejecución hasta que el usuario presione ENTER
const pausa = () => {
    return new Promise(resolve => {
        // Creo una nueva interfaz de lectura para pausar el programa
        const readline = require('readline').createInterface({
            input: process.stdin,
            output: process.stdout
        });

        // Muestro el mensaje de pausa
        readline.question(`\nPresione ${'ENTER'.green} para continuar\n`, (opt) => {
            // Cierro la interfaz de lectura
            readline.close();
            // Continúo con la ejecución resolviendo la promesa
            resolve();
        });
    });
}

// Exporto las dos funciones para poder usarlas en otros archivos
module.exports = {
    mostrarMenu,
    pausa
}
