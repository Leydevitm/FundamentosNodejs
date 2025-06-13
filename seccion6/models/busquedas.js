const axios = require('axios');
class Busquedas{
    historial=['Hidalgo,Madrin,San Jose']

    constructor(){

    }

    async ciudad(lugar=''){

        try {
            //peticion http
            // console.log('ciudad', lugar);
            const resp =await axios.get('https://reqres.in/api/users?page=2');
            console.log(resp.data);
            return []
        } catch (error) {
            console.log('No se encontro nads')
            return[];
            
        }

        

        return[];
    }

    


}



module.exports= Busquedas;
