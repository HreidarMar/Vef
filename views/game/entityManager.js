/*

entityManager.js

A module which handles arbitrary entity-management for "Asteroids"


We create this module as a single global object, and initialise it
with suitable 'data' and 'methods'.

"Private" properties are denoted by an underscore prefix convention.

*/


"use strict";


// Tell jslint not to complain about my use of underscore prefixes (nomen),
// my flattening of some indentation (white), or my use of incr/decr ops
// (plusplus).
//
/*jslint nomen: true, white: true, plusplus: true*/


var entityManager = {

// "PRIVATE" DATA

_Ducks   : [],
_Shots   : [],
_Guns    : [],

_bShowDucks : true,

counter : 60,

// "PRIVATE" METHODS

_generateDucks : function() {
    var i,
        NUM_DuckS = 1;

    for (i = 0; i < NUM_DuckS; ++i) {
        this.generateDuck();
    }
},

_forEachOf: function(aCategory, fn) {
    for (var i = 0; i < aCategory.length; ++i) {
        fn.call(aCategory[i]);
    }
},


// PUBLIC METHODS

// A special return value, used by other objects,
// to request the blessed release of death!
//
KILL_ME_NOW : -1,

// Some things must be deferred until after initial construction
// i.e. thing which need `this` to be defined.
//
deferredSetup : function () {
    this._categories = [this._Ducks, this._Shots, this._Guns];
},

init: function() {
    this._generateDucks();
},


generateDuck : function(descr) {
    this._Ducks.push(new Duck(descr));
},

generateShot : function(descr) {
    this._Shots.push(new Shot(descr));
},

generateGun : function(descr) {
    this._Guns.push(new Gun(descr));
    console.log(this._Guns)
},

toggleDucks: function() {
    this._bShowDucks = !this._bShowDucks;
},

haltDucks: function() {
  this._forEachOf(this._Ducks, Duck.prototype.halt);
},


update: function(du) {

    //console.log(this.poseSpeed);
    //console.log(this.counterPose);
    for (var c = 0; c < this._categories.length; ++c) {

        var aCategory = this._categories[c];
        var i = 0;

        while (i < aCategory.length) {

            var status = aCategory[i].update(du);
          //console.log(aCategory[i]);

            if (status === this.KILL_ME_NOW) {
                // remove the dead guy, and shuffle the others down to
                // prevent a confusing gap from appearing in the array

                aCategory.splice(i,1);

            }
            else {
                ++i;
            }
        }
    }

    if (this.counter === 0) {
        this._generateDucks();
        this.counter = Math.floor(util.randRange(60, 120));
    }

    this.counter--;

    
    main.timePasses(du);

},

render: function(ctx) {

    var debugX = 10, debugY = 100;

    for (var c = 0; c < this._categories.length; ++c) {

        var aCategory = this._categories[c];

        if (!this._bShowDucks &&
            aCategory == this._Ducks)
            continue;

        for (var i = 0; i < aCategory.length; ++i) {

            aCategory[i].render(ctx);
            //debug.text(".", debugX + i * 10, debugY);

        }
        debugY += 10;
    }
}

}

// Some deferred setup which needs the object to have been created first
entityManager.deferredSetup();
