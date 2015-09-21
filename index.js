var express = require('express');
var app = express();
var http = require('http').Server(app);
var io = require('socket.io')(http);

app.use('/bin', express.static('bin'));
app.use('/img', express.static('img'));

app.get('/', function(req, res){
  res.sendFile(__dirname + '/index.html');
});

io.on('connection', function(socket){
  
  //receive and broadcast chat string
  socket.on('chat message', function(msg){
    io.emit('chat message', msg);
    console.log(msg);
  });

  //receive and broadcast player pos
  socket.on('player pos', function(pos_){
  	io.emit('player pos', pos_);
  	console.log('player pos: ' + pos_)
  });

  //handle disconnection event
  socket.on('disconnect', function() {
    console.log('client disconnected');
  });

  console.log('new connection');
});

//start the webserver
http.listen(3000, function(){
  console.log('listening on *:3000');
});
