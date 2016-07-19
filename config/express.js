/**
  * Configurations of the express module
  */
var express = require('express'),
    bodyParser = require('body-parser'),
    consign = require('consign');

var app = express();

// ambient configuration
app.set('port',3000);
//middleware
app.use(express.static('./public'));
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());
app.use(require('method-override')());
app.set('view engine', 'ejs');
app.set('views', './app/views');
// loading dependencies
// need debbuging
consign({cwd: 'app'})
  .include('models')
  .then('controllers')
  .then('routes')
  .into(app);

module.exports = function() {
  return app;
}
