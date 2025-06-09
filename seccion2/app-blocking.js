
const {getUsuarioSync } = require('../seccion2/usuarios.js');

console.log('Iniciando de Programa');
console.time('inicio');

const usuario1 = getUsuarioSync(1);
console.log('Usuario 1:', usuario1);

const usuario2 = getUsuarioSync(2);
console.log('Usuario 2:', usuario2);

console.log('Finalizando el Programa');
console.timeEnd('inicio');


