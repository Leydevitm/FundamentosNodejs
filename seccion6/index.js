
require('colors');
const { inquirerMenu,pausa,leerInput } = require('./helpers/menu');



  

const main =async()=>{
 
    let opt;
   
    do {
       opt = await inquirerMenu();
      console.log({opt});
       
       
        await pausa();
       
    } while (opt !==0)
    

}



main();