

//for (let index = 1; index <= 10; index++) {
   // const element = index * 5;
  //  console.log(`${index} * 5 = ${element}`);
    
//};

const fs=require('fs');
const base=3;
console.clear();
console.log('==============');
console.log(`tabla del ${base}`);
console.log('==============');

let salida='';
for (let index = 1; index <= 10; index++) {
   
    salida +=(`${base} *${index} = ${base * index}\n`);
    
}
console.log(salida)
fs.writeFile(`tabla-${base}`,salida,(err)=>{
    if(err) throw err;

    console.log(`tabla-${base} creada`);
})