var express = require('express');
var app = express();
var http = require('http').Server(app);
var io = require('socket.io')(http);

io.set('transports', ['websocket']);

function currentTimeInMS() {
  return (new Date()).getTime();
}

var sofar = 0;
var count = 0;

io.on('connection', function(socket){
  console.log('Client count:', io.engine.clientsCount);
  socket.on('disconnect', function() {
    console.log('Client count:', io.engine.clientsCount);
  });
  socket.emit('hi there!');
  socket.on('yo', function() {
    socket.current = currentTimeInMS();
    if(socket.prev) {
      var lat = socket.current - socket.prev;
      count++;
      sofar = sofar + lat * lat;
      console.log('Client count:', io.engine.clientsCount,
                  'id:', socket.id,
                  'Lat:', lat,
                 'AvgLat:', Math.sqrt(sofar/count));
    }
    socket.prev = socket.current;
    socket.emit('hi there!');
  });
});


app.get('/ping', function (req, res) {
  res.send('Hello World!');
});

http.listen(3000, function(){
  console.log('Server listening on *:3000');
});
