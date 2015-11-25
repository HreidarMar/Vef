// ==========
// Shot STUFF
// ==========

"use strict";

/* jshint browser: true, devel: true, globalstrict: true */

/*
0        1         2         3         4         5         6         7         8
12345678901234567890123456789012345678901234567890123456789012345678901234567890
*/


// A generic contructor which accepts an arbitrary descriptor object
function Shot(descr) {

    // Common inherited setup logic from Entity
    this.setup(descr);

    // Default sprite, if not otherwise specified
    this.sprite = this.sprite || g_sprites.Shot;

    // Set normal drawing scale, and warp state off
    this._scale = 1;
    this.imgPosX = 0;
    this.imgPosY = 0;
    this.imgWidth = 400;
    this.imgHeight = 400;
    this.imgDestWidth = 60;
    this.imgDestHeight = 60;

    this.PistolAmmo = 15;
    this.ShotgunAmmo = 10;
    this.PistolReload = 0;
    this.ShotgunReload = 0;
};

Shot.prototype = new Entity();

// Initial, inheritable, default values
Shot.prototype.PistolFired= new Audio(
  "sounds/ShotsFired.mp3");

Shot.prototype.ShotgunFired= new Audio(
    "sounds/shotgun2.mp3");

Shot.prototype.update = function (du) {

    this.cx = g_mouseX;
    this.cy = g_mouseY;
    var TheDieingDuck;

    if(g_PISTOL){
      this.PistolReload=this.PistolReload-du;
      if(g_Shoot){
        g_Shoot=false;
        if(this.PistolAmmo>0){
          if(this.PistolReload<0){
            this.PistolReload=30*du;
            this.PistolAmmo = this.PistolAmmo-1;
            if (this.isItAHit()) {
              TheDieingDuck = this.isItAHit();
              if(TheDieingDuck.DuckType == "red"){
                TheDieingDuck.takeBulletHit();
                g_Score +=8;
              }
              else if(TheDieingDuck.DuckType == "black"){
                TheDieingDuck.takeBulletHit();
                g_Score +=2;
              }
              else if(TheDieingDuck.DuckType == "dog"){
                TheDieingDuck.takeBulletHit();
                g_Score -=2;
              }
              else{
                TheDieingDuck.takeBulletHit();
                g_Score +=1;
              }
        	  }
          g_isShooting = true;
          this.PistolFired.play();
          }
        }
      }
    }
    else{
      this.ShotgunReload=this.ShotgunReload-du;
      if(g_Shoot){
        g_Shoot=false;
        if(this.ShotgunAmmo>0){
          if(this.ShotgunReload<0){
            this.ShotgunReload=70*du;
            this.ShotgunAmmo = this.ShotgunAmmo-1;
            if (this.isItAHit()) {
              TheDieingDuck = this.isItAHit();
              if(TheDieingDuck.DuckType == "red"){
                TheDieingDuck.takeBulletHit();
                g_Score +=8;
              }
              else if(TheDieingDuck.DuckType == "black"){
                TheDieingDuck.takeBulletHit();
                g_Score +=2;
              }
              else if(TheDieingDuck.DuckType == "dog"){
                TheDieingDuck.takeBulletHit();
                g_Score -=2;
              }
              else{
                TheDieingDuck.takeBulletHit();
                g_Score +=1;
              }
        	  }
          g_isShooting = true;
          this.ShotgunFired.play();
          }
        }
      }
    }


};


Shot.prototype.getRadius = function () {
  if(g_PISTOL) return 5;
  else return 15;
};


Shot.prototype.render = function (ctx) {
    var origScale = this.sprite.scale;
    // pass my scale into the sprite, for drawing
    this.sprite.scale = this._scale;
    this.sprite.drawWrappedCentredAt(
        ctx, this.cx, this.cy, 0, this.imgPosX, this.imgPosY, this.imgWidth, this.imgHeight, this.imgDestWidth, this.imgDestHeight
    );
    this.sprite.scale = origScale;
    ctx.font="20px Georgia";
    ctx.fillText("Your score is " +g_Score+ " and the time left is "+ Math.floor(g_gameTime),50,20);

    if(g_PISTOL) ctx.fillText("You have " +this.PistolAmmo+ " shots left",50,50);
    else ctx.fillText("You have " +this.ShotgunAmmo+ " shots left",50,50);
    if(this.PistolReload>0 && this.PistolAmmo!==0 && g_PISTOL){
      ctx.save();
      ctx.fillStyle="red";
      ctx.fillText("RELOADING PISTOL",50,80);
      ctx.restore();

    }
    else if(this.ShotgunReload>0 && this.ShotgunAmmo!==0 && !g_PISTOL){
      ctx.save();
      ctx.fillStyle="red";
      ctx.fillText("RELOADING SHOTGUN",50,80);
      ctx.restore();

    }
    if(this.PistolAmmo===0 && this.ShotgunAmmo===0){
      g_GAMEOVER = true;
    }

    if(this.PistolAmmo===0){
      ctx.save();
      ctx.fillStyle="red";
      ctx.fillText("THE PISTOL IS OUT OF AMMO",50,110);
      ctx.restore();
      g_PISTOL=false;
    }
    if(this.ShotgunAmmo===0){
      ctx.save();
      ctx.fillStyle="red";
      ctx.fillText("THE SHOTGUN IS OUT OF AMMO",50,110);
      ctx.restore();
      g_PISTOL=true;
    }

};
