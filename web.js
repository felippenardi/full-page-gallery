var express = require('express');
var app = express.createServer(express.logger());

//app.configure(function() {
    //app.set('views', __dirname + 'views');
    //app.set('view engine', 'jade');
    //app.set('view options', {
        //'layout': false
    //});
    //app.use(express.bodyParser());
    //app.use(express.methodOverride());
    //app.use(express.static(__dirname + '/public'));
    //app.use(app.router);
//});

app.configure('development', function(){
    app.use(express.errorHandler({ dumpExceptions: true, showStack: true }));
});

app.configure('production', function(){
    app.use(express.errorHandler());
});

if (process.env.REDISTOGO_URL) {
    var redis = require('redis-url').connect(process.env.REDISTOGO_URL);
} else {
    var redis = require("redis").createClient();
}

// Redis test

//redis.set('foo', 'bar');
redis.get('foo', function(err, value) {
    console.log('foo is: ' + value);
});

// Routes
// define static files somewhere on top
app.get('/', function(request, response) {
    response.sendfile("views/index.html");
});

var port = process.env.PORT || 5000;
app.listen(port, function() {
    console.log("Listening on " + port);
});
