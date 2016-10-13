var mongoose = require('mongoose');
var Produkts = require('../models/items');
//var Produckts = mongoose.model('Product');

var sendJsonResponse = function(res, status, content) {
	res.status(status);
	res.json(content);
}

/* Listing items */
module.exports.productList = function(req, res) {
	Produkts
		.find()
		//.where('price').gt(500).lt(800)
		.sort('price')
		.exec(function(err, items) {
			if(err) {
				sendJsonResponse(res, 400, err);
			} else {
				sendJsonResponse(res, 200, items);
			}
		});
};

/* POST a new item */
/* /api/items */
module.exports.itemsCreate = function(req, res) {
	Produkts
		.create({
		brand: req.body.brand,
		type: req.body.type,
		model: req.body.model,
		price: req.body.price,
		storeName: req.body.storeName,
		keywords: req.body.keywords
	}, function(err, item) {
		if(err) {
			sendJsonResponse(res, 400, err);
		} else {
			sendJsonResponse(res, 201, item);
		}
	});
};

/* GET an item by id */
module.exports.itemsReadOne = function(req, res) {
	if (req.params && req.params.itemid) {
		Produkts
			.findById(req.params.itemid)
			.exec(function(err, item) {
				if (!item) {	
					sendJsonResponse(res, 404, {
						"message": "itemid not found"});
					return;
				} else if (err) {
					sendJsonResponse(res, 404, err);
					return;
				}
				sendJsonResponse(res, 200, item);
			});
	} else {
		sendJsonResponse(res, 404, {
			"message": "No itemid in request"
		});
	}
};

/* PUT /api/items/:itemid */
module.exports.itemsUpdateOne = function(req, res) {
	if(!req.params.itemid) {
		sendJsonResponse(res, 404, {
			'message': 'Not found, itemid is required'
		});
		return;
	}
	Produkts
	.findById(req.params.itemid)
	.exec(
		function(err, item) {
			if(!item) {
				sendJsonResponse(res, 404, {
					'message': 'itemid not found'
				});
				return;
			}else if(err) {
				sendJsonResponse(res, 400, err);
				return;
			}
			item.brand = req.body.brand;
			item.type = req.body.type;
			item.model = req.body.model;
			item.price = req.body.price;
			item.storeName = req.body.storeName;
			item.save(function(err, item) {
				if(err) {
					sendJsonResponse(res, 404, err);
				} else {
					sendJsonResponse(res, 200, item);
				}
			});
		}
	);
};

/* DELETE /api/items/:itemid */
module.exports.itemsDeleteOne = function(req, res) {
	var itemid = req.params.itemid;
	if(itemid) {
		Produkts
		.findByIdAndRemove(itemid)
		.exec(
			function(err, item) {
				if(err) {
					sendJsonResponse(res, 404, err);
					return;
				}
				sendJsonResponse(res, 204, null);
			}
		);
	} else {
		sendJsonResponse(res, 404, {
			'message': 'Itemid not found'
		});
	}
};

/* fetching input from user */
module.exports.getSearch = function(req, res) {
	var searchText = req.params.keyword;
	console.log("searchText",searchText);
		Produkts
			.find({ "keywords" : new RegExp(searchText)})
			.sort('price')
			.exec(function(err, items) {
				if(err) {
					sendJsonResponse(res, 400, err);
				} else {
					sendJsonResponse(res, 200, items);
				}
			});
};
