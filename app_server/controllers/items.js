var request = require('request');
var apiOptions = {
	server: 'https://localhost:3000'
};
if(process.env.NODE_ENV === 'production') {
	apiOptions.server = 'https://immense-springs-73590.herokuapp.com'
}
var Products = require('../../app_api/models/items');

//homepage function
var renderHomepage = function(req, res) {
	res.render('layout');
	res.sendFile('./public/partials/index.html');
};

/* home page */
module.exports.homepage = function(req, res) {
	renderHomepage(req, res);
};


//fetching input from user
module.exports.getSearch = function(req, res) {
	console.log(req.body.name);
	res.render('searchResult');
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


//cheapSite
/*module.exports.cheapSiteList = function(req, res) {
	models.cheapSite.find({}, function(err, cheapSite) {
		if(err) throw err;
		
		res.json(cheapSite);
	});
};*/
