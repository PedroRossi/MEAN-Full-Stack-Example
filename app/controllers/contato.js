var sanitize = require('mongo-sanitize');
/**
 * Controlador de contatos
 */
module.exports = function(app) {

  var Contato = app.models.contato;

  var controller = {};
  controller.listaContatos = function(req, res) {
    Contato.find({}, function(error, contatos) {
      if(error) {
        console.log(error);
        res.status(500).json(error);
      } else {
        res.json(contatos);
      }
    }).populate('emergencia');
  };
  controller.obtemContato = function(req, res) {
    var _id = req.params.id;
    Contato.findById(_id, function(error, contato) {
      if(contato && !error) {
        res.json(contato);
      } else {
        console.log(error);
        res.status(404).json(error);
      }
    });
  };
  controller.removeContato = function(req, res) {
    var _id = sanitize(req.params.id);
    Contato.remove({'_id':_id}, function(error, contato) {
      if(error) {
        console.error(error);
      } else {
        res.end();
      }
    });
  };
  controller.salvaContato = function(req, res) {
    var _id = req.body._id;
    var dados = {
      'nome': req.body.nome,
      'email': req.body.email,
      'emergencia': req.body.emergencia || null
    };
    if(_id) {
      Contato.findByIdAndUpdate(id,dados,{},function(error, contato) {
        if(error) {
          // console.log(error);
          res.status(500).json(error);
        }
        res.status(201).json(contato);
      });
    } else {
      Contato.create(dados, function(error, contato) {
        if(error) {
          console.log(error);
          res.status(500).json(error);
        } else {
          res.status(201).json(contato);
        }
      });
    }
  };
  return controller;
}
