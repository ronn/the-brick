var app = angular.module("buscarMaquinariaApp", [])
app.controller("buscarMaquinariaController", function($scope, $q, $http){

	toastr.success('Datos ingresados correctamente!');
	toastr.info('Esto es importante saberlo');
	toastr.warning('Atención, si lo rompes lo pagas');
	toastr.error('Ha ocurrido un error inesperado');

	$scope.mostrar = false;
	var id = $scope.id;
	$scope.maquinaria = {
		};

	$scope.limpiar = function(){
		$scope.maquinaria = {
		};
		$scope.mostrar = false;
		$scope.id = "";

	}

	$scope.imprimir =  function() {
		findById($scope.id).then(function(response){
			switch(response.status){
				case 200:
					$scope.mostrar = true;
					$scope.maquinaria = response.data;
					console.log(response.data);
					break;
				case 204:
					alert("No existen registros con este código");
					$scope.mostrar = false;
					break;
				default:
					toastr.error('Are you the 6 fingered man?');
					$scope.mostrar = false;
					break;
			}
		});
	}

	$scope.eliminar = function(){
		deleteMaquinaria($scope.id).then(function(response){
			switch(response.status){
				case 200:
					alert("El registro fue eliminado");
					$scope.mostrar = false;
					$scope.id = "";
					break;
				default:
					alert("No se pudo eliminar el registro");
					break;
			}
		});
	}

	function deleteMaquinaria(id){
		var deferred = $q.defer();
	    $http({
	      method: 'DELETE',
	      url: 'http://localhost/api/maquinaria/' + id,
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

	function findById(id){
		var deferred = $q.defer();
	    $http({
	      method: 'GET',
	      url: 'http://localhost/api/maquinaria/' + id,
	      headers: {
	        'Content-Type': 'application/json'
	      }
	    }).then(function(response) {
	      deferred.resolve(response);
	    }, function(error) {
	      deferred.reject(error);
	      toastr.success('No se puede conectar con el server');
	    });
	    return deferred.promise;
	}

	$scope.modificar = function(){
		if($scope.maquinaria.idManipulador == 0){
			$scope.maquinaria.idManipulador = null;
		}
		update($scope.id).then(function(response){
			switch(response.status){
				case 200:
					alert("El registro fupe modificado");
					break;
				default:
					alert("Algo salió mal :(");
					break;
			}
		});
	}

	function update(id){
		var deferred = $q.defer();
	    $http({
	      method: 'PUT',
	      url: 'http://localhost/api/maquinaria/' + id,
	      headers: {
	        'Content-Type': 'application/json'
	      },
	      data: $scope.maquinaria
	    }).then(function(response) {
	      deferred.resolve(response);
	    }, function(error) {
	      deferred.reject(error);
	    });
	    return deferred.promise;
	}
});
