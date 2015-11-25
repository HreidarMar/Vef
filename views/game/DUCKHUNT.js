// =========
// DUCKHUNT
// =========
/*

A sort-of-playable version of the classic arcade game.

"use strict";

/* jshint browser: true, devel: true, globalstrict: true */

var g_canvas = document.getElementById("myCanvas");
var g_ctx = g_canvas.getContext("2d");

/*
0        1         2         3         4         5         6         7         8
12345678901234567890123456789012345678901234567890123456789012345678901234567890
*/

// ====================
// CREATE INITIAL SHIPS
// ====================

function createInitialTarget() {

  entityManager.generateGun({
      cx : 100,
      cy : 100
  });

    entityManager.generateShot({
        cx : 0,
        cy : 0
    });

}

// =============
// GATHER INPUTS
// =============

function gatherInputs() {
    // Nothing to do here!
    // The event handlers do everything we need for now.
}


// =================
// UPDATE SIMULATION
// =================

// We take a very layered approach here...
//
// The primary `update` routine handles generic stuff such as
// pausing, single-step, and time-handling.
//
// It then delegates the game-specific logic to `updateSimulation`


// GAME-SPECIFIC UPDATE LOGIC

function updateSimulation(du) {

    processDiagnostics();

    entityManager.update(du);

}

// GAME-SPECIFIC DIAGNOSTICS

var g_allowMixedActions = true;
var g_useGravity = false;
var g_useAveVel = true;
var g_renderSpatialDebug = false;

var KEY_MIXED   = keyCode('M');;
var KEY_GRAVITY = keyCode('G');
var KEY_AVE_VEL = keyCode('V');
var KEY_SPATIAL = keyCode('X');

var KEY_HALT  = keyCode('H');

var KEY_0 = keyCode('0');


function processDiagnostics() {

    if (eatKey(KEY_MIXED))
        g_allowMixedActions = !g_allowMixedActions;

    if (eatKey(KEY_GRAVITY)) g_useGravity = !g_useGravity;

    if (eatKey(KEY_AVE_VEL)) g_useAveVel = !g_useAveVel;

    if (eatKey(KEY_SPATIAL)) g_renderSpatialDebug = !g_renderSpatialDebug;

    if (eatKey(KEY_HALT)) entityManager.haltDucks();

    if (eatKey(KEY_0)) entityManager.toggleDucks();


}


// =================
// RENDER SIMULATION
// =================

// We take a very layered approach here...
//
// The primary `render` routine handles generic stuff such as
// the diagnostic toggles (including screen-clearing).
//
// It then delegates the game-specific logic to `gameRender`


// GAME-SPECIFIC RENDERING

function renderSimulation(ctx) {

    entityManager.render(ctx);

    if (g_renderSpatialDebug) spatialManager.render(ctx);
}


// =============
// PRELOAD STUFF
// =============

var g_images = {};

function requestPreloads() {

    var requiredImages = {
        Shot   : "crosshairs.png",
        Gun  :  "pistol.png",
        Gun2  :  "Doublebarrel.png",
        Duck   : "duckhunt_various_sheet.png",
        Gunflash : "flash.png",
        Dog : "ssdog.png"
    };

    imagesPreload(requiredImages, g_images, preloadDone);
}

var g_sprites = {};

function preloadDone() {

    g_sprites.Shot  = new Sprite(g_images.Shot);
    g_sprites.Gun = new Sprite(g_images.Gun);
    g_sprites.Gun2 = new Sprite(g_images.Gun2);
    g_sprites.Duck  = new Sprite(g_images.Duck);
    g_sprites.Gunflash  = new Sprite(g_images.Gunflash);
    g_sprites.Dog = new Sprite(g_images.Dog);

    entityManager.init();
    createInitialTarget();

    main.init();
}

// Kick it off
requestPreloads();
