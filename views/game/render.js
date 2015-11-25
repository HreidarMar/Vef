// GENERIC RENDERING

var g_doClear = true;
var g_doBox = false;
var g_undoBox = false;
var g_doFlipFlop = false;
var g_doRender = true;
var g_winterMode = false;
var g_winterModeMusic = false;

var g_frameCounter = 1;

var TOGGLE_WINTER = 'W'.charCodeAt(0);
var TOGGLE_CLEAR = 'C'.charCodeAt(0);
var TOGGLE_BOX = 'B'.charCodeAt(0);
var TOGGLE_UNDO_BOX = 'U'.charCodeAt(0);
var TOGGLE_FLIPFLOP = 'F'.charCodeAt(0);
var TOGGLE_RENDER = 'R'.charCodeAt(0);

var snowFlakes = [];
for(var i = 0; i<200; i++){
    snowFlakes[i] = [util.randRange(0, 1000), util.randRange(0, 600), util.randRange(2, 4)];
}

function render(ctx) {

    // Process various option toggles
    //
    if (eatKey(TOGGLE_CLEAR)) g_doClear = !g_doClear;
    if (eatKey(TOGGLE_BOX)) g_doBox = !g_doBox;
    if (eatKey(TOGGLE_UNDO_BOX)) g_undoBox = !g_undoBox;
    if (eatKey(TOGGLE_FLIPFLOP)) g_doFlipFlop = !g_doFlipFlop;
    if (eatKey(TOGGLE_RENDER)) g_doRender = !g_doRender;
    if (eatKey(TOGGLE_WINTER)){
      g_winterMode = !g_winterMode;
      g_winterModeMusic = true;
    }

    // I've pulled the clear out of `renderSimulation()` and into
    // here, so that it becomes part of our "diagnostic" wrappers
    //
    if (g_doClear) util.clearCanvas(ctx);

    // The main purpose of the box is to demonstrate that it is
    // always deleted by the subsequent "undo" before you get to
    // see it...
    //
    // i.e. double-buffering prevents flicker!
    //
    if (g_doBox) util.fillBox(ctx, 200, 200, 50, 50, "red");
    if(g_winterMode) {
        for(var i = 0; i<snowFlakes.length;i++){
            snowFlakes[i][0] += util.randRange(-0.6, 0.6);
            snowFlakes[i][1] += util.randRange(0.3, 1);
            util.fillCircle(ctx, snowFlakes[i][0], snowFlakes[i][1], snowFlakes[i][2]);
            if(snowFlakes[i][0] > g_canvas.width) {
                snowFlakes[i][0] = snowFlakes[i][0] - g_canvas.width;
            }
            if(snowFlakes[i][1] > g_canvas.height) {
                snowFlakes[i][1] = snowFlakes[i][1] - g_canvas.height;
            }
        }
    }
    if(g_isUpdatePaused) {
    ctx.save()
    ctx.textAlign="center";
    ctx.font = "50px Arial";
    ctx.fillStyle = 'red';
    ctx.fillText("Do you really want to quit?",500,190);
    ctx.font = "25px Arial";
    ctx.fillText("Yes(Press Y and P) No(Press N)",500,230);
    ctx.restore();

    }
    if((g_frameCounter > 900 && g_frameCounter < 930) || (g_frameCounter > 600 && g_frameCounter < 630)){
        g_sprites.Dog.drawCentredAt(g_ctx, 500, 470, 0, 312.5, 0, 62.5, 55, 125, 110);
    }
    // The core rendering of the actual game / simulation
    //
    if (g_doRender) renderSimulation(ctx);


    // This flip-flip mechanism illustrates the pattern of alternation
    // between frames, which provides a crude illustration of whether
    // we are running "in sync" with the display refresh rate.
    //
    // e.g. in pathological cases, we might only see the "even" frames.
    //
    if (g_doFlipFlop) {
        var boxX = 250,
            boxY = g_isUpdateOdd ? 100 : 200;

        // Draw flip-flop box
        util.fillBox(ctx, boxX, boxY, 50, 50, "green");

        // Display the current frame-counter in the box...
        ctx.fillText(g_frameCounter % 1000, boxX + 10, boxY + 20);
        // ..and its odd/even status too
        var text = g_frameCounter % 2 ? "odd" : "even";
        ctx.fillText(text, boxX + 10, boxY + 40);
    }

    // Optional erasure of diagnostic "box",
    // to illustrate flicker-proof double-buffering
    //
    if (g_undoBox) ctx.clearRect(200, 200, 50, 50);

    ++g_frameCounter;
}
