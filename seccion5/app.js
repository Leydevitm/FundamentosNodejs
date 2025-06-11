require('colors');
const { inquirerMenu,pausa,leerInput } = require('./helpers/inquirer');
//const { mostrarMenu,pausa } = require('./helpers/mensajes');
const Tareas = require('./models/tareas');
const Tarea = require('./models/tarea');

  

const main =async()=>{
 
    console.log('hola mundo');
    let opt='';
    const tareas = new Tareas();
    do {
       opt = await inquirerMenu();
      
       switch (opt) {
        case '1':
          const desc= await leerInput('Descripción:');
          tareas.crearTarea(desc);
          break;
       
        case '2':
          console.log(tareas._listado);
          break;
       }
      
        await pausa();
       
    } while (opt !=='0');
    

}



main();