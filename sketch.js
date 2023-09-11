//these boolean declarations are to indicate which screen the game is on.
let menuStarted = false;
let gameStarted = false;
let upstart = false;
let overscreen = false;
let custom = false;
//Ticks are used to let the game know on which frame to execute a command.
let tick = 0;
//This is the x and y positions of the player which constantly change depending on the x and y velocity.
let xpos = 200;
let ypos = 300;
let xvel = 0;
let yvel = 0;
//The skin changes depending on what character you unlocked in the game. You can go to customize and change it.
let skin = 0;
//The score of the player
let score = 0;
//I had to use a new tick called gametick which only initializes when the game actually starts and the player inputs a command.
let gameTick = 0;
//All of these are variables needed to make the cloud background.
let cloud1x = 0;
let cloud1y = 0;
let cloud2x = 0;
let cloud2y = 0;
let cloud3x = 0;
let cloud3y = 0;
let cloud4x = 0;
let cloud4y = 0;
//All of these variables are needed to command the asteroid variables and where they are. I noticed I no longer needed the fourth asteroid, but may add it in if the game is too easy.
let asteroid1x = 0;
let asteroid1y = 0;
let asteroid1yvel = 0;
let asteroid2x = 0;
let asteroid2y = 0;
let asteroid2yvel = 0;
let asteroid3x = 0;
let asteroid3y = 0;
let asteroid3yvel = 0;
let asteroid4x = 0;
let asteroid4y = 0;
let asteroid4yvel = 0;
let asteroidxvels = 2.5;
//whether the asteroid spawns from the left or right
let a1pos = 0;
let a2pos = 0;
let a3pos = 0;
let a4pos = 0;
//whether the asteroid is in the game currently
let a1ingame = false;
let a2ingame = false;
let a3ingame = false;
let a4ingame = false;
//variables to make the booster and side thruster animations.
let booster = false;
let rsidethruster = false;
let lsidethruster = false;
//The highscore of the player.
let highscore = 0;
//The lives of the player.
let lives = 3;
//The invincibity frames. inv indicates if the player is invincible or not and iFrames is the counter for the length of the invincibility.
let iFrames = 0;
let inv = true;

function setup() {
  //sets the canvas and variables.
  createCanvas(400, 400);
  frameRate(30);
  cloud1y = 0;
  cloud2y = 100;
  cloud3y = 200;
  cloud4y = 300;
  cloud1x = random(400);
  cloud2x = random(400);
  cloud3x = random(400);
  cloud4x = random(400);
}

function draw() {
  background(120,190,235);
  fill(240);
  stroke(200);
  strokeWeight(5);
  //when the cloud reaches the bottom of the screen, it sets the cloud x position to a random number and resets the y position back to 0.
  if (cloud1y >= 400) {
    cloud1y = 0;
    cloud1x = random(400);
  } else if (cloud2y >= 400) {
    cloud2y = 0;
    cloud2x = random(400);
  } else if (cloud3y >= 400) {
    cloud3y = 0;
    cloud3x = random(400);
  } else if (cloud4y >= 400) {
    cloud4y = 0;
    cloud4x = random(400);
  }
  //draws the cloud.
  ellipse(cloud1x,cloud1y,200,40);
  ellipse(cloud2x,cloud2y,200,40);
  ellipse(cloud3x,cloud3y,200,40);
  ellipse(cloud4x,cloud4y,200,40);
  //increases the cloud's y position continuously.
  cloud1y+=8;
  cloud2y+=8;
  cloud3y+=8;
  cloud4y+=8;
  if (gameStarted == true) {
    if (overscreen == true) {
      //resets some variables.
      xpos = 200;
      ypos = 300;
      xvel = 0;
      yvel = 0;
      upstart = false;
      overscreen = false;
    }
    //changes the skin according to the skin variable.
    if (skin == 0) {
      fill(100,100,120);
    } else if (skin == 1) {
      fill(0,255,0);
    } else if (skin == 2) {
      stroke(255);
      fill(0);
    } else if (skin == 3) {
      fill(0,0,200);
      stroke(0);
      strokeWeight(5);
    }
    //funny addition
    if (inv == true) {
      if (lives < 3) {
        text("oof",xpos,ypos - 30);
      }
      //makes the flashing animation when invincible according to which tick you are on
      if (tick <= 8 || (tick >= 16 && tick <= 24)) {
        fill(255);
      }
    }
    //draws the player.
    ellipse(xpos,ypos,20,40);
    //extra cool skin for the highest score.
    if (skin == 3) {
      stroke(150,0,150);
      fill(150,0,150);
      strokeWeight(1);
      textSize(12);
      text("G",xpos-4,ypos+3);
    }
    //adds the animation of the flame booster and the side thrusters according the which input.
    if (lsidethruster == true) {
      strokeWeight(0);
      rect(xpos+15,ypos,12,7);
    }
    if (rsidethruster == true) {
      strokeWeight(0);
      rect(xpos-15,ypos,12,7);
    }
    if (booster == true) {
      strokeWeight(2);
      if (skin < 3) {
        stroke(255,100,0);
        fill(255,0,0);
      } else {
        stroke(150,0,150);
        fill(0,0,235);
      }
      triangle(xpos-5,ypos+15,xpos+5,ypos+15,xpos,ypos+38);
    }
    strokeWeight(0);
    stroke(0);
    fill(0);
    textSize(25);
    text("SCORE: " + score,250,50);
    fill(255,0,0);
    //for loop that displays the amount of lives the player has in hearts This is the only code I found online as I wanted a good heart shape.
    for (count = 0; count < lives; count++) {
      heart(count*40+30,40,30);
    }
    //upstart is important as it keeps the player in place at the beginning so the player is ready and makes the input, which begins the game.
    if (upstart == false) {
      if (keyIsDown(38) || keyIsDown(87)||keyIsDown(37) || keyIsDown(65)||keyIsDown(39) || keyIsDown(68)) {
        upstart = true;
        tick = 0;
      }
      //flashing instructions while the player is getting ready to play.
      if (tick <= 15) {
        strokeWeight(2);
        fill(180);
        stroke(0);
        textSize(22);
        rect(80,190,30,30);
        rect(150,190,30,30);
        rect(115,155,30,30);
        rect(320,190,30,30);
        rect(250,190,30,30);
        rect(285,155,30,30);
        rect(200,250,145,30);
        fill(0);
        strokeWeight(1);
        text("W",105,165);
        text("A         D",70,200);
        text("<         >",245,200);
        text("SPACE",165,257);
        textSize(13);
        text("Arrow keys OR WAD to move, Space to boost DOWN",40,120);
        textSize(25);
        text("^",279,167);
      }
    //increases the score according to the tick.
    } else if (tick % 30 == 0) {
      score++;
    }
    //changes the player's velocity and sets the animation booleans according to the input.
    if (keyIsDown(38) || keyIsDown(87)) {
      yvel-=1.7;
      booster = true;
    } else {
      booster = false;
    }
    if (keyIsDown(37) || keyIsDown(65)) {
      xvel-=1.4;
      lsidethruster = true;
    } else {
      lsidethruster = false;
    }
    if (keyIsDown(39) || keyIsDown(68)) {
      xvel+=1.4;
      rsidethruster = true;
    } else {
      rsidethruster = false;
    }
    //checks if the player has either hit a wall or an asteroid, and takes out a life and makes the player invincible for a second.
    if (xpos < 10 || xpos > 390 || ypos < 20 || ypos > 380 || (xpos < asteroid1x + 35 && xpos > asteroid1x - 35 && ypos < asteroid1y + 40 && ypos > asteroid1y - 40 && a1ingame == true) || (xpos < asteroid2x + 35 && xpos > asteroid2x - 35 && ypos < asteroid2y + 40 && ypos > asteroid2y - 40 && a2ingame == true) || (xpos < asteroid3x + 35 && xpos > asteroid3x - 35 && ypos < asteroid3y + 40 && ypos > asteroid3y - 40 && a3ingame == true)) {
      if (inv == false) {
        inv = true;
        background(255,0,0);
        lives--;
      }
      //makes it so the player does not fall out of the world and also slightly bounces off the walls, still losing a life.
      if (xpos < 10 || xpos > 390) {
        if (xpos < 10) {
          xpos = 10;
        } else {
          xpos = 390;
        }
        xvel*=-0.4;
      } else if (ypos < 20 || ypos > 380) {
        if (ypos < 20) {
          ypos = 20;
        } else {
          ypos = 380;
        }
        yvel*=-0.4;
      }
    }
    //invincibility frames code.
    if (inv == true && upstart == true) {
      iFrames++;
      if (iFrames > 40) {
        iFrames = 0;
        inv = false;
      }
    }
    //resets all the variables once the player loses all their lives.
    if (lives <= 0) {
      lives = 3;
      overscreen = true;
      gameStarted = false;
      upstart = false;
      asteroid1x = 0;
      asteroid1y = 0;
      asteroid1yvel = 0;
      asteroid2x = 0;
      asteroid2y = 0;
      asteroid2yvel = 0;
      asteroid3x = 0;
      asteroid3y = 0;
      asteroid3yvel = 0;
      asteroid4x = 0;
      asteroid4y = 0;
      asteroid4yvel = 0;
      asteroidxvels = 2.5;
      a1pos = 0;
      a2pos = 0;
      a3pos = 0;
      a4pos = 0;
      a1ingame = false;
      a2ingame = false;
      a3ingame = false;
      a4ingame = false;
      inv = true;
      if (score > highscore) {
        highscore = score;
      }
    }
    ypos+=yvel;
    xpos+=xvel;
    if (upstart == true) {
      //makes gravity always pull the player down unless the player has not made any input. Same with the asteroids spawning.
      yvel+=0.7;
      if (a1ingame == false) {
        a1ingame = true;
      } else if (a2ingame == false) {
        a2ingame = true;
      } else if (a3ingame == false) {
        a3ingame = true;
      } else {
        a4ingame = true;
      }
      strokeWeight(3);
      stroke(100,120,100);
      fill(70,80,50);
      if (a1ingame == true) {
        if (asteroid1x == 0) {
          asteroid1yvel = -2;
          if (random(2) >= 1) {
            a1pos = 1;
            asteroid1x = 400;
          } else {
            a1pos = 0;
            asteroid1x = 0;
          }
          asteroid1y = random(50,350);
        }
        if (a1pos == 0) {
          asteroid1x+=asteroidxvels;
        } else {
          asteroid1x-=asteroidxvels;
        }
        asteroid1y+=asteroid1yvel;
        rect(asteroid1x,asteroid1y,60,60);
      }
      if (a1pos == 1) {
        if (asteroid1x <= 0 || asteroid1y >= 400) {
          a1ingame = false;
          asteroid1x = 0;
          asteroid1y = 0;
          asteroid1yvel = 0;
        }
      } else if (asteroid1x >= 400 || asteroid1y >= 400) {
        a1ingame = false;
        asteroid1x = 0;
        asteroid1y = 0;
        asteroid1yvel = 0;
      }
      if (a2ingame == true) {
        if (asteroid2x == 0) {
          asteroid2yvel = -2;
          if (random(2) >= 1) {
            a2pos = 1;
            asteroid2x = 400;
          } else {
            a2pos = 0;
            asteroid2x = 0;
          }
          asteroid2y = random(50,350);
        }
        if (a2pos == 0) {
          asteroid2x+=asteroidxvels;
        } else {
          asteroid2x-=asteroidxvels;
        }
        asteroid2y+=asteroid2yvel;
        rect(asteroid2x,asteroid2y,60,60);
      }
      if (a2pos == 1) {
        if (asteroid2x <= 0 || asteroid2y >= 400) {
          a2ingame = false;
          asteroid2x = 0;
          asteroid2y = 0;
          asteroid2yvel = 0;
        }
      } else if (asteroid2x >= 400 || asteroid2y >= 400) {
        a2ingame = false;
        asteroid2x = 0;
        asteroid2y = 0;
        asteroid2yvel = 0;
      }
      if (a3ingame == true) {
        if (asteroid3x == 0) {
          asteroid3yvel = -2;
          if (random(2) >= 1) {
            a3pos = 1;
            asteroid3x = 400;
          } else {
            a3pos = 0;
            asteroid3x = 0;
          }
          asteroid3y = random(50,350);
        }
        if (a3pos == 0) {
          asteroid3x+=asteroidxvels;
        } else {
          asteroid3x-=asteroidxvels;
        }
        asteroid3y+=asteroid3yvel;
        rect(asteroid3x,asteroid3y,60,60);
      }
      if (a3pos == 1) {
        if (asteroid3x <= 0 || asteroid3y >= 400) {
          a3ingame = false;
          asteroid3x = 0;
          asteroid3y = 0;
          asteroid3yvel = 0;
        }
      } else if (asteroid3x >= 400 || asteroid3y >= 400) {
        a3ingame = false;
        asteroid3x = 0;
        asteroid3y = 0;
        asteroid3yvel = 0;
      }
      if (gameTick == 0) {
        asteroidxvels++;
      }
    }
    xvel = xvel * 0.92;
    asteroid1yvel+=0.1;
    asteroid2yvel+=0.1;
    asteroid3yvel+=0.1;
    asteroid4yvel+=0.1;
    if (gameTick <= 280) {
      gameTick++;
    } else {
      gameTick = 0;
    }
  } else if (overscreen == false && custom == false) {
    stroke(255,0,0);
    fill(255,100,50);
    textSize(60);
    textFont('verdana');
    text("DODGE!",80,100);
    fill(30,130,255);
    strokeWeight(12);
    if (mouseX > 125 && mouseX < 275 && mouseY > 250 && mouseY < 330) {
      stroke(200,200,0);
    } else {
      stroke(150);
    }
    rectMode(CENTER);
    rect(200,290,150,80);
    strokeWeight(1);
    fill(255);
    stroke(255);
    textSize(45);
    textFont('arial');
    text("PLAY",145,305);
  } else if (overscreen == true && custom == false) {
    strokeWeight(10);
    stroke(200,0,0);
    line(xpos - 15, ypos - 15, xpos + 15, ypos + 15);
    line(xpos + 15, ypos - 15, xpos - 15, ypos + 15);
    stroke(0);
    strokeWeight(2);
    fill(150)
    rect(200,180,190,80);
    fill(30,130,255);
    if (mouseX > 175 && mouseX < 225 && mouseY > 300 && mouseY < 350) {
      stroke(200,200,0);
    } else {
      stroke(150);
    }
    strokeWeight(5);
    rect(200,325,50,50);
    if (mouseX > 110 && mouseX < 160 && mouseY > 230 && mouseY < 280) {
      stroke(200,200,0);
    } else {
      stroke(150);
    }
    rect(135,255,50,50);
    if (mouseX > 175 && mouseX < 225 && mouseY > 230 && mouseY < 280) {
      stroke(200,200,0);
    } else {
      stroke(150);
    }
    rect(200,255,50,50);
    textSize(35);
    stroke(255,0,0);
    fill(255,100,0);
    strokeWeight(2);
    text("GAME OVER",95,110);
    fill(255);
    stroke(255);
    textSize(28);
    text("SCORE: " + score,120,175);
    textSize(18);
    text("HIGHSCORE: " + highscore,120,205);
    textSize(40);
    text(">",189,337);
    textSize(15);
    text("|",190,328);
    ellipse(197,323,10,10);
    triangle(120,250,150,250,135,240);
    rect(135,260,18,18);
    ellipse(200,255,15,30);
  } else if (custom == true) {
    fill(30,130,255);
    if (mouseX > 25 && mouseX < 75 && mouseY > 25 && mouseY < 75) {
      stroke(200,200,0);
    } else {
      stroke(150);
    }
    rect(50,50,50,50);
    fill(255);
    textSize(30);
    text("<",40,58);
    strokeWeight(5);
    fill(100,100,120);
    stroke(200);
    ellipse(80,220,20,40);
    fill(0,255,0);
    ellipse(160,220,20,40);
    stroke(0);
    fill(255);
    textSize(15);
    text("You need a high score of:",70,135);
    text(" FREE              10               20               40",50,183);
    textSize(30);
    text("CUSTOMIZE",120,100);
    fill(0);
    stroke(255);
    ellipse(240,220,20,40);
    fill(0,0,200);
    stroke(0);
    ellipse(320,220,20,40);
    stroke(150,0,150);
    fill(150,0,150);
    strokeWeight(1);
    textSize(12);
    text("G",316,223);
    strokeWeight(3);
    if (highscore < 40) {
      if (highscore < 20) {
        if (highscore < 10) {
          lock(160);
        }
        lock(240);
      }
      lock(320);
    }
    noFill();
    stroke(0);
    strokeWeight(5);
    if (skin == 0) {
      rect(80,220,50,50);
    } else if (skin == 1) {
      rect(160,220,50,50);
    } else if (skin == 2) {
      rect(240,220,50,50);
    } else if (skin == 3) {
      rect(320,220,50,50);
    }
    stroke(200,200,0);
    if (mouseY > 195 && mouseY < 245) {
        if (mouseX > 55 && mouseX < 105 && skin != 0) {
          rect(80,220,50,50);
        } else if (mouseX > 135 && mouseX < 185 && highscore >= 10 && skin != 1) {
          rect(160,220,50,50);
        } else if (mouseX > 215 && mouseX < 265 && highscore >= 20 && skin != 2) {
          rect(240,220,50,50);
        } else if (mouseX > 295 && mouseX < 345 && highscore >= 40 && skin != 3) {
          rect(320,220,50,50);
        }
    }
  }
  tick++;
  if (tick >= 30) {
    tick = 0;
  }
}

function keyPressed() {
  if (keyCode == 32) {
    if (overscreen == true) {
      overscreen = false;
      gameStarted = true;
      upstart = false;
      score = 0;
      lives = 3;
      asteroid1x = 0;
      asteroid1y = 0;
      asteroid1yvel = 0;
      asteroid2x = 0;
      asteroid2y = 0;
      asteroid2yvel = 0;
      asteroid3x = 0;
      asteroid3y = 0;
      asteroid3yvel = 0;
      asteroid4x = 0;
      asteroid4y = 0;
      asteroid4yvel = 0;
      asteroidxvels = 2.5;
      a1pos = 0;
      a2pos = 0;
      a3pos = 0;
      a4pos = 0;
      a1ingame = false;
      a2ingame = false;
      a3ingame = false;
      a4ingame = false;
      xpos = 200;
      ypos = 300;
      xvel = 0;
      yvel = 0;
      inv = true;
    } else {
      yvel = 8;
      fill(0,100,255);
      ellipse(xpos,ypos,50,50);
      upstart = true;
    }
  }
}

function mouseClicked() {
  if (mouseButton == LEFT) {
    if (gameStarted == false && overscreen == false && custom == false) {
      if (mouseX > 125 && mouseX < 275 && mouseY > 250 && mouseY < 330) {
        gameStarted = true;
        score = 0;
      }
    } else if (overscreen == true) {
      if (mouseX > 175 && mouseX < 225 && mouseY > 300 && mouseY < 350) {
        gameStarted = true;
        score = 0;
      } else if (mouseX > 110 && mouseX < 160 && mouseY > 230 && mouseY < 280) {
        lives = 3;
        overscreen = false;
        gameStarted = false;
        xpos = 200;
        ypos = 300;
        xvel = 0;
        yvel = 0;
        upstart = false;
        asteroid1x = 0;
        asteroid1y = 0;
        asteroid1yvel = 0;
        asteroid2x = 0;
        asteroid2y = 0;
        asteroid2yvel = 0;
        asteroid3x = 0;
        asteroid3y = 0;
        asteroid3yvel = 0;
        asteroid4x = 0;
        asteroid4y = 0;
        asteroid4yvel = 0;
        asteroidxvels = 2.5;
        a1pos = 0;
        a2pos = 0;
        a3pos = 0;
        a4pos = 0;
        a1ingame = false;
        a2ingame = false;
        a3ingame = false;
        a4ingame = false;
        inv == true;
      } else if (mouseX > 175 && mouseX < 225 && mouseY > 230 && mouseY < 280) {
        overscreen = false;
        custom = true;
      }
    } else if (custom == true) {
      if (mouseX > 25 && mouseX < 75 && mouseY > 25 && mouseY < 75) {
        custom = false;
        overscreen = true;
      } else if (mouseY > 195 && mouseY < 245) {
        if (mouseX > 55 && mouseX < 105) {
          skin = 0;
        } else if (mouseX > 135 && mouseX < 185 && highscore >= 10) {
          skin = 1;
        } else if (mouseX > 215 && mouseX < 265 && highscore >= 20) {
          skin = 2;
        } else if (mouseX > 295 && mouseX < 345 && highscore >= 40) {
          skin = 3;
        }
      }
    }
  }
}
function lock(x) {
  stroke('brown');
  fill('brown');
  rect(x,225,20,20);
  noFill();
  ellipse(x,217,18,18);
}

//Below this is pasted code to make a heart shape
//website: "https://editor.p5js.org/Mithru/sketches/Hk1N1mMQg"
function heart(x, y, size) {
  beginShape();
  vertex(x, y);
  bezierVertex(x - size / 2, y - size / 2, x - size, y + size / 3, x, y + size);
  bezierVertex(x + size, y + size / 3, x + size / 2, y - size / 2, x, y);
  endShape(CLOSE);
}