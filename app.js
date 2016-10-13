var express = require('express');
var path = require('path');
//var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
require('./app_api/models/db');
var AWS = require('aws-sdk');
var fs = require('fs');

var s3 = new AWS.S3();
s3.listBuckets(function(err, data) {
  if (err) { console.log("Error:", err); }
  else {
    for (var index in data.Buckets) {
      var bucket = data.Buckets[index];
      console.log("Bucket: ", bucket.Name, ' : ', bucket.CreationDate);
    }
  }
});

var s3Bucket = new AWS.S3( { params: {Bucket: 'comparonics'} } )


/*var params = {Bucket: 'comparonics'};
s3Bucket.listObjects(params, function(err, data) {
	var bucketContents = data.Contents;
    for (var i = 0; i < bucketContents.length; i++){
      var urlParams = {Bucket: 'comparonics', Key: bucketContents[i].Key};
        s3.getSignedUrl('getObject',urlParams, function(err, url){
          console.log('the url of the image is', url);
        });
    }

});*/
/*
s3Bucket.getSignedUrl('getObject', urlParams, function(err, url){
  console.log('the url of the image is', url);
})*/


var routes = require('./app_server/routes/index');
//var users = require('./app_server/routes/users');
var routesApi = require('./app_api/routes/index');

var app = express();

// view engine setup
//app.engine('html', require('jade').renderFile);
app.set('views', path.join(__dirname, 'app_server', 'views'));
app.set('view engine', 'jade');


// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(require('express-session')({
    secret: 'keyboard cat',
    resave: false,
    saveUninitialized: false
}));
app.use(express.static(path.join(__dirname, 'public')));

//app.use('/', routes);
app.use('/api', routesApi);
//app.use('/users', users);

app.use(function(req, res) {
	res.sendFile(path.join(__dirname, 'public', 'partials', 'index.html'));
});


// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handlers

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
  app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    res.render('error', {
      message: err.message,
      error: err
    });
  });
}

// production error handler
// no stacktraces leaked to user
app.use(function(err, req, res, next) {
  res.status(err.status || 500);
  res.render('error', {
    message: err.message,
    error: {}
  });
});

/*app.listen(3000, function() {
	console.log('Running');
}) */
module.exports = app;
