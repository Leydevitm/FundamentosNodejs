
const deadpool ={
    nombre: 'Wade',
    apellido: 'Winston',
    poder: 'Regeneracion',
    getNombre(){
        return `${this.nombre} ${this.apellido} ${this.poder}`;
    }

}

console.log(deadpool.getNombre());
const{nombre,apellido,poder, edad=40}=deadpool
console.log(nombre,apellido,poder,edad);

//const nombre = deadpool.nombre;
//const apellido = deadpool.apellido;
//const poder = deadpool.poder;

function imprimeHeroe({nombre,apellido,poder,edad=30}){
    
    console.log(nombre,apellido,poder,edad);
}
imprimeHeroe(deadpool);

//arreglos
const heroes =['Deadpool','Superman','Batman'];
//const h1 = heroes[0];
//const h2 = heroes[1];
//const h3 = heroes[2];
//console.log(h1);
//destructuracion de arreglos
const[,h2,h3]=heroes;
console.log(h2,h3);