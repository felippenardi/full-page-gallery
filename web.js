var express = require('express');
var redis = require('redis-url').connect(process.env.REDISTOGO_URL);
var app = express.createServer(express.logger());

app.get('/', function(request, response) {
    response.send('Hello World!');
});

redis.set('foo', 'bar');

redis.get('foo', function(err, value) {
    console.log('foo is: ' + value);
});

var port = process.env.PORT || 5000;
app.listen(port, function() {
    console.log("Listening on " + port);
});
