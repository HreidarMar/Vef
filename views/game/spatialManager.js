/*

spatialManager.js

A module which handles spatial lookup, as required for...
e.g. general collision detection.

*/

"use strict";

/* jshint browser: true, devel: true, globalstrict: true */

/*
0        1         2         3         4         5         6         7         8
12345678901234567890123456789012345678901234567890123456789012345678901234567890
*/

var spatialManager = {

// "PRIVATE" DATA

_nextSpatialID : 1, // make all valid IDs non-falsey (i.e. don't start at 0)

_entities : [],

// "PRIVATE" METHODS
//
// <none yet>


// PUBLIC METHODS

getNewSpatialID : function() {

    return this._nextSpatialID++;

},

register: function(entity) {
    var pos = entity.getPos();
    var spatialID = entity.getSpatialID();
    var radius = entity.getRadius();

    var descr={
      entity: entity,
      posX : pos.posX,
      posY : pos.posY,
      radius : radius,
    }
    this._entities[spatialID] = descr;

},

unregister: function(entity) {
    var spatialID = entity.getSpatialID();
    delete this._entities[spatialID];
},

findEntityInRange: function(posX, posY, radius) {

    for(var i=1 ; i < this._entities.length; i++){
      var oneEntity = this._entities[i];
        if(oneEntity){

        var distance = Math.sqrt(Math.pow(oneEntity.posX - posX, 2) + Math.pow(oneEntity.posY - posY, 2));

        var limit = radius + oneEntity.radius;

          if(distance < limit){
            //Its a collision!!
          //  console.log(distance, limit);
          //  console.log(oneEntity.entity);
            return oneEntity.entity;
          }
        }

    }
    return null;

},


render: function(ctx) {
    var oldStyle = ctx.strokeStyle;
    ctx.strokeStyle = "red";

    for (var ID in this._entities) {
        var e = this._entities[ID];
        util.strokeCircle(ctx, e.posX, e.posY, e.radius);
    }
    ctx.strokeStyle = oldStyle;
}

}
