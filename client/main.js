var io = require('socket.io-client');

// Array.connecting = 0;
// Array.failed = 0;
 var server = 'http://172.31.1.104/';
//var server = 'http://172.31.1.103:3000';
for(var i=0; i<8000; i++) {
 setTimeout(function2, i*10);
//function2();
}

function function2(){
 var socket = io(server, {'force new connection': true,transports: ['websocket']});
// socket.io.reconnection(false);
 socket.io.timeout(30000);
 // socket.on('connect', function() {
 //   Array.connecting++;
 //   // console.log(Array.connecting);
 // });
  socket.on('error', function(error) {
    console.error("socket err ",error);
  });
  socket.on('disconnect', function() {
    console.error("socket disconnected ");
  });
 socket.on('hi there!', function() {
   this.emit('yo');
   //console.log(socket.id+" socket is replying");
 })
}
