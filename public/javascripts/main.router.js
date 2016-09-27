angular.module('Comparonics');

function config($routeProvider){
    $routeProvider
        .when('/',{
            templateUrl:'partials/try.html',
            controller:'itemsCtrl'
            //controllerAs:'vm'
    		})
				.when('/api/items/:itemid', {
						templateUrl: 'partials/item.html',
						controller:'productCtrl'
				})
        .otherwise({redirectTo:'/'})
};
angular
    .module('Comparonics')
    .config(['$routeProvider',config]);