angular.module('contatooh').controller('ContatosController',
  function($scope, Contato) {
    $scope.contatos = [];
    $scope.filtro = '';

    function buscaContatos() {
      Contato.query(
        function(contatos) {
          $scope.contatos = contatos;
        },
        function(error) {
          console.log(error);
        }
      );
    }

    $scope.remove = function(contato) {
      Contato.delete({id: contato._id},
        buscaContatos,
        function(error) {
          console.log(contato);
          console.log(error);
        }
      );
    };

    $scope.init = function() {
      buscaContatos();
    };
    $scope.init();
  }
);
