var express = require('express');
var router = express.Router();
var ctrlItems = require('../controllers/items');
//var ctrlUsers = require('../controllers/items')

//Items
//router.get('/items', ctrlItems.afsfdsf);
router.post('/items', ctrlItems.itemsCreate);
router.get('/items/:itemid', ctrlItems.itemsReadOne);
router.put('/items/:itemid', ctrlItems.itemsUpdateOne);
router.delete('/items/:itemid', ctrlItems.itemsDeleteOne);
//router.get('*', ctrlItems.singlePage);
//users


module.exports = router;