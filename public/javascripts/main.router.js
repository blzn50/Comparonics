angular.module('Comparonics', ['ngResource','ngRoute']);

function config($routeProvider, $locationProvider) {
    $routeProvider
				.when('/',{
						templateUrl: 'partials/index.html',
						controller:'homeCtrl',
						controllerAs: 'vm'
				})
				.when('/items',{
            templateUrl:'partials/allItems.html',
            controller:'itemsCtrl',
						controllerAs: 'vm'
				})
				.when('/:itemid', {
						templateUrl: 'partials/item.html',
						controller:'productCtrl',
						controllerAs: 'vm'
				})
        .otherwise({redirectTo:'/'});
	
		$locationProvider.html5Mode({
			enabled: true,
			requireBase: false
		});
		
};
angular
    .module('Comparonics')
    .config(['$routeProvider', '$locationProvider',config])
		