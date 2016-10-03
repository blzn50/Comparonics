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
	.module('Comparonics', ['ngResource','ngRoute'])
	.controller('itemsCtrl', itemsCtrl)
	.controller('productCtrl', productCtrl);


function itemsCtrl($scope, $resource) {
	//$scope.formData = {};
	var Products = $resource('/products');
	Products.query(function(products){
		$scope.products = products;
	})
	
	/*$http.get('/products')
		.success(function(data) {
			$scope.products = data;
			console.log(data);
	})
	.error(function(data) {
		console.log('Error: ' + data);
  });*/
};

function productCtrl($scope, $resource, $location, $routeParams) {
	var Item = $resource('/api/items/:itemid',{itemid: '@_id'});
	Item.query({id: $routeParams.itemid}, function(item){
		$scope.item = item;
	})
	
		/*.success(function(data) {
			$scope.product = data;
			console.log(data);
	})*/
}

/*function productsCtrl($scope, $resource) {
	var produkts = $resource('/products');
	produkts.query(function(products){
		$scope.products = products;
	})
};*/

