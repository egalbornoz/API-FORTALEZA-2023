// *******************************************************************************
//  *  Modelo Categoria
//  ********************************************************************************/
const { Schema, model } = require('mongoose');

const CitamedicaSchema = Schema({

    fecha: {
        type: Date,
        require: [true, 'Fecha de cita obligatoria'],
    },
    estado: {
        type: Boolean,
        default: true,
        require: true
    },
    sintomas: {
        type: String,
    },
    diagnostico: {
        type: String,
    },
    trataiento: {
        type: String,
    },
    evolucion: {
        type: String,
    },
    alta: {
        type: Boolean,
        default:false
    },
    paciente: {
        type: Schema.Types.ObjectId,
        ref: 'Paciente',
        require: true
    },

});
CitamedicaSchema.methods.toJSON = function () {
    const { __v,...data } = this.toObject();
      return data;
}
module.exports = model('Citamedica', CitamedicaSchema);