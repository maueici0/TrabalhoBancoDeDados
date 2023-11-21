const mongoose = require('../database/mongoose');
const {Schema} = mongoose;
const {v4: uuidv4} = require('uuid');

const ocorrenciaSchema = new Schema({
    titulo: {
        type: String,
        required: true,
        unique: true,
    },
    tipo: {
        type: String,
        enum: ['Roubo', 'Furto', 'Acidente', 'Incêndio', 'Outros'],
        required: true,
    },
    data: {
        type: Date,
        required: true,
    },
    localizacao: {
        type: {
          type: String,
          enum: ['Point'],
          required: true
        },
        coordinates: {
          type: [Number],
          required: true
        }
      }
});

const Ocorrencias = mongoose.model('Ocorrencias', ocorrenciaSchema);

module.exports = Ocorrencias;