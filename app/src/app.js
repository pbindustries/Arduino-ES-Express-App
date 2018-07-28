var express = require('express');
var elasticsearch = require('elasticsearch');
var app = express();

var client = new elasticsearch.Client({
  host: 'localhost:9200',
  log: 'trace'
});

client.search({
  q: 'booms'
}).then(function (body) {
  var booms = body.booms.booms;
}, function (error) {
  console.trace(error.message);
});

client.indices.delete({
  index: 'test_index',
  ignore: [404]
}).then(function (body) {
  // since we told the client to ignore 404 errors, the
  // promise is resolved even if the index does not exist
  console.log('index was deleted or never existed');
}, function (error) {
  // oh no!
});

app.get('/', function (req, res) {
  res.send('Hello World!');
});

app.listen(3000, function () {
  console.log('Example app listening on port 3000!');
});
