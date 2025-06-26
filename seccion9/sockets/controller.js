
const socketController =(socket) =>{
            console.log('Cliente conectado', socket.id);
           // socket.disconect()

           socket.on('disconnect' , ()=> {
             console.log('Cliente Desconectado', socket.id);
           });
           socket.on('enviar-mensaje',(payload, callback)=>{

            const id =123456;
            callback({id, fecha: new Date().getTime()});
            //es envsiado y refleja el payload
           socket.broadcast.emit('enviar-mensaje', payload)
           });
        }





module.exports={
    socketController
}