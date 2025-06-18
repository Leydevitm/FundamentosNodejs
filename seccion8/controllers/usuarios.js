const {response , request} = require('express');



const usuariosGet = (req = request,res = response)=> {
    const {q,nombre,apikey} = req.query;
        res.json({
             msg: 'get API - controlador',
             q,
             nombre,
             apikey
            });
   }

const usuariosPut = (req,res = response)=> {
    const {id}= req.params;
    res.json({
        msg: 'put API',
        id
    });
}

const usuariosPost = (req,res = response)=> {
    const body = req.body;
    res.json({
        msg: 'post API',
        body
    });
}

const usuariosDelete = (req,res = response)=> {
    res.json({
        msg: 'delete API'
    });
}

const usuariosPatch = (req,res = response)=> {
    res.json({
        msg: 'patch API'
    });
}

module.exports = {
    usuariosGet,
    usuariosPut,
    usuariosPost,
    usuariosDelete,
    usuariosPatch
}