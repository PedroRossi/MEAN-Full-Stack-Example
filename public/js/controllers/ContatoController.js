angular.module('contatooh').controller('ContatoController',
  function($scope, $routeParams, Contato) {
    $scope.contato = {};
    $scope.mensagem = {};

    if($routeParams.id) {
      Contato.get({id: $routeParams.id},
        function(contato) {
          $scope.contato = contato;
        },
        function(error) {
          $scope.mensagem = {texto: 'Não foi possível obter o contato!'};
          console.log(error);
        }
      );
    }

    $scope.salva = function() {
      var contato = new Contato($scope.contato);
      contato.$save()
        .then(function() {
          $scope.mensagem = {texto: 'Salvo com sucesso'};
          $scope.contato = new Contato();
        })
        .catch(function(error) {
          $scope.mensagem = {texto: 'Não foi possível salvar!'};
        });
    };

    Contato.query(function(contatos) {
      $scope.contatos = contatos;
    });

  }
);
