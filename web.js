/**
 * Module dependencies.
 */

var express = require('express'),
    routes = require('./routes');

var app = module.exports = express.createServer();

// Configuration

app.configure(function(){
  app.set('views', __dirname + '/app/views');
  app.set('view engine', 'jade');
  app.set('view options', {
    layout: false
  });
  app.use(express.bodyParser());
  app.use(express.methodOverride());
  app.use(express.static(__dirname + '/app/'));
  app.use(app.router);
});


app.configure('development', function(){
  app.use(express.errorHandler({ dumpExceptions: true, showStack: true }));
});

app.configure('production', function(){
  app.use(express.errorHandler());
});

// Redis configuration

if (process.env.REDISTOGO_URL) {
    var redis = require('redis-url').connect(process.env.REDISTOGO_URL);
} else {
    var redis = require("redis").createClient();
}

// redis test

//redis.set('foo', 'bar');
redis.get('foo', function(err, value) {
    console.log('foo is: ' + value);
});

// Routes

app.get('/', routes.index);
app.get('/partials/:name', routes.partials);

// redirect all others to the index (HTML5 history)
app.get('*', routes.index);

// Start server

var port = process.env.PORT || 5000;
app.listen(port, function() {
    console.log("Listening on " + port);
});


