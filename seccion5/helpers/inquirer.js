const colors = require('colors');
const inquirer = require('inquirer');
const prompt = inquirer.createPromptModule();


// Defino un arreglo de preguntas para mostrar un menú de opciones al usuario
const preguntas = [
    {
        type: 'list',
        name: 'opcion',
        message: '¿Qué desea hacer?',
        choices: [
            {
                value: '1',
                name: `${'1.'.green} Crear una tarea`
            },
            {
                value: '2',
                name: `${'2.'.green} Listar tareas`
            },
            {
                value: '3',
                name: `${'3.'.green} Listar tareas completadas`
            },
            {
                value: '4',
                name: `${'4.'.green} Listar tareas pendientes`
            },
            {
                value: '5',
                name: `${'5.'.green} Completar tarea(s)`
            },
            {
                value: '6',
                name: `${'6.'.green} Borrar tarea`
            },
            {
                value: '0',
                name: `${'0.'.green} Salir`
            },
        ]
    }
];

// Esta función muestra el menú en consola y retorna la opción seleccionada
const inquirerMenu = async () => {
    // Limpio la consola para que se vea más ordenado
    console.clear();

    // Muestro el título del menú
    console.log('========================'.green);
    console.log('   Seleccione una opción'.green);  
    console.log('========================\n'.green);

    // Espero a que el usuario seleccione una opción del menú
    const { opcion } = await inquirer.prompt(preguntas);

    // Retorno la opción seleccionada
    return opcion;
}

// Esta función sirve para hacer una pausa hasta que el usuario presione ENTER
const pausa = async () => {
    const question = [
        {
            type: 'input',
            name: 'enter',
            message: `Presione ${'ENTER'.green} para continuar`,
        }
    ];
    console.log('\n');

    // Espero a que el usuario presione ENTER para continuar
    await inquirer.prompt(question);
}

// Esta función muestra un input para que el usuario escriba algo
const leerInput = async (mensaje) => {
    const question = [
        {
            type: 'input',
            name: 'desc',
            message: mensaje,
            // Valido que el usuario escriba algo antes de continuar
            validate(value) {
                if (value.length === 0) {
                    return 'Por favor ingrese un valor';
                }
                return true;
            }
        }
    ];

    // Espero a que el usuario escriba la descripción
    const { desc } = await inquirer.prompt(question);
    return desc;
}

// Esta función muestra una lista de tareas para que el usuario seleccione cuál desea borrar
const listadoTareasBorrar = async (tareas = []) => {

    // Mapeo las tareas para generar un arreglo de opciones
    const choices = tareas.map((tarea, i) => {
        const idx = `${i + 1}.`.green;

        return {
            value: tarea.id,
            name: `${idx} ${tarea.desc}`
        };
    });

    // Agrego una opción para cancelar al principio de la lista
    choices.unshift({
        value: '0',
        name: '0.'.green + 'Cancelar'
    });

    const preguntas = [
        {
            type: 'list',
            name: 'id',
            message: 'Borrar',
            choices: choices
        }
    ];

    // Muestro la lista y devuelvo el id de la tarea seleccionada
    const { id } = await inquirer.prompt(preguntas);
    return id;
}

// Esta función pide confirmación al usuario antes de hacer una acción importante
const confirmar = async (message) => {
    const question = [
        {
            type: 'confirm',
            name: 'ok',
            message
        }
    ];

    // Devuelvo true si el usuario confirma, false si no
    const { ok } = await inquirer.prompt(question);
    return ok;
}

// Esta función muestra un checklist para seleccionar múltiples tareas (por ejemplo, para marcarlas como completadas)
const mostrarListadoChecklist = async (tareas = []) => {

    // Genero las opciones del checklist con sus estados (completado o no)
    const choices = tareas.map((tarea, i) => {
        const idx = `${i + 1}.`.green;

        return {
            value: tarea.id,
            name: `${idx} ${tarea.desc}`,
            checked: (tarea.completadoEn) ? true : false
        };
    });

    const pregunta = [
        {
            type: 'checkbox',
            name: 'ids',
            message: 'Selecciones',
            choices: choices
        }
    ];

    // Devuelvo un arreglo con los ids seleccionados
    const { ids } = await inquirer.prompt(pregunta);
    return ids;
}

// Exporto todas las funciones para poder usarlas en otros archivos
module.exports = {
    inquirerMenu,
    pausa,
    leerInput,
    listadoTareasBorrar,
    confirmar,
    mostrarListadoChecklist
};
