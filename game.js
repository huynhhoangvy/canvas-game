/*
  Code modified from:
  http://www.lostdecadegames.com/how-to-make-a-simple-html5-canvas-game/
  using graphics purchased from vectorstock.com
*/

/* Initialization.
Here, we create and add our "canvas" to the page.
We also load all of our images. 
*/


let canvas;
let ctx;

canvas = document.createElement("canvas");
ctx = canvas.getContext("2d");
// function setCanvasSize(){
//   canvas.width = 768;
//   canvas.height = 432;
// }

canvas.width = 768;
canvas.height = 432;

document.body.appendChild(canvas);

let bgReady, heroReady, monsterReady, rockReady, ghostReady;
let bgImage, heroImage, monsterImage, rockImage, ghostImage;

let startTime = Date.now();
const SECONDS_PER_ROUND = 60;
let elapsedTime = 0;

let monstersCaught = 0;
const GOAL = 20;

// let x 
// x = playSoundEffect();

// function playSoundEffect () {
//   x.play()
// }

function loadImages() {
  bgImage = new Image();
  bgImage.onload = function () {
    // show the background image
    bgReady = true;
  };
  bgImage.src = "images/sky.jpg";

  heroImage = new Image();
  heroImage.onload = function () {
    // show the hero image
    heroReady = true;
  };
  heroImage.src = "images/hero1.png";

  monsterImage = new Image();
  monsterImage.onload = function () {
    // show the monster image
    monsterReady = true;
  };
  monsterImage.src = "images/monster1.png";

  rockImage = new Image();
  rockImage.onload = function () {
    // show the monster image
    rockReady = true;
  };
  rockImage.src = "images/rock.png";

  ghostImage = new Image();
  ghostImage.onload = function () {
    // show the monster image
    ghostReady = true;
  };
  ghostImage.src = "images/ghost.png";
}

/** 
 * Setting up our characters.
 * 
 * Note that heroX represents the X position of our hero.
 * heroY represents the Y position.
 * We'll need these values to know where to "draw" the hero.
 * 
 * The same applies to the monster.
 */

let heroX = canvas.width / 2;
let heroY = canvas.height / 2;

// var hero = {
//   speed : 256,
//   x = canvas.width / 2,
//   y = canvas.height / 2,
// }

let monsterX, monsterY, rockX, rockY, ghostX, ghostY;
let monsterDirectionX = 1; 
let monsterDirectionY = 1;

// monsterX = 100;
// monsterY = 100;

spawnMonster();
spawnRock();
spawnGhost();

function spawnGhost () {
  ghostX = (Math.floor(Math.random() * (canvas.width - 32)) + 1);
  ghostY = (Math.floor(Math.random() * (canvas.height - 32)) + 1);
}


function spawnRock () {
  rockX = (Math.floor(Math.random() * (canvas.width - 32)) + 1);
  rockY = (Math.floor(Math.random() * (canvas.height - 32)) + 1);
}

function spawnMonster () {
  monsterX = (Math.floor(Math.random() * (canvas.width - 32)) + 1);
  monsterY = (Math.floor(Math.random() * (canvas.height - 32)) + 1);
}

/** 
 * Keyboard Listeners
 * You can safely ignore this part, for now. 
 * 
 * This is just to let JavaScript know when the user has pressed a key.
*/
let keysDown = {};
function setupKeyboardListeners() {
  // Check for keys pressed where key represents the keycode captured
  // For now, do not worry too much about what's happening here. 
  addEventListener("keydown", function (key) {
    keysDown[key.keyCode] = true;
  }, false);

  addEventListener("keyup", function (key) {
    delete keysDown[key.keyCode];
  }, false);
}


/**
 *  Update game objects - change player position based on key pressed
 *  and check to see if the monster has been caught!
 *  
 *  If you change the value of 5, the player will move at a different rate.
 */
let update = function () {
  // Update the time.
  elapsedTime = Math.floor((Date.now() - startTime) / 1000);


  if (38 in keysDown) { // Player is holding up key
    heroY -= 5;
  } 
  if (40 in keysDown) { // Player is holding down key
    heroY += 5;
  }
  if (37 in keysDown) { // Player is holding left key
    heroX -= 5;
  }
  if (39 in keysDown) { // Player is holding right key
    heroX += 5;
  }

  monsterX += (5 * monsterDirectionX);
  if (monsterX > canvas.width - 32 || monsterX < 0) {
    monsterDirectionX = -monsterDirectionX;
  }
  monsterY += (5 * monsterDirectionY);
  if (monsterY > canvas.height - 32 || monsterY < 0) {
    monsterDirectionY = -monsterDirectionY;
  }

  heroX = Math.min(canvas.width - 32, heroX);
  heroX = Math.max(0, heroX);
  heroY = Math.min(canvas.height - 32, heroY);
  heroY = Math.max(0, heroY);


  // console.log("herorX " + heroX + " heroY " + heroY + " rockX " + rockX + " rockY " + rockY )
  // if (heroY + 32 >= rockY && Math.abs(heroX - rockX) < 32) {
  //   heroY = rockY - 32;
  // }
  if (38 in keysDown && Math.abs(heroX - rockX) < 32) { // Player is holding up key
      if (rockY - heroY <= 32 && heroY - rockY <= 32) {
      heroY = rockY + 32;
    }
  } else if (40 in keysDown && Math.abs(heroX - rockX) < 32) { // Player is holding down key
      if (heroY - rockY <= 32 && rockY - heroY <= 32) {
      heroY = rockY - 32;
    }
  } else if (37 in keysDown && Math.abs(heroY - rockY) < 32) { // Player is holding left key
      if (rockX - heroX <= 32 && heroX - rockX <= 32) {
      heroX = rockX + 32;
    }
  } else if (39 in keysDown && Math.abs(heroY - rockY) < 32) { // Player is holding right key
      if (heroX - rockX <= 32 && rockX - heroX <= 32) {
      heroX = rockX - 32;
    }
  }






  if (38 in keysDown && Math.abs(heroX - ghostX) < 32) { // Player is holding up key
    if (ghostY - heroY <= 32 && heroY - ghostY <= 32) {
    heroY = ghostY + 32;
  }
} else if (40 in keysDown && Math.abs(heroX - ghostX) < 32) { // Player is holding down key
    if (heroY - ghostY <= 32 && ghostY - heroY <= 32) {
    heroY = ghostY - 32;
  }
} else if (37 in keysDown && Math.abs(heroY - ghostY) < 32) { // Player is holding left key
    if (ghostX - heroX <= 32 && heroX - ghostX <= 32) {
    heroX = ghostX + 32;
  }
} else if (39 in keysDown && Math.abs(heroY - ghostY) < 32) { // Player is holding right key
    if (heroX - ghostX <= 32 && ghostX - heroX <= 32) {
    heroX = ghostX - 32;
  }
}
  
  // Check if player and monster collided. Our images
  // are about 32 pixels big.
  if (
    heroX <= (monsterX + 32)
    && monsterX <= (heroX + 32)
    && heroY <= (monsterY + 32)
    && monsterY <= (heroY + 32)
  ) {
    monstersCaught += 1;

  spawnMonster();
  spawnRock();
  spawnGhost();

 
  

    // Pick a new location for the monster.
    // Note: Change this to place the monster at a new, random location.
    // monsterDirectionX = -monsterDirectionX;
    // monsterDirectionY = -monsterDirectionY;
  }






};

/**
 * This function, render, runs as often as possible.
 */
var render = function () {
  if (bgReady) {
    ctx.drawImage(bgImage, 0, 0);
  }
  if (heroReady) {
    ctx.drawImage(heroImage, heroX, heroY);
  }
  if (monsterReady) {
    ctx.drawImage(monsterImage, monsterX, monsterY);
  }
  if (rockReady) {
    ctx.drawImage(rockImage,rockX, rockY)
  }
  if (ghostReady) {
    ctx.drawImage(ghostImage,ghostX, ghostY)
  }
  // if (monstersCaught == 5) {
  //   monsterX += (5 * monsterDirectionX);
  // }

  ctx.fillStyle = "red";
  ctx.font = "bold 15px Helvetica, Arial, sans-serif";
  ctx.fillText(`Seconds Remaining: ${SECONDS_PER_ROUND - elapsedTime}`, 20, 100);
  ctx.fillText(`Monsters caugth: ${monstersCaught}`, 20, 120);
  
};

/**
 * The main game loop. Most every game will have two distinct parts:
 * update (updates the state of the game, in this case our hero and monster)
 * render (based on the state of our game, draw the right things)
 */
var main = function () {
  update(); 
  render();
console.log("monsterscaught" + monstersCaught)
  // if (monstersCaught == 5) {
  //   heroImage.src = "images/hero2.png";
  //   monsterImage.src = "images/monster2.png";
  //   monsterX += (7 * monsterDirectionX);
  //   monsterY += (7 * monsterDirectionY);
  //   console.log("change speed")
  // } else if (monstersCaught > 5 && monstersCaught == 10) {
  //   heroImage.src = "images/hero3.png";
  //   monsterImage.src = "images/monster3.png";
  //   bgImage.src = "images/forest1.jpg";
  //   monsterX += (9 * monsterDirectionX);
  //   monsterY += (9 * monsterDirectionY);
  //   // canvas.width = 1024;
  //   // canvas.height = 576;
  // } else if (monstersCaught > 10 && monstersCaught == 15) {
  //   heroImage.src = "images/hero5.png";
  //   monsterImage.src = "images/monster4.png";
  //   monsterX += (11 * monsterDirectionX);
  //   monsterY += (11 * monsterDirectionY);
  // } else if (monstersCaught > 15 && monstersCaught == 20 ) {
  //   heroImage.src = "images/hero4.png";
  // }

  // if (monstersCaught == GOAL) {
  //   ctx.fillText(`Elapsed Time: ${elapsedTime}`, 20, 140);
  //   return;
  // } else if ((SECONDS_PER_ROUND - elapsedTime) == 0) {
  //   ctx.fillText(`You SUCK!!!!!!`, 20, 160);
  //   return;
  // }

  if (monstersCaught >= 5 && monstersCaught < 10) {
    heroImage.src = "images/hero2.png";
    monsterImage.src = "images/monster2.png";
    monsterX += (7 * monsterDirectionX);
    monsterY += (7 * monsterDirectionY);
    console.log("change speed")
  } else if (monstersCaught >= 10 && monstersCaught < 15) {
    heroImage.src = "images/hero3.png";
    monsterImage.src = "images/monster3.png";
    bgImage.src = "images/forest1.jpg";
    monsterX += (9 * monsterDirectionX);
    monsterY += (9 * monsterDirectionY);
    // canvas.width = 1024;
    // canvas.height = 576;
  } else if (monstersCaught >= 15 && monstersCaught < 20) {
    heroImage.src = "images/hero5.png";
    monsterImage.src = "images/monster4.png";
    monsterX += (11 * monsterDirectionX);
    monsterY += (11 * monsterDirectionY);
  } 
  if (monstersCaught == GOAL) {
    ctx.fillText(`Elapsed Time: ${elapsedTime}`, 20, 140);
    return;
  } else if ((SECONDS_PER_ROUND - elapsedTime) == 0) {
    // console.log("this shit")
    ctx.fillText(`You SUCK!!!!!!`, 20, 160);
    return;
  }

  // Request to do this again ASAP. This is a special method
  // for web browsers. 
  requestAnimationFrame(main);
};

// Cross-browser support for requestAnimationFrame.
// Safely ignore this line. It's mostly here for people with old web browsers.
var w = window;
requestAnimationFrame = w.requestAnimationFrame || w.webkitRequestAnimationFrame || w.msRequestAnimationFrame || w.mozRequestAnimationFrame;

// Let's play this game!
loadImages();
setupKeyboardListeners();
main();
