// Importo validationResult desde express-validator para poder acceder a los errores de validación
const { validationResult } = require('express-validator');

// Defino el middleware validarCampos, que se ejecutará después de los middlewares de validación
const validarCampos = (req, res, next) => {

    // Obtengo los errores de validación del request
    const errors = validationResult(req);

    // Si hay errores (el arreglo no está vacío), devuelvo una respuesta con código 400 y los errores
    if (!errors.isEmpty()) {
        return res.status(400).json(errors);
    }

    // Si no hay errores, llamo a next() para continuar con el siguiente middleware o controlador
    next();
}

// Exporto el middleware para poder usarlo en rutas protegidas o con validaciones
module.exports = {
    validarCampos
}
