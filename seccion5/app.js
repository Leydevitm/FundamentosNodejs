require('colors');
const { mostrarMenu,pausa } = require('./helpers/mensajes');

  console.clear();

const main =async()=>{
 
    console.log('hola mundo');
    mostrarMenu();
    pausa();
}

main();