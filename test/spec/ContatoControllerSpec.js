describe("ContatoController", function() {

  var $scope, $httpBackend;

  beforeEach(function() {
    module('contatooh');
    inject(function($injector, _$httpBackend_) {
      $scope = $injector.get('$rootScope').$new();
      $httpBackend = _$httpBackend_;
      $httpBackend.when('GET', '/contatos/1')
                        .respond({id: '1'});
    });
  });

  it("Deve criar um Contato vazio quando nenhum parametro for passado",
    inject(function($controller) {
      $controller('ContatoController',
                  {
                    '$routeParams': {id: 1},
                    '$scope': $scope
                  });
      expect($scope.contato._id).toBeUndefined();
    }));

});
