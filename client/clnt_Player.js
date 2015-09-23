//Player.js

function Player(id_)
{
  var self = this;
  self.id = id_;
  self.sprite = PIXI.Sprite.fromImage("./img/player.png");
  self.sprite.position.set(400,300);
  self.sprite.destination = vector2.create(300, 200);

  //socket id @ (only for testing)
  //socket.io.engine.id
  self.socketText = new PIXI.Text(self.id, scoreFontStyle);

  self.addToStage = function(stage_)
  {
    stage_.addChild(self.sprite);
    stage_.addChild(self.socketText);
  }

  self.update = function()
  {
    self.socketText.position.set(self.sprite.position.x - 100, self.sprite.position.y - 20);
  }
}