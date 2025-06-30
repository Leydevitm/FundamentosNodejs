const fs=require('fs');
 const archivo ='./db/data.json'
// Defino la función guardarDB que recibe los datos que quiero guardar
const guardarDB = (data) => {
    // Uso writeFileSync para escribir los datos en el archivo (como string en formato JSON)
    fs.writeFileSync(archivo, JSON.stringify(data));
}

// Defino la función leerDB para leer los datos guardados previamente
const leerDB = () => {

    // Primero verifico si el archivo existe; si no existe, retorno null
    if (!fs.existsSync(archivo)) {
        return null;
    }

    // Si existe, leo el contenido del archivo con codificación UTF-8
    const info = fs.readFileSync(archivo, { encoding: 'utf-8' });

    // Luego convierto el contenido de texto JSON a un objeto JavaScript
    const data = JSON.parse(info);

    // Retorno los datos parseados para que puedan ser utilizados
    return data;
}

// Exporto las dos funciones para poder usarlas en otros archivos del proyecto
module.exports = {
    guardarDB,
    leerDB
}

