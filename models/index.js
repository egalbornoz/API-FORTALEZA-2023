// *************************************************************
// Centralización de modelos en un solo archivo
// *************************************************************
const Categoria = require('./categoria');
const Producto = require('./producto');
const Role = require('./role');
const Server = require('./server');
const Usuario = require('./usuario');
const ChatMensajes = require('./chat-mensajes');
const Paciente =require('./paciente');
const CitaMedica =require('./citamedica');


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
    CitaMedica
}