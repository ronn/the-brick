var app = angular.module("crearMaquinariaApp", [])
app.controller("crearMaquinariaController", function($scope, $q, $http){
	var data = $scope.maquinaria = {
	};

	$scope.imprimir = function imprimir() {
		createMaquinaria(data).then(function(response){
			switch(response.status){
				case 201:
					alert("El registro se guardó satisfactoriamente");
					$scope.maquinaria = {
					};
					break;
				default:
					alert("Algo salió mal: " + response.status);
					break;
			}
		});
	}

	function createMaquinaria (data){
		var deferred = $q.defer();
	    $http({
	      method: 'POST',
	      url: 'http://localhost/api/maquinaria',
	      data: data,
	      headers: {
	        'Content-Type': 'application/json'
	      }
	    }).then(function(response) {
	      deferred.resolve(response);
	    }, function(error) {
	      deferred.reject(error);
	    });
	    return deferred.promise;
	}
});
