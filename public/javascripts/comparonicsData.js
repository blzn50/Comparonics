angular
	.module('Comparonics')
	.service('comparonicsData', comparonicsData);

//comparonicsData.$inject = ['$http'];
function comparonicsData ($http) {
	var getItems = function() {
		return $http.get('/api/items');
	}
	
	var getItemskey = function(keyword) {
		return $http.get('/api/items/search/' + keyword);
	}
	
	var itemById = function (itemid) {
		return $http.get('/api/items/' + itemid);
	};
	
	return {
		getItems : getItems,
		getItemskey : getItemskey,
		itemById : itemById
	};
}