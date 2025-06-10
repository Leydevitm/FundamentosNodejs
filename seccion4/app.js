

//for (let index = 1; index <= 10; index++) {
   // const element = index * 5;
  //  console.log(`${index} * 5 = ${element}`);
    
//};


const {crearArchivo}=require('./helpers/multiplicar'); 

console.clear();

const base = 3;

crearArchivo(base) 
.then((nombreArchivo) => console.log(nombreArchivo, 'creado'))
.catch((err) => console.log(err));