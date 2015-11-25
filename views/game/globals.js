// =======
// GLOBALS
// =======
/*

Evil, ugly (but "necessary") globals, which everyone can use.

*/

"use strict";

/* jshint browser: true, devel: true, globalstrict: true */

var g_canvas = document.getElementById("myCanvas");
var g_ctx = g_canvas.getContext("2d");
var g_gameTime = 60;
var g_Score = 0;
var g_HighScore = localStorage.getItem("DuckHunt_highscore");
if(g_HighScore === null){
  localStorage.setItem("DuckHunt_highscore",g_Score);
    }
var g_GAMEOVER = false;
var g_PISTOL=true;
var g_redCounter = 300;
var g_dogWalkingCounter = 300;

// The "nominal interval" is the one that all of our time-based units are
// calibrated to e.g. a velocity unit is "pixels per nominal interval"
//
var NOMINAL_UPDATE_INTERVAL = 16.666;

// Multiply by this to convert seconds into "nominals"
var SECS_TO_NOMINALS = 1000 / NOMINAL_UPDATE_INTERVAL;
