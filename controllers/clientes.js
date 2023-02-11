/**********************************************************************
 *    IMPORTACIONES NECEARIAS
 **********************************************************************/
const { request, response  } = require('express');
const { Cliente, TipoIdentificacione, Usuario } =  require('../models');

/********************************************************************************
 * Controlador para obtener los Clientes
 ********************************************************************************/
const clientesGet = async (req = request, res = response) => { 

    try {
        const clientes = await Cliente.findAll({
            // where:{
            //   idusuario:1
            // },
             attributes: ['numeroidentificacion','razonsocial','dircomercial'],
             include: [
                    {
                      model: TipoIdentificacione,
                      attributes: ['codigo','descripcion'],
                    },
                ],
                
        });
        //    res.json({ clientes });
        res.json({
            clientes
        });

    } catch (error) {
      res.status(500);
      res.send(error.message);
    };
}

 module.exports ={
    clientesGet,
 }