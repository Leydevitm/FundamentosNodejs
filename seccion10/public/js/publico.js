//REFERENCIAS HTML 
const lblTicket1 = document.querySelector('#lblTicket1');
const lblTicket2 = document.querySelector('#lblTicket2');
const lblTicket3 = document.querySelector('#lblTicket3');
const lblTicket4 = document.querySelector('#lblTicket4');
const Escritorio1 = document.querySelector('#lblEscritorio1');
const Escritorio2 = document.querySelector('#lblEscritorio2');
const Escritorio3 = document.querySelector('#lblEscritorio3');
const Escritorio4 = document.querySelector('#lblEscritorio4');


const socket = io();


socket.on('estado-actual', (payload) => {
    const [ticket1,ticket2,ticket3,ticket4]=payload;
    if(ticket1){
     lblTicket1.innerText= 'Ticket'+  ticket1.numero;
    Escritorio1.innerText=ticket1.escritorio; 
    }
    if(ticket2){
    lblTicket2.innerText= 'Ticket' +ticket2.numero;
    Escritorio2.innerText=ticket2.escritorio; 
    }
    if(ticket3){
    lblTicket3.innerText= 'Ticket'+ ticket3.numero;
    Escritorio3.innerText=ticket3.escritorio; 
    }
    if(ticket4){
    lblTicket4.innerText= 'Ticket'+ticket4.numero;
    Escritorio4.innerText=ticket4.escritorio; 
    }
})

