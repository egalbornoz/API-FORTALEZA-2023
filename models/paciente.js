// *******************************************************************************
//  *  Modelo Paciente
//  ********************************************************************************
const { Schema, model } = require('mongoose');

const PacienteSchema = Schema({

    nombre: {
        type: String,
        require: [true, 'El nombre es obligatorio'],
        
    },
    apellido: {
        type: String,
        require: [true, 'El apellido es obligatorio'],
    },
    edad: {
        type: Number,
        require: true
    },
    correo   : {
        type: String,
    
    },
    direccion   : {
        type: String,
    
    },
    telefono   : {
        type: String,
    
    },
    fecha: {
        type: Date,
        require: true
    },
    img:{ type: String},
    dni: {
        type: String,
        require: [true, 'El Documento de Identificación es obligatorio'],
        unique: true
    },
    estado: {
        type: Boolean,
        default: true
    },
    usuario: {
        type: Schema.Types.ObjectId,
        ref: 'Usuario',
        require: true
    }
});
PacienteSchema.methods.toJSON = function () {
    const {__v, _id,...paciente} = this.toObject();
   paciente.uid=_id;
    return  paciente;
}
// *******************************************************************************
//  *  Exportaciones
//  ********************************************************************************
module.exports = model('Paciente', PacienteSchema);
