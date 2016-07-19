var mongoose = require('mongoose'),
    findOrCreate = require('mongoose-findorcreate'),
    Schema = mongoose.Schema;

var usuarioSchema = new Schema({
  login: {
    type: String,
    required: true
    index: {
      unique: true
    }
  },
  nome: {
    type: String,
    required: true
  },
  inclusao: {
    type: Date,
    default: Date.now
  }
});

usuarioSchema.plugin(findOrCreate);

module.exports = function() {
  return mongoose.model('Usuario', usuarioSchema);
}
