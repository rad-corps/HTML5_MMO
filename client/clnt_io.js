//clnt_io.js

var socket = io();

//send player position
function sendPlayerPos(x_,y_) 
{
	//create string
	var posStr = x_ + ',' + y_;
	socket.emit('player pos', posStr);
}

//receive player position
socket.on('player pos', function(pos_){

	//split into x and y
	var pos = pos_.split(',');

	//move player according to x and y
	if ( !(pos[2] in window.gameLoop.players ) ) //if key does not exist. create it
	{
		var player = new Player(pos[2]);
	  	window.gameLoop.players[pos[2]] = (player);
	  	player.addToStage(window.gameLoop.stage);
	}
	        
	window.gameLoop.players[pos[2]].sprite.destination._x = parseInt(pos[0]);
	window.gameLoop.players[pos[2]].sprite.destination._y = parseInt(pos[1]);

});      

//send chat message
$('form').submit(function(){
	socket.emit('chat message', $('#m').val());
	$('#m').val('');
	return false;
});

//receive chat message
socket.on('chat message', function(msg){
	$('#messages').append($('<li>').text(msg));
});