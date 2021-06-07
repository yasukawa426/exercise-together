const mongoose = require ('mongoose');
const { ModuleKind } = require('typescript');

const emailSchema = mongoose.Schema ({
  to: {type: String, required: true},
  data: {type: Number, required: true}
});

module.exports = mongoose.model('Email', emailSchema)