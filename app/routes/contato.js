/**
  * Controla as rotas de acesso para contatos
  */

function isLogged(req, res, next) {
  if (req.isAuthenticated()) {
    return next();
  } else {
    res.status(401).json('Não autorizado');
  }
}

module.exports = function(app) {
  var controller = app.controllers.contato;

  app.route('/contatos')
    .get(isLogged, controller.listaContatos)
    .post(isLogged, controller.salvaContato);

  app.route('/contatos/:id')
    .get(isLogged, controller.obtemContato)
    .delete(isLogged, controller.removeContato);
};
