
const validarCampos =require('../middlewares/validar-campos.js');
const  validarJWT  = require('../middlewares/validarJWT.js');
const  validarRoles  = require('../middlewares/validar-roles.js');
const validarArchivo = require ('../middlewares/validar-archivo.js')



module.exports = {
    ...validarCampos,
    ...validarJWT,
    ...validarRoles,
    ...validarArchivo
};