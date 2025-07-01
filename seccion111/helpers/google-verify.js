// Importo el cliente OAuth2 de la librería oficial de Google
const { OAuth2Client } = require('google-auth-library');

// Creo una instancia del cliente usando el CLIENT_ID que tengo almacenado en mis variables de entorno
const client = new OAuth2Client(process.env.GOOGLE_CLIENT_ID);

// Defino la función asincrónica googleVerify para validar el token enviado por el cliente (idToken)
const googleVerify = async(idToken = '') => {

  // Verifico el token usando el cliente de Google
  const ticket = await client.verifyIdToken({
      idToken,  // Token que recibo desde el frontend
      audience: process.env.GOOGLE_CLIENT_ID // Especifico que el token debe haber sido emitido para mi app
  });

  // Extraigo del payload la información que necesito: nombre, imagen de perfil y correo electrónico
  const { 
    name: nombre, 
    picture: img, 
    email: correo 
  } = ticket.getPayload();

  // Devuelvo un objeto con los datos del usuario autenticado por Google
  return { nombre, img, correo };
}

// Exporto la función para poder utilizarla en rutas o controladores
module.exports = {
    googleVerify
}
