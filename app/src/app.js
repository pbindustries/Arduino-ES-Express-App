var express = require('express');
var elasticsearch = require('elasticsearch');
var app = express();
// var Serial = ;
let output = 0;
let value;

var setup = (fun => {
  Serial.begin(57600);
  pinMode(output, INPUT);
});
var loop = (fun => {
  value = analogRead(output),
    Serial.print("Put Sensor Output Value Here: ");
  Serial.println(value);
});

var client = new elasticsearch.Client({
  host: 'localhost:9200',
  log: 'trace'
});

client.search({
  _cat: 'indices'
}).then(function (body) {
  var arduino = body.arduino.functions;
}, function (error) {
  console.trace(error.message);
});

client.indices.delete({
  index: 'arduino_index',
  ignore: [404]
}).then(function (body) {
  console.log('Index was deleted or never existed');
}, function (error) {
  console.log('! ERROR - Somthing is wrong :( !')
});

app.get('/', function (req, res) {
  res.send('Well hello there ;)');
});

app.listen(4000, function () {
  console.log('Getting down on port 4000!');
});
