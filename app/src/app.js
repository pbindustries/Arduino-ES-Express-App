var express = require('express'),
  app = express(),
  http = require('http').Server(app),
  io = require('socket.io')(http),
  elasticsearch = require('elasticsearch');

// Include static files
app.use(express.static(__dirname + '/public'));


// - - - - - - - - ARDUINO - START - - - - - - - - - - - - - - - - - - - - - - - -
// var setup = (fun => {
//   Serial.begin(57600);
//   pinMode(output, INPUT);
// });

// var loop = (fun => {
//   value = analogRead(output);
//   Serial.print("Put Sensor Output Value Here: ");
//   Serial.println(value);
// });

// io.on('connection', function (socket) {
//   socket.on('data', function (msg) {
//     board.emit('data', msg);
//   });
// });
// - - - - - - - - ARDUINO - END - - - - - - - - - - - - - - - - - - - - - - - -



// - - - - - - - - ELASTICSEARCH - START - - - - - - - - - - - - - - - - - - - - - - - -
// var client = new elasticsearch.Client({
//   host: 'localhost:9200',
//   log: 'trace'
// });

// client.search({
//   _cat: 'indices'
// }).then(function (body) {
//   var arduino = body.arduino.functions;
// }, function (error) {
//   console.trace(error.message);
// });

// client.indices.delete({
//   index: 'arduino_index',
//   ignore: [404]
// }).then(function (body) {
//   console.log('Index was deleted or never existed');
// }, function (error) {
//   console.log('! ERROR - Somthing is wrong :( !')
// });
// - - - - - - - - ELASTICSEARCH - END - - - - - - - - - - - - - - - - - - - - - - - -


app.get('/', function (req, res) {
  res.send('Well hello there ;)');
});

http.listen(5000, function () {
  console.log('listening on *:5000');
});