const TicketControl = require('../models/ticket-control');

const ticketControl = new TicketControl();


const socketController = (socket) => {

    // Apenas el cliente se conecta, le envío el último ticket generado
    socket.emit('ultimo-ticket', ticketControl.ultimo);

    // También le envío el estado actual con los últimos 4 tickets atendidos
    socket.emit('estado-actual', ticketControl.ultimos4);

    // Y le informo cuántos tickets están pendientes
    socket.emit('tickets-pendientes', ticketControl.tickets.length);

    // Escucho cuando alguien solicita el siguiente ticket
    socket.on('siguiente-ticket', (payload, callback) => {

        // Genero el siguiente ticket usando el método del controlador
        const siguiente = ticketControl.siguiente();

        // Devuelvo el nuevo ticket al cliente que lo solicitó
        callback(siguiente);

        // Además, notifico a todos los demás cuántos tickets quedan pendientes
        socket.broadcast.emit('tickets-pendientes', ticketControl.tickets.length);
    });

    // Escucho cuando alguien quiere atender un ticket
    socket.on('atender-ticket', ({ escritorio }, callback) => {

        // Si no se proporciona un escritorio, devuelvo un error al cliente
        if (!escritorio) {
            return callback({
                ok: false,
                msg: 'Es escritorio es obligatorio'
            });
        }

        // Atiendo el siguiente ticket disponible para ese escritorio
        const ticket = ticketControl.atenderTicket(escritorio);

        // Notifico a los demás clientes que hubo un cambio en los últimos 4 tickets atendidos
        socket.broadcast.emit('estado-actual', ticketControl.ultimos4);

        // Actualizo también la cantidad de tickets pendientes para el cliente actual...
        socket.emit('tickets-pendientes', ticketControl.tickets.length);

        // ...y para los demás clientes
        socket.broadcast.emit('tickets-pendientes', ticketControl.tickets.length);

        // Si no hay más tickets, envío una respuesta indicando que ya no hay pendientes
        if (!ticket) {
            callback({
                ok: false,
                msg: 'Ya no hay tickets pendientes'
            });
        } else {
            // Si sí hay, devuelvo el ticket asignado al escritorio
            callback({
                ok: true,
                ticket
            });
        }
    });
};





module.exports = {
    socketController
}

