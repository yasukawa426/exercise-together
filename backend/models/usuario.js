const mongoose = require ('mongoose');
const uniqueValidator = require('mongoose-unique-validator');


const usuarioSchema = mongoose.Schema ({
  nome: {type: String, required: true},
  email: {type: String, required: true},
  password: {type: String, required: true},
  peso: [],
  treinos: []
})

usuarioSchema.plugin(uniqueValidator);

module.exports = mongoose.model('Usuario', usuarioSchema)
