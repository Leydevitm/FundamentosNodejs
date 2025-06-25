const path = require ('path');
const fs = require ('fs');
const{response}=require('express');
const {subirArchivo}= require('../helpers')
const {Usuario, Producto} = require ('../models');

const cargarArchivo= async(req,res=response)=>{
   try {
      //const nombre = await subirArchivo(req.files,['txt','md'], 'textos');
      const nombre = await subirArchivo(req.files,undefined, 'imgs');
      res.json({nombre})
   } catch (msg) {
      res.status(400).json({msg});
   }
}

const actualizarImagen = async(req,res=response)=>{
   const {id, coleccion} = req.params;

   let modelo;
    switch (coleccion) {
      case 'usuarios':
         modelo = await Usuario.findById(id);
         if(!modelo){
            return res.status(400).json({
               msg: `NO existe un usuario con el id ${id}`
            });
         }
         break;

         case 'productos':
         modelo = await Producto.findById(id);
         if(!modelo){
            return res.status(400).json({
               msg: `NO existe un producto con el id ${id}`
            });
         }
         break;
    
      default:
         return res.status(500).json ({msg: 'Se me olvido valirdar esto'})
    }

    // Limpiar imagenes previas 
    if (modelo.img){
      //hay que borrar la imagen del servidro 
      const pathImagen = path.join(__dirname, '../uploads', coleccion, modelo.img);
      if (fs.existsSync(pathImagen)){
         fs.unlinkSync(pathImagen);
      }
    }


      const nombre = await subirArchivo(req.files,undefined, coleccion);
      modelo.img = nombre;

    await modelo.save();

    res.json(modelo);







   res.json({id, coleccion})
}

const mostrarImagen = async(req,res=response)=>{
   
    const {id, coleccion} = req.params;

   let modelo;
    switch (coleccion) {
      case 'usuarios':
         modelo = await Usuario.findById(id);
         if(!modelo){
            return res.status(400).json({
               msg: `NO existe un usuario con el id ${id}`
            });
         }
         break;

         case 'productos':
         modelo = await Producto.findById(id);
         if(!modelo){
            return res.status(400).json({
               msg: `NO existe un producto con el id ${id}`
            });
         }
         break;
    
      default:
         return res.status(500).json ({msg: 'Se me olvido valirdar esto'})
    }

    // Limpiar imagenes previas 
    if (modelo.img){
      //hay que borrar la imagen del servidro 
      const pathImagen = path.join(__dirname, '../uploads', coleccion, modelo.img);
      if (fs.existsSync(pathImagen)){
         //fs.unlinkSync(pathImagen);
         return res.sendFile(pathImagen)
      }}
   const pathImagen = path.join(__dirname, '../assets/imagennotfound.jpg');
   res.sendFile (pathImagen);
   }


module.exports={cargarArchivo, actualizarImagen, mostrarImagen}