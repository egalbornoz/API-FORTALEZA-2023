/********************************************************************************
 * Importaciones necesaria
 ********************************************************************************/
const { response, request, json } = require('express');
const bcrypt = require('bcryptjs');
const { Usuario, Estatu, Departamento } = require('../models/');


/********************************************************************************
 * Controlador para obtener los usuarios activos con estado:true y paginados limite=?
 ********************************************************************************/
const usuariosGet = async (req = request, res = response) => {

    try {
        const usuarios = await Usuario.findAll({
            // where:{
            //   idusuario:1
            // },
             attributes: ['nombre','apellido','cedula','usuario','correo'],
             include: [
                    {
                      model: Estatu,
                      attributes: ['nombre'],
                    },
                    {
                      model: Departamento,
                        attributes: ['nombre','activo'],
                      },
                ],
                
        });
           res.json({ usuarios });

    } catch (error) {
      res.status(500);
      res.send(error.message);
    };
}

/********************************************************************************
 * Controlador para actualizar los usuarios 
 ********************************************************************************/
const usuariosPut = async (req, res = response) => {
    const { id } = req.params; //Id configurado en la ruta router.put('/:id', usuariosPut);
    const { _id, contraseña, google, correo, ...resto } = req.body; // se excluyen elementos y el resto se actualiza
  
    if (contraseña) {
        const salt = bcrypt.genSaltSync();
        resto.contraseña = bcrypt.hashSync(contraseña, salt);
    }
    const usuario = await Usuario.findByIdAndUpdate(id, resto);

    res.json(usuario);
}
/********************************************************************************
 * Controlador crear los usuarios
 ********************************************************************************/
const usuariosPost = async (req, res = response) => {
    const { nombre, correo, contraseña, rol } = req.body;
    const usuario = new Usuario({ nombre, correo, contraseña, rol });
    const salt = bcrypt.genSaltSync();

    usuario.contraseña = bcrypt.hashSync(contraseña, salt);
    await usuario.save();
    res.json({
        msg: usuario
    });
}
/********************************************************************************
 * Controlador elminar los usuarios  (Marcar estado=false)
 ********************************************************************************/
const usuariosDelete = async (req, res = response) => {
    const { id } = req.params;

    const usuario = await Usuario.findByIdAndUpdate(id, { estado: false });
    const usuarioAut = req.usuario;

    res.json({ usuario, usuarioAut });
}
/********************************************************************************
 * Exportación de los modulos
 ********************************************************************************/
module.exports = {
    usuariosGet,
    usuariosPut,
    usuariosPost,
    usuariosDelete,
}