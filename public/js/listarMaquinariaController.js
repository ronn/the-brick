var app = angular.module("listarMaquinariaApp", [])
app.controller('listarMaquinariaController', function($scope, $q, $http){
	
	getAllMaquinaria().then(function(response){
		switch(response.status){
			case 200:
				$scope.maquinas = response.data.maquinaria;
				console.log($scope.maquinas);
				break;
			default:
				alert("Algo falló: " + response.status);
				break;
		}
	});

	function getAllMaquinaria(){
		var deferred = $q.defer();
	    $http({
	      method: 'GET',
	      url: 'http://localhost/api/maquinaria',
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