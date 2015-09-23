var express = require('express');
var app = express();
var http = require('http').Server(app);
var io = require('socket.io')(http);
var players = [];

//need these two lines to serve files from /bin and /img directories
app.use('/client', express.static('client'));
app.use('/bin', express.static('bin'));
app.use('/img', express.static('img'));

//serve the index.html file to the client
app.get('/', function(req, res){
  res.sendFile(__dirname + '/client/clnt_index.html');
});

//setup events on connection
io.on('connection', function(socket){
  
  //receive and broadcast chat string
  socket.on('chat message', function(msg){
    io.emit('chat message', msg);
    console.log(msg);
  });

  //receive and broadcast player pos
  socket.on('player pos', function(pos_){
    pos_ += ',' + socket.id;
  	io.emit('player pos', pos_);
  	console.log('player pos: ' + pos_)
  });

  //handle disconnection event
  socket.on('disconnect', function() {
    console.log('client disconnected');
  });

  //log new connections in server console
  console.log('new connection ' + socket.id);
  
  //create a javascript object for the player and add it to the array
  var player = socket.id;
  players.push(player);
  console.log(players.toString());

});

//start the webserver
http.listen(3000, function(){
  console.log('listening on *:3000');
});
