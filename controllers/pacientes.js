const { response, request, json } = require('express'); 
const Paciente= require('../models/paciente');
/********************************************************************************
 * Controlador para obtener los usuarios activos con estado:true y paginados limite=?
 ********************************************************************************/
const pacientesGet = async (req = request, res = response) => {
    const filtro = { estado: true };
    const { limite = 5, desde = 0 } = req.query;  //Obtener del body el limite de paginación
    const [total, pacientes] = await Promise.all([

        Paciente.countDocuments(filtro),
        Paciente.find(filtro) //dentro den find va la condicion
            .skip(Number(desde))
            .limit(Number(limite))
    ]);
    res.json({
        total,
        pacientes
    });
}
/********************************************************************************
 * Controlador para actualizar los pacientes
 ********************************************************************************/
const pacientesPut = async (req, res = response) => {
    const { _id, dni, ...resto } = req.body; // se excluyen elementos y el resto se actualiza
     const paciente = await Paciente.findOne({dni}); //Se busca el id por dni
     const pacienteUp = await Paciente.findByIdAndUpdate(paciente._id, resto); //Actualiza
    res.json(pacienteUp);
}
// /********************************************************************************
//  * Controlador crear los pacientes
//  ********************************************************************************/
const pacientesPost = async (req, res = response) => {
    const { nombre, apellido, edad, correo, direccion, telefono, fecha, img, dni } = req.body;
    const paciente = new Paciente({ nombre, apellido, edad, correo, direccion, telefono, fecha, img, dni });
    await paciente.save();
    res.json({
        msg: paciente
    });
}
// /********************************************************************************
//  * Controlador elminar los pacientes  (Marcar estado=false)
//  ********************************************************************************/
const pacientesDelete = async (req, res = response) => {
    const { dni } = req.params;
    const { id }=await Paciente.findOne({dni});
    const paciente = await Paciente.findByIdAndUpdate(id,{estado:false});
    const pacienteAut = req.paciente;

    res.json({ paciente, pacienteAut });
}
/********************************************************************************
 * Exportación de los modulos
 ********************************************************************************/
module.exports = {
    pacientesGet,
    pacientesPost,
    pacientesDelete,
    pacientesPut
}