const { io } = require('../server');
const {Usuarios }= require ('../clases/Usuarios');
const {crearMensaje} =require('../utilidades/utilidades') 


const usuarios = new Usuarios();
io.on('connection', (client) => {

    // Cuando un cliente se conecta, escucho el evento 'entrarChat'
    client.on('entrarChat', (data, callback) => {

        // Primero verifiqué que se proporcione el nombre y la sala
        if (!data.nombre || !data.sala) {
            // Si falta alguno, devuelvo un error mediante el callback
            return callback({
                error: true,
                mensaje: 'El nombre/sala es necesario'
            });
        }

        // Si los datos están completos, hago que el cliente se una a la sala especificada
        client.join(data.sala);

        // Luego, agrego al usuario a mi lista usando su ID, nombre y sala
        usuarios.agregarPersona(client.id, data.nombre, data.sala);

        // Después, notifico a todos en la sala (excepto al nuevo) que hay una nueva lista de personas
        client.broadcast.to(data.sala).emit('listaPersona', usuarios.getPersonasPorSala(data.sala));

        // También informo que el nuevo usuario se unió al chat, usando el nombre "Administrador"
        client.broadcast.to(data.sala).emit('crearMensaje', crearMensaje('Administrador', `${data.nombre} se unió`));

        // Finalmente, devuelvo la lista de personas en la sala al nuevo cliente
        callback(usuarios.getPersonasPorSala(data.sala));
    });

    // Escucho cuando un cliente crea un nuevo mensaje
    client.on('crearMensaje', (data, callback) => {
        // Obtengo los datos de la persona que envió el mensaje usando su ID
        let persona = usuarios.getPersona(client.id);

        // Luego creo el mensaje con el nombre del usuario y su contenido
        let mensaje = crearMensaje(persona.nombre, data.mensaje);

        // Envío ese mensaje a todos los demás usuarios de la misma sala
        client.broadcast.to(persona.sala).emit('crearMensaje', mensaje);

        // Uso el callback para confirmar al emisor que el mensaje fue recibido y enviado
        callback(mensaje);
    });

    // Cuando un cliente se desconecta
    client.on('disconnect', () => {
        // Elimino al usuario de la lista usando su ID
        let personaBorrada = usuarios.borrarPersona(client.id);

        // Si encontré a la persona eliminada
        if (personaBorrada) {
            // Informo a los demás que esa persona salió del chat
            client.broadcast.to(personaBorrada.sala).emit(
                'crearMensaje',
                crearMensaje('Administrador', `${personaBorrada.nombre} salió`)
            );

            // También actualizo la lista de personas para los demás usuarios en la sala
            client.broadcast.to(personaBorrada.sala).emit(
                'listaPersona',
                usuarios.getPersonasPorSala(personaBorrada.sala)
            );
        }
    });

    // Finalmente, escucho si se quiere enviar un mensaje privado a alguien específico
    client.on('mensajePrivado', data => {
        // Obtengo al emisor del mensaje
        let persona = usuarios.getPersona(client.id);

        // Envío el mensaje solo al destinatario especificado
        client.broadcast.to(data.para).emit('mensajePrivado', crearMensaje(persona.nombre, data.mensaje));
    });

});
