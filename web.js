var express = require('express');

if (process.env.REDISTOGO_URL) {
    var redis = require('redis-url').connect(process.env.REDISTOGO_URL);
} else {
    var redis = require("redis").createClient();
}

var app = express.createServer(express.logger());


redis.set('foo', 'bar');
redis.get('foo', function(err, value) {
    console.log('foo is: ' + value);
});

app.get('/', function(request, response) {
    response.send('Hello World!');
});

var port = process.env.PORT || 5000;
app.listen(port, function() {
    console.log("Listening on " + port);
});
