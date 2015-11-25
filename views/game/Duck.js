// ====
// Duck
// ====

"use strict";

/* jshint browser: true, devel: true, globalstrict: true */

/*
0        1         2         3         4         5         6         7         8
12345678901234567890123456789012345678901234567890123456789012345678901234567890
*/


// A generic contructor which accepts an arbitrary descriptor object
function Duck(descr) {

    // Common inherited setup logic from Entity
    this.setup(descr);

    this.negOrPosVelX = Math.floor(util.randRange(0, 2));

    this.randomisePosition();
    if(g_redCounter<0) {
      this.randomiseUpFlightOfARedDuckie();
      g_redCounter = 100000;
    }
    else {
      this.randomiseUpFlight();
      this.scale  = util.randRange(0.5,2);
      this.randomiseColor();
    }
    // Default sprite and scale, if not otherwise specified
    this.sprite = this.sprite || g_sprites.Duck;


    this.flightUpCounter = util.randRange(25, 40);

    this.isDead = false;


    this.deathAnimationCounter = 15;

    this.DuckType;

    this.initAnimation();


};

Duck.prototype = new Entity();

Duck.prototype.initAnimation = function () {
    this.spritesheet = new SpriteSheet(this.path, this.framewidth, this.frameheight);
    this.flying = new Animation(this.spritesheet, this.framerate, this.startframe, this.endframe);
};

Duck.prototype.randomisePosition = function () {
    // Duck randomisation defaults (if nothing otherwise specified)
    var marginForStartPosition = 100;
    this.cx = this.cx || util.randRange(0 + marginForStartPosition,g_canvas.width - marginForStartPosition);
};

Duck.prototype.randomiseColor = function () {
    // Duck randomisation defaults (if nothing otherwise specified)
    var oneTwoOrThree = Math.floor(util.randRange(1, 3));
    if(g_dogWalkingCounter > 299) {
      this.framewidth = 60;
      this.frameheight = 55;
      this.path = "ssdogwalk.png";
      this.scale = 2;
      this.cx = 50;
      this.cy = 550;
      g_dogWalkingCounter = 299;
      this.framerate = 25;
      this.startframe = 0;
      this.endframe = 7;
      this.velX = 1;
      this.velY = 0;
      this.DuckType = "dog";
      return;
    }
    switch(oneTwoOrThree) {
      case 1:
        this.framewidth = 40;
        this.frameheight = 37.5;
        this.DuckType = "blue";
        this.path = "ssblue.png";
        this.cy = g_canvas.height - 130;
        break;
      case 2:
        this.framewidth = 40;
        this.frameheight = 37.5;
        this.DuckType = "black";
        this.path = "ssblack.png";
        this.cy = g_canvas.height - 130;
        break;
    }

};

Duck.prototype.randomiseUpFlightOfARedDuckie = function () {
    var marginForStartPosition = 100;
    this.cx = this.cx || util.randRange(0 + marginForStartPosition,g_canvas.width - marginForStartPosition);
    this.startframe = 6;
    this.endframe = 8;
    this.path = "ssred.png";
    this.DuckType = "red";
    this.velY = -util.randRange(2,4);
    this.velX = 0;
    this.cy = g_canvas.height - 130;
    this.scale = 0.5;
    this.framerate = Math.abs(Math.floor(10/this.velY));
    this.framewidth=40;
    this.frameheight=37.5;
};


Duck.prototype.randomiseUpFlight = function () {

    if(this.DuckType === "dog") {
      this.velX = 1;
      this.velY = 0;
      this.scale = 2;
      this.cy = 550;
      return;
    }
    this.velY = -util.randRange(1,4);
    this.velX = 0;
    this.startframe = 6;
    this.endframe = 8;
    this.framerate = Math.abs(Math.floor(10/this.velY));
};

Duck.prototype.randomiseVelocity = function () {

    if(this.DuckType === "dog") {
      this.velX = 1;
      this.velY = 0;
      return;
    }
    if(this.negOrPosVelX) {
      this.velX = util.randRange(1,3.5)*Math.abs(this.scale);
      this.velY = -util.randRange(1,3.5)*Math.abs(this.scale);
    }
    else {
      this.velX = -util.randRange(1,3.5)*Math.abs(this.scale);
      this.velY = -util.randRange(1,3.5)*Math.abs(this.scale);
    }
    if(Math.abs(this.velX) > Math.abs(this.velY)) {
      this.startframe = 0;
      this.endframe = 2;
    }
    else {
      this.startframe = 3;
      this.endframe = 5;
    }
    if(this.DuckType === "red") {
      this.velX *= 1.5;
      this.velY *=1.5;
    }
    this.frameRate = Math.abs(Math.floor(20/(Math.abs(this.velX)+Math.abs(this.velY))));
    this.flying = new Animation(this.spritesheet, this.frameRate, this.startframe, this.endframe);
};

Duck.prototype.halt = function () {
    this.velX = 0;
    this.velY = 0;
};



Duck.prototype.update = function (du) {


    spatialManager.unregister(this);

    if (this._isDeadNow) {
      this.takeBulletHit;
      return entityManager.KILL_ME_NOW;
    }

    if(this.velX > 0) {
      if(this.scale < 0) {
        this.scale *= -1;
      }
    }
    if(this.velX <= 0) {
      if(this.scale > 0) {
        this.scale *= -1;
      }
    }

    this.flying.update();
    this.cx += this.velX * du;
    this.cy += this.velY * du;
    if(this.isDead) {
      if(this.deathAnimationCounter > 10) {
        this.produceSplatter();
      }
      if(this.deathAnimationCounter > 0) {
        this.velX = -1;
        this.velY = -1;
        this.startframe = 9;
        this.endframe = 9;
        this.deathAnimationCounter--;
        this.flying = new Animation(this.spritesheet, 1, this.startframe, this.endframe);
      }
      else if(this.deathAnimationCounter <= 0){
        this.velY += 0.1;
        this.startframe = 10;
        this.endframe = 10;
        this.flying = new Animation(this.spritesheet, 1, this.startframe, this.endframe);
      }
    }

    if(g_dogWalkingCounter < 50 && this.DuckType === "dog") {
        this.velX = 1;
        this.velY = -2;

        if(g_dogWalkingCounter < -35 && this.DuckType === "dog") {
          this._isDeadNow = true;
        }
    }

  if(this.flightUpCounter < 0) {
    this.randomiseVelocity();
    this.flightUpCounter = util.randRange(10, 30);
  }

  g_redCounter--;
  this.flightUpCounter--;
  g_dogWalkingCounter--;
  this.outOfBondsLittleDuckie();


  if(!this.isDead){
  spatialManager.register(this);
  }
};

Duck.prototype.getRadius = function () {
    if(this.DuckType === "dog") return 40;
    else return 12*Math.abs(this.scale);
};

Duck.prototype.produceSplatter = function () {
    for(var i = 0; i < 20; i++) {
      g_ctx.save();
      g_ctx.fillStyle = "#FF0000";
      util.fillCircle(g_ctx, this.cx+util.randRange(-15, 15)*Math.abs(this.scale), this.cy+util.randRange(-15, 15)*Math.abs(this.scale), util.randRange(0, 4)*Math.abs(this.scale));
      g_ctx.restore();
    }
};

Duck.prototype.DuckiDied= new Audio(
    "duck2.mp3");

Duck.prototype.DoggyDied= new Audio(
        "Dog.mp3");

Duck.prototype.takeBulletHit = function () {
  this.velY = 3;
  this.velX = 0;
  this.flightUpCounter = 1000000000;
  this.isDead = true;
  if(this.DuckType === "dog") this.DoggyDied.play();
  else this.DuckiDied.play();
};


Duck.prototype.render = function (ctx) {
  if(this.DuckType==="dog"){
    this.flying.draw(this.cx, this.cy, this.scale);
  }
  else{
    this.flying.draw(this.cx, this.cy, this.scale);
  }

};
