var request = require('request');
var apiOptions = {
	server: 'https://localhost:3000'
};
if(process.env.NODE_ENV === 'production') {
	apiOptions.server = 'https://immense-springs-73590.herokuapp.com'
}
var Products = require('../../app_api/models/items');


// render home page
module.exports.homepage = function(req, res) {
	res.render('layout', {title: 'Comparonics'});
};

// all products
module.exports.productList = function(req, res) {
	Products
		.find()
		//.where('price').gt(500).lt(800)
		.sort('price')
		//.limit(5)
		.exec(function(err, items) {
			if(err) throw err;
			res.json(items);
		});
};
