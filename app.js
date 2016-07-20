var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var url = require('url');

var pg = require('pg');
var routes = require('./routes/index');
var users = require('./routes/users');

var params = {
  host: 'ec2-54-221-246-85.compute-1.amazonaws.com'
  ,user: 'lzcvcflzbvvwcw'
  ,password: 'nPEEpYmhuDKAOuA_RNIxfB4GI_'
  ,database: 'd41lqf8abjm58s'
  ,port: '5432'
  ,ssl: true
}

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', routes);
app.use('/users', users);

app.get('/qtLogger', function(req, res){
  var client = new pg.Client(params);
  var url_parts = url.parse(req.url, true);
  var p = url_parts.query;
  client.connect();
  var data ={
    cookieId : p.cookieId,
    value : p.value,
    cookieExpires : p.cookieExpires
  }
  client.query("INSERT INTO taglog(cookieId,value,cookieExpires) values ($1, $2, $3)",[data.cookieId,data.value,data.cookieExpires]);
  client.end();
  res.status(200);
  res.end();
});

app.get('/del', function(req, res) {
  var client = new pg.Client(params);
  var url_parts = url.parse(req.url, true);
  var p = url_parts.query;
  client.connect();
  client.query("DELETE FROM taglog");
  client.end();
  res.status(200);
  res.end();
});

app.get('/qtLoggerList', function(req, res){
  var client = new pg.Client(params);
  var url_parts = url.parse(req.url, true);
  var p = url_parts.query;
  var results= [];
  var con = client.connect();
  var data ={
    cookieId : p.cookieId,
    value : p.value,
    cookieExpires : p.cookieExpires
  }

  var query = client.query("SELECT * FROM taglog");

  // Stream results back one row at a time
  query.on('row', function(row) {
    results.push(row);
  });
  query.on('end', function() {
    client.end();
    res.render('qtLoggerList',{title: '활동 이력', rows:results});
  });
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


module.exports = app;
