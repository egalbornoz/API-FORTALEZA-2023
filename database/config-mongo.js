/********************************************************************************
 *  Importaciones  Configuración de la Base de Datos 
 ********************************************************************************/
const mongoose = require('mongoose');
const Usuario = require('../models/usuario');
const bcrypt = require('bcryptjs');
const { nombre,correo,rol, password } = require ('./admin');
/********************************************************************************
 *  Método para conectarse a la db
 ********************************************************************************/
const dbConnection = async () => {
    try {
        //Conexión a la DB
        await mongoose.connect(process.env.MONGODB_CNN,{
            useNewUrlParser: true,
            useUnifiedTopology: true,
            useCreateIndex: true,
            useFindAndModify: false
        });
        console.log('Base de datos ONLINE')
        //Se crea el usuario Administrados la primera vez
        const existeUsuario = await Usuario.findOne({ correo })
               if(!existeUsuario){
                  const salt = bcrypt.genSaltSync(); 
                  const contraseña = bcrypt.hashSync(password, salt);             
                  const usuario = new Usuario({ nombre, correo, contraseña, rol  });
                  await usuario.save();
                }
    } catch (error) {
        console.log(error)
        throw new Error('Error inicializando la DB');
    }
}
/********************************************************************************
 *  Exportacion método dbConnection
 ********************************************************************************/
module.exports = {
    dbConnection,
}