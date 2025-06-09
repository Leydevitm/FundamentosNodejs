const {getUsuario } = require('../seccion2/usuarios.js');

console.log('Iniciando de Programa');
console.time('inicio');

getUsuario(1, (usuario) =>{
    console.log('Usuario 1:', usuario);
})
getUsuario(2, (usuario) =>{
    console.log('Usuario 2:', usuario);
    console.timeEnd('inicio');
})

console.log('Fin del programa');



