angular
	.module('Comparonics')
	.controller('itemsCtrl', itemsCtrl)

itemsCtrl.$inject = ['$http'];
function itemsCtrl($http) {
	var vm =this;
	$http.get('/products')
	.success(function(data) {
		vm.data = data;
	});
			
	/*$http.get('/products')
		.success(function(data) {
			$scope.products = data;
			console.log(data);
	})
	.error(function(data) {
		console.log('Error: ' + data);
  });*/
};

