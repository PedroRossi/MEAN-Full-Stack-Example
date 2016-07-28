/**
  * Configurations of the express module
  */
var express = require('express'),
    bodyParser = require('body-parser'),
    consign = require('consign'),
    cookieParser = require('cookie-parser'),
    session = require('express-session'),
    passport = require('passport')
    helmet = require('helmet');

module.exports = function(port) {
  var app = express();
  // ambient configuration
  app.set('port',port);
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
  app.use(helmet());
  app.use(helmet.xframe());
  app.use(helmet.nosniff());
  app.disable('x-powered-by');
  // Works on IE9+ or Chrome
  // app.use(helmet.xssFilter());

  // loading dependencies
  consign({cwd: 'app'})
    .include('models')
    .then('controllers')
    .then('routes/auth.js')
    .then('routes')
    .into(app);

  app.get('*', function(req, res) {
    res.status(404).render('404');
  });

  return app;
}
