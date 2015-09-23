function GameLoop()
{
  console.log('GameLoop constructor');
  var self = this;

  //update loop
  self.animate = function()
  {
    //move player towards destination
    for ( p in self.players )
    {
      var position = vector2.create(self.players[p].sprite.position.x, self.players[p].sprite.position.y);
      //console.log('position1' + position.toString() );
      var direction = self.players[p].sprite.destination.subtract(position);
      direction.normalise();
      position.addTo(direction);
      //console.log('position2' + position.toString() );

      self.players[p].sprite.position.x = position._x;
      self.players[p].sprite.position.y = position._y;
      self.players[p].update();
    }        

    //render then ask for another animation frame
    self.renderer.render(self.stage);    
    requestAnimationFrame(self.animate);
  }

  //create the renderer 
  self.renderer = new PIXI.WebGLRenderer(800, 600);//autoDetectRenderer(800, 600);

  //add it to the DOM body
  document.body.appendChild(self.renderer.view);

  //create a stage (all sprites added to this)
  self.stage = new PIXI.Container();

  //mouse and touch event for the bg sprite
  self.backgroundMouseDown = function(event_) {
    //send the data to the server
    sendPlayerPos(event_.data.global.x, event_.data.global.y);
  }

  //create a background sprite
  self.bgSprite = PIXI.Sprite.fromImage("./img/bg.jpg");
  self.bgSprite.position.set(0,0);
  self.bgSprite.interactive = true;

  //register mouse and touch events for the bg sprite
  self.bgSprite.on('mousedown', self.backgroundMouseDown);
  self.bgSprite.on('touchstart', self.backgroundMouseDown);

  self.stage.addChild(self.bgSprite);

  //create a player sprite and pop him in the middle
  self.players = [];
  self.players[socket.io.engine.id] = new Player(socket.io.engine.id);
  self.players[socket.io.engine.id].addToStage(self.stage);

  requestAnimationFrame( this.animate );
}