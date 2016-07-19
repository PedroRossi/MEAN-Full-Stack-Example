var mongoose = require('mongoose');

module.exports = function(url){
  mongoose.connect(url);

  mongoose.connection.on('connected',function() {
    console.log('Mongoose! Conectado em ' + url);
  });

  mongoose.connection.on('disconnected',function() {
    console.log('Mongoose! Desconectado de ' + url);
  });

  mongoose.connection.on('error',function(error) {
    console.log('Mongoose! Erro: ' + error);
  });

  process.on('SIGINT', function() {
    mongoose.connection.close(function() {
      console.log('Mongoose! Desconectado pelo '+
      'termino da aplicação');
      process.exit(0);
    });
  });
}
