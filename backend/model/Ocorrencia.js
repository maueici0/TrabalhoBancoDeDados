const mongoose = require('../database/mongoose');
const {Schema} = mongoose;
const {v4: uuidv4} = require('uuid');

const ocorrenciaSchema = new Schema({
    _id: {
        type: String,
        default: uuidv4(),
    },
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
          type: String, // Don't do `{ location: { type: String } }`
          enum: ['Point'], // 'location.type' must be 'Point'
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