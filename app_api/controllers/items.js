var mongoose = require('mongoose');
var Produkts = require('../models/items');
//var Produckts = mongoose.model('Product');

var sendJsonResponse = function(res, status, content) {
	res.status(status);
	res.json(content);
}


module.exports.itemsCreate = function(req, res) {
	//sendJsonResponse(res, 200, { 'status': 'success'});
	Promise(res, rej) {
		Produckts.create({
		brand: req.body.brand,
		type: req.body.type,
		model: req.body.model,
		price: req.body.price,
		storeName: req.body.storeName
	}, function(err, item) {
		if(err) {
			sendJsonResponse(res, 400, err);
		} else {
			sendJsonResponse(res, 201, item);
		}
	});
	}
};

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

module.exports.itemsUpdateOne = function(req, res) {
	if(!req.params.itemid) {
		sendJsonResponse(res, 404, {
			'message': 'Not found, itemid is required'
		});
		return;
	}
	Produckts
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

module.exports.itemsDeleteOne = function(req, res) {
	var itemid = req.params.itemid;
	if(itemid) {
		Produckts
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

//fetching input from user
module.exports.getSearch = function(req, res) {
	var searchText = req.query.search;
	if(!searchText){
        sendJSONresponse(res,404,{
            "message": "please provide  a valid query"
        });
        return;
    }else{
   
        Produkts
				.find({"keywords": new RegExp(searchText)})
        .exec(function(err,result){
            if(err){
              console.log(err);
              reject(sendJSONresponse(res,404,{
               	"message": "product not found"
              }));
                
            }else{ 
							console.log(result);
            	sendJSONresponse(res,200,result);
            }
        });
				 
    }
};


module.exports.searchItem = function (req, res) {
    var searchText = req.query.search;
    if(!searchText){
        sendJSONresponse(res,404,{
            "message": "please provide  a valid query"
        });
        return;
    }else{
   
        new Promise(function(resolve,reject){
        products.find({"keywords": new RegExp(searchText)})
        .exec(function(err,result){
            if(err){
                console.log(err);
               reject(sendJSONresponse(res,404,{
                   
               "message": "product not found"
               }));
                
            }else{
                resolve(result);
            }
        });
         }).then(function(result){
            console.log(result);
            sendJSONresponse(res,200,result);
        }); 
    }
  
};