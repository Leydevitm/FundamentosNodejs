const getUsuarioSync = (id) => {
    const startPoint = new Date().getTime();
    while (new Date().getTime() - startPoint <= 3000){
        // Simulando una operación bloqueante
    }
    
return{
    id,
    nombre:`Usuario ${id}`
};
}


const getUsuario = (id, callback) => {
    const usuarios = {
        id,
        nombre:`Usuario ${id}`
    };
    setTimeout(() => {
        callback(usuarios);
    }, 3000);

}

module.exports={
    getUsuario,
    getUsuarioSync
}