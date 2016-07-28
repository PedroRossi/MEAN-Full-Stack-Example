/**
  * Server starter file
  */
var http = require('http');
var app = require('./config/express')(3000);
require('./config/passport')();
require('./config/database.js')('mongodb://localhost/contatooh');

http.createServer(app).listen(app.get('port'), function(){
  console.log("Express server listening on port " + app.get('port'));
});
