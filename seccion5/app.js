require('colors');
const { inquirerMenu,pausa } = require('./helpers/inquirer');
//const { mostrarMenu,pausa } = require('./helpers/mensajes');

  console.clear();

const main =async()=>{
 
    console.log('hola mundo');
    let opt='';
    do {
        opt = await inquirerMenu();
        console.log({opt});
        await pausa();
       
    } while (opt !=='0');
    

}



main();