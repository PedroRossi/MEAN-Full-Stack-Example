/**
  * Configurations of the express module
  */
var express = require('express'),
    bodyParser = require('body-parser'),
    consign = require('consign'),
    cookieParser = require('cookie-parser'),
    session = require('express-session'),
    passport = require('passport');

module.exports = function() {
  var app = express();
  // ambient configuration
  app.set('port',3000);
  // middleware
  app.set('view engine', 'ejs');
  app.set('views', './app/views');
  app.use(express.static('./public'));
  app.use(bodyParser.urlencoded({ extended: true}));
  app.use(bodyParser.json());
  app.use(require('method-override')());

  app.use(cookieParser());
  app.use(session(
    {
      secret: 'homem avestruz',
      resave: true,
      saveUnitialized: true
    }
  ));
  app.use(passport.initialize());
  app.use(passport.session());

  // loading dependencies
  consign({cwd: 'app'})
    .include('models')
    .then('controllers')
    .then('routes/auth.js')
    .then('routes')
    .into(app);

  return app;
}
