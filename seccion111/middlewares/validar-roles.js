// Importo response desde express para poder usarlo como tipo de referencia
const { response } = require('express');

// Middleware que verifica si el usuario autenticado es administrador
const esAdminRole = (req, res = response, next) => {

    // Primero verifico si el usuario ya fue autenticado (debe estar en req.usuario)
    if (!req.usuario) {
        return res.status(500).json({
            msg: 'Se quiere verificar el role sin validar el token primero'
        });
    }

    // Extraigo el rol y el nombre del usuario autenticado
    const { rol, nombre } = req.usuario;

    // Verifico que el rol del usuario sea 'ADMIN_ROLE'
    if (rol !== 'ADMIN_ROLE') {
        return res.status(401).json({
            msg: `${nombre} no es administrador - No puede hacer esto`
        });
    }

    // Si pasa la verificación, llamo a next() para continuar
    next();
}

// Middleware flexible que permite verificar si el usuario tiene alguno de los roles permitidos
const tieneRole = (...roles) => {
    // Devuelvo una función middleware que se ejecutará con req, res y next
    return (req, res = response, next) => {

        // Verifico si ya se autenticó al usuario
        if (!req.usuario) {
            return res.status(500).json({
                msg: 'Se quiere verificar el role sin validar el token primero'
            });
        }

        // Verifico si el rol del usuario está dentro de los roles permitidos
        if (!roles.includes(req.usuario.rol)) {
            return res.status(401).json({
                msg: `El servicio requiere uno de estos roles: ${roles}`
            });
        }

        // Si el rol es válido, continúo con el siguiente middleware o controlador
        next();
    }
}

// Exporto ambos middlewares para usarlos en rutas protegidas que requieran permisos de administrador o roles específicos
module.exports = {
    esAdminRole,
    tieneRole
}
