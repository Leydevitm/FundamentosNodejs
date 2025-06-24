const {response} = require('express')
const {Categoria} = require('../models');


const crearCategoria = async(req,res=response)=>{
    //se lee el body y se capitaliza 
    const nombre = req.body.nombre.toUpperCase();
    // existe una categoria con ese nombre 
    const categoriaDB = await Categoria.findOne({nombre});
    

    if(categoriaDB){
        return res.status(400).json({
            msg: `La categoria ${categoriaDB.nombre}, ya existe`
        });
    }

    //Generar la data a guardar 
    const data ={
        nombre,
        usuario: req.usuario._id
        //tiene que ser un id de mongo y ya estar validado
    }

    const categoria = new Categoria(data);

    //guardar categoria 
    await categoria.save();

    res.status(201).json(categoria);


}


module.exports={crearCategoria}