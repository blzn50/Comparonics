angular.module('Comparonics');

function config($routeProvider){
    $routeProvider
				.when('/items/',{
            templateUrl:'partials/allItems.html',
            controller:'itemsCtrl'
				})
				.when('/api/items/:itemid/', {
						templateUrl: 'partials/item.html',
						controller:'productCtrl'
				})
        .otherwise({redirectTo:'/'})
};
angular
    .module('Comparonics')
    .config(['$routeProvider',config]);