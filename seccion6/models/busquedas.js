const axios = require('axios');
class Busquedas{
    historial=['Hidalgo,Madrin,San Jose']

    constructor(){

    }
    get paramsMapbox(){
        return {
            'access_token': 'pk.eyJ1IjoibGV5NG4tZGV2IiwiYSI6ImNtYnZncTlrdzBvbWIybG9mOHUxejdjYncifQ.n7k3o2fsdjFnkRmKoqbsOg',
            'limit': 5,
            'language': 'es'
        }
    }
    

    async ciudad(lugar=''){

        try {
            //peticion http
            const intance =axios.create({
                baseURL: `https://api.mapbox.com/geocoding/v5/mapbox.places/${lugar}.json`,
                params: this.paramsMapbox
            });
            const resp = await intance.get();
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
