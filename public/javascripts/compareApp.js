/*$('.searchButton').submit(function (e) {
	$('.alert.alert-danger').hide();
	if(!$('input.searchBox').val()) {
		if($('.alert.alert-danger').length) {
			$('.alert.alert-danger').show();
		} else {
			$(this).prepend('<div role="alert" class="alert alert-danger">Blah!</div>');
		}
		return false;
	}
});*/
angular
	.module('Comparonics', ['ngRoute'])
	.controller('itemsCtrl', itemsCtrl)
	.controller('productsCtrl', productsCtrl);

function itemsCtrl($scope, $http) {
	//$scope.formData = {};
	
	$http.get('/products')
		.success(function(data) {
			$scope.products = data;
			console.log(data);
	})
	.error(function(data) {
		console.log('Error: ' + data);
  });
};

function productCtrl($scope, $http) {
	$http.get('/api/items/{{product._id}}/')
		.success(function(data) {
			$scope.product = data;
			console.log(data);
	})
}
/*function productsCtrl($scope, $resource) {
	var produkts = $resource('/products');
	produkts.query(function(products){
		$scope.products = products;
	})
};*/

