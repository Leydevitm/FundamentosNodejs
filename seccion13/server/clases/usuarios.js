
class Usuarios{

    constructor(){
        this.persona=[];
    }

    agregarPersona(id, nombre){
        let persona ={
            id,nombre
        }

        this.persona.push(persona);

        return this.persona;

    }
    getPersona (id){
        let persona = this.persona.filter(persona => persona.id === id )[0];
        return persona;
    }

    getPersonas(){
        return this.getPersonas;
    }

    getPersonasPorSala(sala){

    }

    borrarPersona(id){

        let personaBorrada = this.getPersona(id);
        this.persona = this.persona.filter(persona => persona.id !=id);
            return personaBorrada
    }




}

module.exports={Usuarios}