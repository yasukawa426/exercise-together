const mongoose = require ('mongoose');


const usuarioSchema = mongoose.Schema ({
  nome: {type: String, required: true},
  email: {type: String, required: true},
  peso: {type: [Number], default: []},
  treinos: []
})


module.exports = mongoose.model('Usuario', usuarioSchema)