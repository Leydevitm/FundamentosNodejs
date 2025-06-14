const axios = require('axios');
class Busquedas{
    historial=['Hidalgo,Madrin,San Jose']

    constructor(){

    }

    async ciudad(lugar=''){

        try {
            //peticion http
            // console.log('ciudad', lugar);
            const resp =await axios.get('https://api.mapbox.com/geocoding/v5/mapbox.places/colo.json?bbox=-180%2C-90%2C180%2C90&limit=5&proximity=-73.990593%2C40.740121&types=country%2Cregion&language=es&access_token=pk.eyJ1IjoibGV5NG4tZGV2IiwiYSI6ImNtYnZncTlrdzBvbWIybG9mOHUxejdjYncifQ.n7k3o2fsdjFnkRmKoqbsOg');
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
