require('colors');
const { inquirerMenu,pausa,leerInput } = require('./helpers/inquirer');
//const { mostrarMenu,pausa } = require('./helpers/mensajes');
const Tareas = require('./models/tareas');
const Tarea = require('./models/tarea');
const {guardarDB} = require('./helpers/guardarArchivo');

  

const main =async()=>{
 
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
          console.log(tareas.listadoArr);
          break;
       }
        guardarDB(tareas.listadoArr) ;
        await pausa();
       
    } while (opt !=='0');
    

}



main();