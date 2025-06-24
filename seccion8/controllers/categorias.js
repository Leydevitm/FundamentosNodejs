const {response} = require('express')
const {Categoria} = require('../models');


const obtenerCategorias= async(req,res=response) =>{

     const{limite =5, desde =0} = req.query;
      const query = {estado: true};
      const [total,categorias] = await Promise.all([
            Categoria.countDocuments(query),
            Categoria.find(query)
                    .populate('usuario','name')
                    .skip(Number(desde))
                    .limit(Number(limite))
        ]) ;
        res.json({
            total,
            categorias
                });

}

const obtenerCategoria =async(req,res=response)=>{
    const {id} =req.params;
    const categoria = await Categoria.findById(id).populate('usuario','name');
    res.json(categoria);
}

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

const actualizarCategorias = async(req,res=response)=>{
    const{id } = req.params;
    const {estado,usuario, ...data} = req.body;


    data.nombre = data.nombre.toUpperCase();
    data.usuario = req.usuario._id;
   
    const categoria = await Categoria.findByIdAndUpdate(id,data,{new:true});
    res.json(categoria);

}

const borrarCategoria = async(req,res=response)=>{
    const{id} = req.params;
    const categoriaBorrada = await Categoria.findByIdAndUpdate(id, {estado:false}, {new:true});

    res.json(categoriaBorrada);

}

module.exports={crearCategoria,
     obtenerCategorias,
     actualizarCategorias,
     borrarCategoria,
      obtenerCategoria}