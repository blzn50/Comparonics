angular
	.module('Comparonics')
	.service('postItem', postItem);

function postItem($http){
	
	var addItem = function(formData) {
		return $http.post('/api/items', formData);
		}
	
	return {
		addItem: addItem
	};
};