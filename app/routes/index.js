/**
  * Defining the routes for the index req
  */
module.exports = function(app) {
  app.get('/', function(req, res) {
    res.render('index', {
      'usuarioLogado': req.user.login
    });
  });
}
