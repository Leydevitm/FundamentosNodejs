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
            //clima
            const clima = await busquedas.climaLugar(lugarSeleccionado.lat,lugarSeleccionado.lng);
            

            //datos del clima

            //Mostrar resultados 
            console.clear();
            console.log('\nInformacion de la ciudad\n'.green);
            console.log('Ciudad: ',lugarSeleccionado.nombre.green);
            console.log('Lat: ',lugarSeleccionado.lat);
            console.log('Lng: ', lugarSeleccionado.lng);
            console.log('Temperatura: ',clima.temp );
            console.log('Maxima: ',clima.max)
            console.log('Minima: ',clima.min)
            console.log('Como esta el clima: ',clima.desc.green);
            break;

       }
     
       
       
    if(opt!==0) await pausa();
       
    } while (opt !==0)
    

}



main();