// Importo el objeto response de Express para poder usarlo como tipo de referencia
const { response } = require("express");

// Defino el middleware validarArchivoSubir, que se encarga de verificar si se subió un archivo
const validarArchivoSubir = (req, res = response, next) => {

    // Verifico tres condiciones:
    // 1. Si no existen archivos en la petición
    // 2. Si el objeto req.files está vacío
    // 3. Si no viene el archivo bajo la propiedad 'archivo'
    if (!req.files || Object.keys(req.files).length === 0 || !req.files.archivo) {
        // Si alguna condición se cumple, devuelvo un error 400 con un mensaje explicativo
        return res.status(400).json({
            msg: 'No hay archivos que subir - validarArchivoSubir'
        });
    }

    // Si el archivo está presente, paso al siguiente middleware o controlador
    next();
}

// Exporto el middleware para usarlo donde sea necesario (por ejemplo, antes de subir archivos)
module.exports = {
    validarArchivoSubir
}
