
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


const getEmpleado=(id, callback) =>{
    const empleado = empleados.find(e => e.id==id)

    if(empleado){
     // return empleado;
      callback(null,empleado.nombre);
    }else{
        //return `Empleado con id ${id} no existe`;
         callback( `Empleado con id ${id} no existe`);
    }
   
}
const getSalario =(id,callback)=>{
    const salario = salarios.find(s=>s.id==id)?.salario;
    if(salario){
        callback(null, salario);
    }else{
        callback(`Salario con id ${id} no existe`);
    }
}
const id=3;
getEmpleado(id, (err,empleado)=>{
    if(err){
        console.log('Error!');
        return console.log(err);
    }

    getSalario(id, (err,salario)=>{
        if(err){
            return console.log(err);
        }
      
        console.log('El empleado:', empleado, 'tiene un salario de:', salario);
    })
})