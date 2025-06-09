
setTimeout(() =>{
    console.log("Hola, soy Leivy");
   
},1000);

const getUsuarioByID = (id, callback) => {
    const usuario = {
        id,
        nombre: 'Leivy'
    }
    setTimeout(() => {
        callback(usuario);
},1500);
}

getUsuarioByID(10, (usuario)=>{
    console.log(usuario);
});