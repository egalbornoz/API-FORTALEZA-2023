// *************************************************************
// Centralización de modelos en un solo archivo
// *************************************************************
const Categoria = require('./categoria');
const Producto = require('./producto');
const Role = require('./role');
const Server = require('./server');
const Usuario = require('../models/usuario');
const Departamento = require('./departamento');
const ChatMensajes = require('./chat-mensajes');
const Paciente =require('./paciente');
const CitaMedica =require('./citamedica');
const Estatu =require('./estatu');


// *************************************************************
// Exportaciones
// *************************************************************
module.exports = {
    Categoria,
    Producto,
    Role,
    Server,
    Usuario,
    ChatMensajes,
    Paciente,
    CitaMedica,
    Estatu,
    Departamento
}