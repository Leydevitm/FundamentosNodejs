const { response } = require("express");

const esAdminRole=(req,res=response,next)=>{
   if(!req.usuario){

    return res.status(500).json({
        msg: 'Se quiere verificar el rol sin validar el token primero'
    });
}
    const {role,name} = req.usuario;
    if(role !== 'ADMIN_ROLE'){
        return res.status(401).json({
            msg: `${name} no es administrador - No puede hacer esto`
        });                         

   }
    next();

}


const tieneRole=(...roles)=>{
    return(req,res=response,next)=>{
    //console.log(roles, req.usuario.role);

     if(!req.usuario){
    return res.status(500).json({
        msg: 'Se quiere verificar el rol sin validar el token primero'
    });
  }
  if(!roles.includes(req.usuario.role)){
        return res.status(401).json({
            msg: `El servicio requiere uno de estos roles ${roles}`
        });
  }
        next();
    }

}


module.exports={esAdminRole,tieneRole}