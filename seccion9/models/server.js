
const express = require('express')
const cors = require('cors');
// const { dbConnection } = require('../database/config');

class Server{

    constructor(){
    this.app  = express()
    this.port = process.env.PORT;
    this.server = require('http').createServer(this.app);
    this.io = require('socket.io')(this.server);

    this.paths={};
 
    // Middlewares
    this.middlewares();
    //rutas
    this.routes();
    //sockets
    this.sockets();
    }

    
    middlewares(){

        //cors
        this.app.use(cors());

        //directorio publico 
        this.app.use(express.static('public'));
    
    }

    routes(){}

    sockets(){
        this.io.on('connection', socket =>{
            console.log('Cliente conectado', socket.id);
           // socket.disconect()

           socket.on('disconnect' , ()=> {
            console.log('Cliente Desconectado', socket.id);
           });
           socket.on('enviar-mensaje',(payload)=>{
            console.log(payload)
           });
        });
    }
    
        listen(){
    this.server.listen(this.port, ()=>{
    console.log('Servidor corriendo en el puerto', this.port);
    });
}
}


module.exports = Server;