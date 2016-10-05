var express = require('express');
var router = express.Router();
//var ctrlHome = require('../controllers/items');
var ctrlItems = require('../controllers/items');
//var ctrlSearch = require('../controllers/items');


/* GET home page. */
router.get('/', ctrlItems.homepage);
router.get('/products', ctrlItems.productList);
//router.get('/searchResult', ctrlSearch.getSearch);

module.exports = router;
