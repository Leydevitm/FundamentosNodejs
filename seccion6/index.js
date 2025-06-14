require('dotenv').config();
require('colors');
const { inquirerMenu,pausa,leerInput,listarLugares } = require('./helpers/menu');
const Busquedas = require('./models/busquedas');


const main =async()=>{
 
    let opt;
    const busquedas = new Busquedas();
    
   
    do {
       opt = await inquirerMenu();
       switch(opt ){
        case 1:
            //mostrar mensaje 
            const termino =await leerInput('Ciudad:' ); 
            //buscar los lugares   
            const lugares = await busquedas.ciudad(termino);
            //seleccionar el lugar 
            const id= await listarLugares(lugares);
            const lugarSeleccionado = lugares.find(l => l.id === id);
           
            

            //datos del clima

            //Mostrar resultados 
            console.log('\nInformacion de la ciudad\n'.green);
            console.log('Ciudad: ',lugarSeleccionado.nombre);
            console.log('Lat: ',lugarSeleccionado.lat);
            console.log('Lng: ', lugarSeleccionado.lng);
            console.log('Temperatura: ', l)
            console.log('Minima: ',)
            console.log('Maxima: ',)
            break;

       }
     
       
       
    if(opt!==0) await pausa();
       
    } while (opt !==0)
    

}



main();