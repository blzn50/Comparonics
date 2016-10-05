angular
	.module('Comparonics')
	.service('comparonicsData', comparonicsData);

comparonicsData.$inject = ['$http'];
function comparonicsData ($http) {
	
	var itemById = function (itemid) {
		return $http.get('/api/items/' + itemid);
	};
	
	return {
		itemById : itemById
	};
}