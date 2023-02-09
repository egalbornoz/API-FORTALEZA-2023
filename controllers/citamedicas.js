/********************************************************************************
 * Importaciones necesarias
 ********************************************************************************/
const { response, json } = require('express');
const { Usuario, CitaMedica, Paciente } = require('../models');
const paciente = require('../models/paciente');
/********************************************************************************
 * Controlador obtenerCitaMedica - paginado -total - populate
 ********************************************************************************/
const obtenerCitasMedicas = async (req = request, res = response) => {
    const filtro = { estado: true };
    const { limite = 5, desde = 0 } = req.query;  //Obtener del body el limite de paginación
    const [total, CitaMedicas] = await Promise.all([

        CitaMedica.countDocuments(filtro),
        CitaMedica.find(filtro) //dentro den find va la condicion
            .populate('usuario', 'nombre')
            .populate('citamedica', 'sintoma')
            .skip(Number(desde))
            .limit(Number(limite))
    ]);
    res.json({
        total,
        CitaMedicas,
    });
}
/********************************************************************************
* Controlador obtenerProducto - populate {retornar objeto categoria}
 ********************************************************************************/
const obtenerCitaMedica = async (req = request, res = response) => {
    const { paciente } = req.params;
    const citamedica = await CitaMedica.find({estado:true},paciente)
        .populate('usuario', 'nombre')
        .populate('paciente', 'nombre')
    res.json(
        citamedica
    );
}
/********************************************************************************
 * Controlador Crear Producto
 ********************************************************************************/
const crearCitaMedica = async (req = request, res = response) => {
     const { estado, usuario, ...body } = req.body;
     const citamedicaDb = await CitaMedica.findOne({ fecha: body.fecha });
    if (citamedicaDb) {
        return res.status(400).json({
            msg: `La cita ${citamedicaDb.fecha} ya existe`,
        })
    }
    const data = {
         ...body,
         usuario: req.usuario._id
    }
    console.log('Imprimiendo Data',data)
    // Grabar los datos
    const citamedica = new CitaMedica(data);
    await citamedica.save();
    res.status(201).json(citamedica);
}
/********************************************************************************
* Controlador actualizarProducto 
 ********************************************************************************/
const actualizarCitaMedica = async (req, res = response) => {
    // const { id } = req.params;
    // const { estado, usuario, ...data } = req.body; // se excluyen elementos y el resto se actualiza
    // if (data.nombre) {
    //     data.nombre = data.nombre.toUpperCase();
    // }
    // data.usuario = req.usuario._id;
    // const producto = await Producto.findByIdAndUpdate(id, data, { new: true });

    // res.json(producto);
}
/********************************************************************************
 * Controlador Borrar Producto
 ********************************************************************************/
const borrarCitaMedica = async (req, res = response) => {
    // const { id } = req.params;
    // const producto = await Producto.findByIdAndUpdate(id, { estado: false }, { new: true })
    // res.json({
    //     producto,
    // });
}
/********************************************************************************
 * Exportaciones Controladores
 ********************************************************************************/
module.exports = {
    crearCitaMedica,
    obtenerCitasMedicas,
    obtenerCitaMedica,
    actualizarCitaMedica,
    borrarCitaMedica
}