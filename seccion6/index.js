
require('colors');
const { inquirerMenu,pausa,leerInput } = require('./helpers/menu');
const Busquedas = require('./models/busquedas');



  

const main =async()=>{
 
    let opt;
    const busquedas = new Busquedas();
    
   
    do {
       opt = await inquirerMenu();
       switch(opt ){
        case 1:
            //mostrar mensaje 
            const lugar =await leerInput('Ciudad:' );    
            console.log(lugar);        //buscar los lugar 
            //seleccionar el lugar 

            //datos del clima

            //Mostrar resultados 
            console.log('\nInformacion de la ciudad\n'.green);
            console.log('Ciudad: ',)
            console.log('Lat: ',)
            console.log('Lng: ',)
            console.log('Temperatura: ',)
            console.log('Minima: ',)
            console.log('Maxima: ',)
            break;

       }
     
       
       
    if(opt!==0) await pausa();
       
    } while (opt !==0)
    

}



main();