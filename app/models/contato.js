var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

var contatoSchema = new Schema({
  nome: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true,
    index: {
      unique: true
    }
  },
  emergencia: {
    type: mongoose.Schema.ObjectId,
    ref: 'Contato'
  }
});

module.exports = function() {
  return mongoose.model('Contato', contatoSchema);
}
