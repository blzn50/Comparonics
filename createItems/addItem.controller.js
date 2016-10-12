angular
	.module('Comparonics')
	.controller('addItemCtrl', addItemCtrl)

function addItemCtrl(postItem) {
	var vm = this;

	vm.save = function() {
		postItem.addItem(vm.item)	
			.success(function (data, status, headers) {
				/*vm.data = { brand : vm.item.brand,
							type: vm.item.type,
							model: vm.item.model,
							price: vm.item.price,
							storeName: vm.item.storeName,
							keywords: vm.item.keywords };*/	
				alert('Item added!');
			});
	}

};