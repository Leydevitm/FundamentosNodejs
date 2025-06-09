
const empleados=[
    {
    id:1,
    nombre: 'Leivy'
    },
    {
        id:2,
        nombre: 'Ana'
    },
    {
        id:3,
        nombre: 'Luis'
    }

];

const salarios=[
    {
    id:1,
   salario:1000
    },
    {
        id:2,
       salario:5100
    }
   

];


const getEmpleado=(id) =>{
   
    return new Promise((resolve,reject )=>{
     
  const empleado = empleados.find(e => e.id==id)?.nombre;

     (empleado)
     ? resolve(empleado)
     :
     reject(`No existe un empleado con el id ${id}`);
     
    });
    
}

const getSalario =(id)=>{
    return new Promise((resolve,reject)=>{
        const salario = salarios.find(s=>s.id==id)?.salario;
        (salario)
        ? resolve(salario)
        :
        reject(`No existe un salario con el id ${id}`);
    });
}

const id=3; 

//getEmpleado(id)
//.then(empleado => console.log(empleado))
//.catch(err => console.log(err));

//getSalario(id)
//.then(salario => console.log(salario))
//.catch(err => console.log(err));


//Promesas encadenadas
let nombre;
getEmpleado(id)
.then(empleado =>{
    nombre =empleado;
    return getSalario(id)
})

.then(salario =>console.log('El empleado:' ,nombre, 'tiene un salario', salario))
.catch(err => console.log(err));