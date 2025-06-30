var socket = io();

// Obtengo los parámetros que vienen en la URL, como ?nombre=Juan&sala=General
var params = new URLSearchParams(window.location.search);

// Verifico si en la URL existen los parámetros 'nombre' y 'sala'
if (!params.has('nombre') || !params.has('sala')) {
    // Si no están, redirijo al usuario al index.html
    window.location = 'index.html';

    // Y lanzo un error para evitar que se siga ejecutando el script
    throw new Error('El nombre y sala son necesarios es necesario');
}

// Si los parámetros existen, los guardo en un objeto llamado usuario
var usuario = {
    nombre: params.get('nombre'),
    sala: params.get('sala')
};

// Cuando el cliente se conecta al servidor de sockets
socket.on('connect', function() {
    console.log('Conectado al servidor');

    // Envío un evento 'entrarChat' al servidor junto con el objeto usuario
    // También recibo la respuesta con los usuarios conectados en esa sala
    socket.emit('entrarChat', usuario, function(resp) {
        console.log('Usuarios conectados', resp);
    });
});

// Escucho cuando el cliente se desconecta del servidor
socket.on('disconnect', function() {
    console.log('Perdimos conexión con el servidor');
});



// Enviar información
// socket.emit('crearMensaje', {
//     usuario: 'Leivy',
//     mensaje: 'Hola Mundo'
// }, function(resp) {
//     console.log('respuesta server: ', resp);
// });

// Escuchar información
socket.on('crearMensaje', function(mensaje) {

    console.log('Servidor:', mensaje);

});

//Escuchar cambios de usuarios
//cuando un usuario entra o sale del chat 
socket.on('listaPersona', function(personas) {

    console.log( personas);

});

//mensajes privados
socket.on('mensajePrivado',function(mensaje){
 console.log('Mensaje Privado:' , mensaje);

 
});
