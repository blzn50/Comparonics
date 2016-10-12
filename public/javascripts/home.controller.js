angular
	.module('Comparonics')
	.controller('homeCtrl', homeCtrl);


function homeCtrl(comparonicsData) {
	var vm = this;
	vm.comparonicsData = comparonicsData;
  vm.keyword = '';
	
  vm.search = function(keyword) {
    vm.comparonicsData.getItemskey(keyword)
      .success(function(data) {

				vm.data = { items : data };
				console.log(vm.data);
      })
      .error(function(data) {
        console.log('Error: ' + data);
      });
  }
	vm.pageHeader = {
		title: 'Comparonics'
	};
};