const { crearArchivo } = require('./helpers/multiplicar'); 
const { hideBin } = require('yargs/helpers');
const yargs = require('yargs');

const argv = yargs(hideBin(process.argv))
    .option('b', {
        alias: 'base',
        type: 'number',
        demandOption: true
        
    })
    .option('l', {
        alias: 'listar',
        type: 'boolean',
        demandOption: true,
        default: false,
        
    })
    .check((argv, options) => {
        if (isNaN(argv.b)) {
            throw 'La base tiene que ser un número'
        }
        return true; 
    })
    .argv;


console.clear();
console.log(argv);
//console.log('base: yargs', argv.b);


//const base = 3;

crearArchivo(argv.b, argv.l) 
.then((nombreArchivo) => console.log(nombreArchivo, 'creado'))
//.catch((err) => console.log(err));