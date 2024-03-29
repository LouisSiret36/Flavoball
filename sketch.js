let life = 1;
let cheat = 0;
let stage = 2;
let home = 1;
let winner = 0;
let deathCount;
let MODE;
let inGame;
let resGame;


function homeScreen() {
  if (level == -1) {
    home = 1;
    textAlign(CENTER);
    textSize(width / 4);
    fill(0)
    text("Flavoball", width / 2, height / 2.5);
    textAlign(LEFT)
    textSize(width / 50)
    text("Version 1.0", 0, height - 0.5)
    textAlign(CENTER)
    textSize(width / 20)
    if (deathCount == 1) {
      text("Highscore: " + deathCount + " death", width / 2, height / 1.6)
    } else if (deathCount > 0) {
      text("Highscore: " + deathCount + " deaths", width / 2, height / 1.6)

    }
  } else {
    home = 0;
  }
}

function Game() {
  if (height < 250) {
    cheat = 1
  } else {
    cheat = 0
  }
}

function win() {
  if (deathCount != 0) {
    if (deathCount < 10) {
      winner = 1;
    }
  }
  if (level >= 13) {
    winner = 1
    if (life < int(deathCount)) {
      deathCount = life;
      storeItem("deathCount", deathCount)
    }
    background(0, 255, 0);
    textSize(50);
    textAlign(CENTER);
    fill(0, 0, 255);
    text("YOU WIN", width / 2, 50);
    text("Congrtulations on completing 'Flavoball'!", width / 2, height / 2 - 50);
    textSize(30);
    text("You can now play 'Endless' mode.", width / 2, height / 2);
    text("Or you can try to beat your death count of " + deathCount, width / 2, height / 2 + 50);
    textSize(10);
    text("(Click to restart)", width / 2, height / 2 + 60);

    if (mouseIsPressed) {
      life = 1;
      home_Button();
    }
  }
}

class homePlay {
  constructor() {
    this.x = width / 2
    this.y = height / 1.1
  }
  update() {
    fill(255, 255, 255)
    ellipse(this.x, this.y, 20, 20);
    if (keyCode === UP_ARROW && keyIsPressed) {
      this.y = this.y - 2
    } else if (keyCode === DOWN_ARROW && keyIsPressed) {
      this.y = this.y + 2
    } else if (keyCode === LEFT_ARROW && keyIsPressed) {
      this.x = this.x - 2
    } else if (keyCode === RIGHT_ARROW && keyIsPressed) {
      this.x = this.x + 2
    }
  }
}

//Creating an enemy
class Enemy {
  constructor() {
    this.side = 2
    if (this.side < 2) {
      this.x = random(0, height);
      this.y = 10;
    } else {
      this.y = random(height - 10, 0);
      this.x = 10;
    }
    this.gra = random(0.5, 1);
    this.v = 0;
    this.destroy = 0;
  }
  update() {
    if (this.side < 2) {
      this.y = this.y + this.gra * this.v;
      if (this.y < height - 5) {
        this.v += 0.5
      } else if (this.y > height - 5) {
        this.v = 0;
        this.g = random(1);
        this.y = random(height, 0);
        this.x = random(10, width - 10)
      }
    } else {
      this.x = this.x + this.gra * this.v;
      if (this.x < width - 5) {
        if (level < 10) {
          this.v += 0.2;
        } else {
          this.v += 0.5;
        }
      } else if (this.x > width - 5) {
        this.v = 0;
        this.g = random(1);
        this.y = random(height / 1.1, 0);
        this.x = 10;
      }
    }
    if (this.destroy != 1) {
      fill(0, 0, 0);
      circle(this.x, this.y, 10);
    }
  }
}

//Creating an object (class) called 'Flavoball'
class Flavoball {
  constructor() {
    this.x = width / 2;
    this.y = height / 1.2;
    this.Dead = 0;
  }
  update() {
    //Drawing the character
    stroke(150);
    if (winner == 1) {
      fill(255, 255, 0)
    } else if (MODE == 1) {
      if (level == 0) {
      fill(random(0, 250), random(0, 250), random(0, 250));
    } else if (level == 1) {
      fill(random(10, 140), random(100, 240), random(100, 240))
    } else if (level == 2) {
      fill(random(20, 130), random(125, 230), random(125, 230))
    } else if (level == 3) {
      fill(random(30, 120), random(150, 220), random(150, 220))
    } else if (level == 4) {
      fill(random(40, 100), random(175, 215), random(175, 215))
    } else if (level == 5) {
      fill(random(30, 120), random(190, 205), random(190, 205))
    } else if (level >= 6) {
      fill(50, 200, 200)
    }
    } else if (MODE == 2) {
      fill(50,200,200)
    }

    ellipse(this.x, this.y, 25, 25);

    if (MODE == 1) {
    if (level < 1) {
      this.x += random(-50, 50);
    } else if (level == 1) {
      this.x += random(-20, 20)
    } else if (level == 2) {
      this.x += random(-15, 15)
    } else if (level == 3) {
      this.x += random(-10, 10)
    } else if (level == 4) {
      this.x += random(-5, 5)
    } else if (level == 5) {
      this.x += random(-5, 5)
    }
    }

    //resetting off bottom/top of the screen
    if (this.y < 0) {
      for (let i = 1; i < 31; i++) {
      evul[i].x = 0
      evul[i].v = 0
    }
      level += 1
      stage = 2
      this.y = height
      if (MODE == 1) {
      if (level < 7) {
        this.x = width / 2
      }
      }
    } else if (this.y > height - 10) {
      this.y = height - 10
    }

    //resetting off the sides of the screen
    if (this.x < 0) {
      this.x = width

    } else if (this.x > width) {
      this.x = 0
    }
    if (keyCode === UP_ARROW && keyIsPressed) {
      this.y = this.y - 2
    } else if (keyCode === DOWN_ARROW && keyIsPressed) {
      this.y = this.y + 2
    } else if (MODE == 1) {
      if (level >= 6) {
      if (keyCode === LEFT_ARROW && keyIsPressed) {
        this.x = this.x - 2
      } else if (keyCode === RIGHT_ARROW && keyIsPressed) {
        this.x = this.x + 2
      }
      }
      } else if (MODE == 2) {
        if (keyCode === LEFT_ARROW && keyIsPressed) {
        this.x = this.x - 2
      } else if (keyCode === RIGHT_ARROW && keyIsPressed) {
        this.x = this.x + 2
      }
    }
  }
}

var evul = [];

function setup() {
  createCanvas(windowWidth, windowHeight);
  resGame = 0;
  
  play = createButton('play');
  homeButton = createButton('Home');
  resumeButton = createButton('Resume')
  resumeButton.hide();
  textAlign(CENTER);
  deathCount = getItem("deathCount");
  if (deathCount === null) {
    deathCount = "0";
  }  
      endless = createButton('Endless');
    if (deathCount == 0) {
      endless.remove();
    }
  Ball = new Flavoball();
  homeBall = new homePlay();
  for (let i = 1; i < 31; i++) {
    evul[i] = new Enemy();
  }
  stage = 2;
  level = -1;
  Ball.Dead = 0;
}

function play_Button() {
  MODE = 1;
  resGame = 1;
  level = 0;
  play.remove();
  resumeButton.hide();
  if (deathCount > 0) {
      endless.remove();
    }
  createCanvas(windowWidth, windowHeight);
  Ball = new Flavoball();
  for (let i = 1; i < 31; i++) {
    evul[i] = new Enemy();
  }
  stage = 2
  Ball.Dead = 0;
}

function home_Button() {
  MODE = 0
  inGame = level
  level = -1
  if (home == 0) {
    home = 1;
    if (deathCount > 0) {
      endless = createButton('Endless')
    }
    play = createButton('Play');
  }
}

function resume_Button() {
  MODE = 1
  resumeButton.hide();
  home = 0;
  level = inGame;
  resGame = 1;
  play.remove();
  if (deathCount > 0) {
    endless.remove();
  }
}

function endless_Button() {
  MODE = 2;
  endless.remove();
  play.remove();
  createCanvas(windowWidth, windowHeight);
  Ball = new Flavoball();
  for (let i = 1; i < 101; i++) {
    evul[i] = new Enemy();
  }
  level = 0;
  Ball.Dead = 0;
}

function reset() {
  life += 1;
  createCanvas(windowWidth, windowHeight);
  Ball = new Flavoball();
  for (let i = 1; i < 31; i++) {
    evul[i] = new Enemy();
  }
  stage = 2
  Ball.Dead = 0;
  level = 0;
}

function Death() {
  if (level > 1) {
    for (let i = 1; i < 10; i++) {
      var d = dist(Ball.x, Ball.y, evul[i].x, evul[i].y);
      if (d < 25) {
        if (level == 2) {
          Ball.Dead = 1;
        } else {
          background(255);
          reset();
          Ball.Dead = 0;
          level = 0;
        }
      }
    }
  }
}

function Voice() {
  if (Ball.y <= height / 2) {
    stage = 0
  }
  if (MODE == 1) {
    textSize(width / 50)
    if (level < 1) {
      fill(random(0, 25))
      if (stage == 2) {
        textAlign(LEFT)
        text("Hello there, you appear to be infected.", 10, height / 5)
      } else {
        if (life > 1) {
          textAlign(LEFT)
          text("Come back!", width / 2, height / 2)
        } else {
          textAlign(LEFT)
          text("Where are you going? I know how to help you!", width / 2, height / 2)
        }
      }
    }
    if (level == 1) {
      fill(random(0, 50))
      if (stage == 2) {
        if (life > 1) {
          textAlign(LEFT)
          text("Why does...?", 10, height / 5)
        } else {
          textAlign(LEFT)
          text("You know, it's rude to ignore people...", 10, height / 5)
        }
      } else {
        if (life > 1) {
          textAlign(LEFT)
          text("Oh well. Are you going to continue with this disrespect?", width / 2, height / 2)
        } else {
          textAlign(LEFT)
          text("... Especially those with greater power. ", width / 2, height / 2)
        }
      }
    }
    if (level == 2) {
      fill(random(0, 75))
      if (Ball.Dead == 1) {
        textAlign(CENTER)
        text("HAHAHAHA, YOU POUSSIN CROISSANT!", width / 2, height / 2)
        text("YOU THOUGHT I WAS JUST GOING TO HELP YOU AFTER YOU DISRESPECTED ME?", width / 2, height / 2 + width / 50)
        textAlign(CENTER)
        text("YOU'LL HAVE TO FIGURE IT OUT FOR YOURSELF!", width / 2, height / 2 + width / 25)
      } else if (stage == 2) {
        textAlign(LEFT)
        text("Fine, I see how it is..", 10, height / 5)
      } else {
        textAlign(CENTER)
        text("Just take one of my pellets then, if you won't allow me to explain.", width / 2, height / 2)
      }
    }
    if (level == 3) {
      fill(random(0, 75))
      if (Ball.Dead == 1) {
        if (stage == 2) {
          textAlign(LEFT)
          text("YOU'RE GOING TO FEEL THE WRATH..", width / 2, height / 5)
        } else {
          textAlign(LEFT)
          text("...OF MY PENITRATION PELLETS!!!", width / 2, height / 2)
        }
      } else if (stage == 2) {
        textAlign(LEFT)
        text("So...", width / 2, height / 5)
      } else {
        textAlign(LEFT)
        text("You think you're funny huh?", width / 2, height / 2)
      }
    }
    if (level == 4) {
      fill(random(0, 75))
      if (Ball.Dead == 1) {
        if (stage == 2) {
          textAlign(LEFT)
          text("HAHAHAHA!!!", width / 3, height / 2.6)
        } else {
          textAlign(LEFT)
          text("Huh?", width / 2, height / 2)
        }
      } else if (stage == 2) {
        textAlign(LEFT)
        text("I'LL...I'LL...", width / 2, height / 5)
      } else {
        textAlign(LEFT)
        text("I'LL SHOW YOU NOT TO MESS WITH ME!", width / 2, height / 2)
      }
    }
    if (level == 5) {
      if (stage == 2) {
        textAlign(LEFT)
        text("What's happening?", width / 6, height / 3)
      } else {
        textAlign(RIGHT)
        text("HOW?", width / 2, height / 2)
      }
    }
    if (level == 6) {
      if (stage == 2) {
        textAlign(LEFT)
        if (winner != 1) {
          text("YOU'VE ALREADY RECOVERED!?", width / 6, height / 3)
        } else {
          text("YOU'VE ALREADY RECOVERED FROM MY INFECTION!?", width / 6, height / 3)
        }
      } else {
        textAlign(CENTER)
        if (winner != 1) {
          text("Looks like I'm going to have to get serious...", width / 2, height / 2)
        } else {
          text("MY poison... MY creation... FAILED!?", width / 2, height / 2)

        }
      }
    }
    if (level == 7) {
      textAlign(CENTER)
      if (level != 1) {
        text("TRYHARD.exe ... initiated.", width / 2, height / 2)
      } else {
        text("I'LL HAVE TO JUST INFECT YOU AGAIN!", width / 2, height / 2)
      }
    }

    if (level == 9) {
      textAlign(CENTER)
      text("Wait - please! Stop!", width / 2, height / 2)
    }

    if (level == 10) {
      textAlign(CENTER)
      text("JUST DIE!!!!!!", width / 2, height / 2)
    }

    if (level == 11) {
      if (Ball.y >= height / 2) {
        textAlign(LEFT)
        text("Wha...", width / 6, height / 3)
      } else {
        textAlign(CENTER)
        text("Have I been defeated...?", width / 2, height / 2)
      }
    }

    if (level == 12) {
      if (stage == 2) {
        textAlign(LEFT)
        text("But... I only got...", width / 6, height / 3)
      } else {
        textAlign(CENTER)
        text(life + " of them...", width / 2, height / 2)
      }
    }
  } else {
    textSize(width / 20)
    if (level == 0) {
        textAlign(CENTER)
        text("Welcome to endless mode.", width / 2, height / 2)
    } else if (level == 1) {
        textAlign(CENTER)
        text("In this mode, the objective", width / 2, height / 2)
        text("is to get as far as possible.", width / 2, height / 2 + 30)
    } else if (level == 2) {
        textAlign(CENTER)
        text("Every section wil be harder than the last.", width / 2, height / 2)
              text("Good luck!", width / 2, height / 1.5)
    }
  }
}

function BG() {
  if (home == 1) {
    if (winner == 1) {
      background(255, 255, 0)
    } else {
      background(0, 50, 255)
    }
  } else if (MODE == 1) {
      if (level == 0) {
        background(250, 250, 250);
      } else if (level == 1) {
        background(250, 150, 0);
      } else if (level == 2) {
        background(250, 0, 0);
      } else if (level > 3 < 13) {
        background(175, 0, 0);
    }
  } else if (MODE == 2) {
    background(255,0,0)
  }
}

function Espawn() {
  if (MODE == 1) {
  if (level < 13) {
    if (level < 11) {
      if (level >= 2) {
        evul[1].update();
      }
      if (level >= 3) {
        evul[2].update();
        evul[3].update();
        evul[4].update();
      }
      if (level >= 4) {
        evul[5].update();
        evul[6].update();
      }
      if (level >= 5) {
        evul[7].update();
        evul[8].update();
      }
      if (level > 6) {
        evul[9].update();
        evul[10].update();
        evul[11].update();
        evul[12].update();
        evul[13].update();
        evul[14].update();
        evul[15].update();
        evul[16].update();
        evul[17].update();
        evul[18].update();
        evul[19].update();
        evul[20].update();
      }
      if (level == 10) {
        evul[20].update();
        evul[21].update();
        evul[22].update();
        evul[23].update();
        evul[24].update();
        evul[25].update();
        evul[26].update();
        evul[27].update();
        evul[28].update();
        evul[29].update();
        evul[30].update();
      }
    } else if (level == 11) {
      evul[1].update();
      evul[2].update();
      evul[3].update();
      evul[4].update();
    } else {
      evul[1].update();
      }
    } 
  } else if (MODE == 2) {
      if (level >= 3) {
        evul[1].update();
        evul[2].update();
        evul[3].update();
    } 
    if (level >= 4) {
        evul[4].update();
    } 
    if (level >= 5) {
        evul[5].update();
    } 
    if (level >= 6) {
        evul[6].update();
    } 
    if (level >= 7) {
        evul[7].update();
    } 
    if (level >= 8) {
        evul[8].update();
    } 
    if (level >= 9) {
        evul[9].update();
    } 
    if (level >= 10) {
        evul[10].update();
    } 
    if (level >= 11) {
        evul[11].update();
    } 
    if (level >= 12) {
        evul[12].update();
    } 
    if (level >= 13) {
        evul[13].update();
    } 
    if (level >= 14) {
        evul[14].update();
    } 
    if (level >= 15) {
        evul[15].update();
    } 
    if (level >= 16) {
        evul[16].update();
    } 
    if (level >= 17) {
        evul[17].update();
    } 
    if (level >= 18) {
        evul[18].update();
    } 
    if (level >= 19) {
        evul[19].update();
    } 
    if (level >= 20) {
        evul[20].update();
    } 
    if (level >= 21) {
        evul[21].update();
    } 
    if (level >= 22) {
        evul[22].update();
    } 
    if (level >= 23) {
        evul[23].update();
    } 
    if (level >= 24) {
        evul[24].update();
    }
  }
}

function buttons() {
  if (home == 1) {
    if (resGame == 1) {
    resumeButton.show();
    resumeButton.mousePressed(resume_Button);
      if (deathCount > 0) {
        resumeButton.position(width / 3, height / 2 + 20);
      } else {
        resumeButton.position(width / 2, height / 2 + 20);
      }
    }
    if (deathCount > 0) {
      play.position(width / 3, height / 2);
    } else {
      play.position(width / 2, height / 2);
    }
    play.mousePressed(play_Button);
    homeButton.position(0, 0);
    homeButton.mousePressed(home_Button);
    if (deathCount > 0) {
    endless.position(width / 1.5, height / 2);
    endless.mousePressed(endless_Button);
    }
  }
}

function draw() {
  frameRate(120);
  Game();
  if (cheat != 1) {
    BG();
    win();
    homeScreen();
    buttons();
    let hrs = hour();
    let min = minute();
    let sec = second();
    textSize(width / 50)
    textAlign(RIGHT)
    text('Time:' + hrs + ':' + min + ':' + sec, width, height - 1)
    textSize(10)

    //updating the ball every frame
    Death();
    if (home != 1) {
      textAlign(CENTER)
      text("Section " + level, width / 2, height - 2)
      Ball.update();
      Espawn();
      Voice();
    } else {
      homeBall.update();
    }
  } else {
    background(50, 255, 255);
    textSize(height / 100);
    textAlign(CENTER)
    text("Sorry, your screen is too small", width / 2, height / 2);
  }
}

