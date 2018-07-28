const SerialPort = require('serialport'),
  WebSocket = require('ws'),
  os = require('os');

var express = require('express'),
  app = express(),
  http = require('http').Server(app),
  elasticsearch = require('elasticsearch');
  opn = require('opn'),
  program = require('commander'),
  wss = {},
  visualizer = "";
 
// Include static files
app.use(express.static(__dirname + '/public'));


// - - - - - - - - ARDUINO - START - - - - - - - - - - - - - - - - - - - - - - - -

// Use commander to 
program
  .version('1.7.1')
  .option('-p, --port 9090', 'Specify serial port')
  .option('-b, --baud <b>', 'Specify baud rate for serial connection', parseInt)
  .option('-v, --visualizer <v>', 'Specify visualizer')
  .option('-d, --delimiter <d>', 'Specify delimiter character')
  .parse(process.argv);

if (typeof program.visualizer === 'undefined') {
  visualizer = "public/arduino/error.html";
} else if (program.visualizer === 'sensor') {
  visualizer = "public/arduino/arduino.html";
} else if (program.visualizer === 'elastic') {
  visualizer = "public/elastic/elastic.html";
}

opn(__dirname + visualizer);


if (typeof program.baud === 'undefined') {
  program.baud = 9600; //default to 9600 baud
}
if (typeof program.delimite === 'undefined') {
  program.delimiter = '\r\n'; //default to \r\n newline character (from Serial.println())
}

wss = new WebSocket.Server({
  host: '127.0.0.1',
  port: 8080
});

wss.on('connection', function (connection) {
  console.log("WebSocket connection established.");
  connection.send(9.99);
  if (wss.clients.size === 1) {
    initArduinoConnection();
  }
});

wss.broadcast = function broadcast(data) {
  wss.clients.forEach(function sendData(client) {
    if (client.readyState === 1) {
      try {
        client.send(data);
      } catch (err) {
        console.log(err);
      }
    } else {
      client.terminate();
    }
  });
};

var streamFromSerial = function streamFromSerial(portName) {

  var Arduino = new SerialPort(portName, {
    parser: SerialPort.parsers.readline(program.delimiter),
    baudRate: program.baud
  });

  Arduino.on('open', function () {
    console.log("Port " + portName + " opened.");
  });

  Arduino.on('data', function (data) {
    wss.broadcast(data.toString());
  });

  Arduino.on('error', function (err) {
    console.log(err);
  });
}

function initArduinoConnection() {

  if (typeof program.port !== 'undefined') {
    streamFromSerial(program.port);
  } else {
    SerialPort.list(function (err, ports) {
      ports.forEach(function (port) {
        if (port.manufacturer && port.manufacturer.indexOf("Arduino") !== -1) { //connect to the first device we see that has "Arduino" in the manufacturer name
          streamFromSerial(port.comName);
        }
      });
    });
  }
}
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