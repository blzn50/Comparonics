var request = require('request');
var apiOptions = {
	server: 'https://localhost:3000'
};
if(process.env.NODE_ENV === 'production') {
	apiOptions.server = 'https://immense-springs-73590.herokuapp.com'
}

var _showError = function (req, res, status) {
  var title, content;
  if (status === 404) {
    title = "404, page not found";
    content = "Oh dear. Looks like we can't find this page. Sorry.";
  } else if (status === 500) {
    title = "500, internal server error";
    content = "How embarrassing. There's a problem with our server.";
  } else {
    title = status + ", something's gone wrong";
    content = "Something, somewhere, has gone just a little bit wrong.";
  }
  res.status(status);
  res.render('generic-text', {
    title : title,
    content : content
  });
};

// render home page
/*module.exports.homepage = function(req, res) {
	res.render('layout', {title: 'Comparonics'});
};
*/
var getItemInfo = function(req, res, callback) {
	var requestOptions, path;
	path = 'api/items/' + req.params.itemid;
	requestOptions = {
		url : apiOptions.server + path,
		method : 'GET',
		json : {}
	};
	
	request(
		requestOptions,
		function(err, res, body) {
			var data = body;
			if(res.statusCode === 200) {
				//data.model = body.model;
				callback(req, res, data);
			}else {
				_showError(req, res, res.statusCode);
			}
		});
};




