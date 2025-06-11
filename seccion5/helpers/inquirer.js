const colors = require('colors');
const inquirer = require('inquirer');
const prompt = inquirer.createPromptModule();

const preguntas=[
    {
        type: 'list',
        name: 'opcion',
        message: '¿Qué desea hacer?',
        choices: ['opt1', 'opt2', 'opt3', 'opt4', 'opt5', 'opt6', 'Salir']
    }
];
const inquirerMenu = async () => {
   // console.clear();
    console.log('========================'.green);
    console.log('   Seleccione una opción'.green);  
    console.log('========================\n'.green);
     const { opcion } = await inquirer.prompt(preguntas);
  return opcion;
}





module.exports = {
    inquirerMenu
};