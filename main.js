// The title of the game to be displayed on the title screen
title  =  "Stoplight";

// The description, which is also displayed on the title screen
description  =  `Move on green, 
Stop on red.
`;

// The array of custom sprites
characters  = [
    `
    ll
  llllll
    ll
    `
];

const G = {
    WIDTH: 150,
    HEIGHT: 150
};

let player;
let stop = false;
let speed = 1;
let moving = true;
let flag;
let timer;
let count;
let red = false;
let c = "green";

// Game runtime options
// Refer to the official documentation for all available options
options  = {
    viewSize: {x: G.WIDTH, y: G.HEIGHT},
    theme: "dark"
};

// The game loop function
function  update() {
	// The init function
	if (!ticks) {
        player = {
            pos: vec(G.WIDTH / 2, 3 * G.HEIGHT / 4)
        };

        timer = floor(rnd(100, 200));
        count = floor(rnd(50, 100));
	}

    //ground
    color("yellow");
    rect(0, 3 * G.HEIGHT / 4, G.WIDTH, 50);

    //player
    color("blue");
    box(player.pos, 4);
    player.pos.x += speed;
    player.pos.wrap(0, G.WIDTH, 0, G.HEIGHT);

    console.log(count);
    console.log(timer);
    console.log(red);

    //if red count goes down, else timer goes down
    if (c == "red") {
        count -= 1;
    }
    else {
        timer -= 1;
        if (moving) {
            if(ticks % 10 == 0) {
                addScore(1);
            }
        }
    }
    
    //buffer for losing
    if (count <= 40) {
        red = true;
    }
    

    //when count goes to 0, turn green
    if (count <= 0) {
        c = "green";
        //flag = rect(G.HEIGHT / 2, G.WIDTH / 16, 50, 25);
        red = false;
        timer = floor(rnd(100,200));
        count = floor(rnd(50, 100));
    }

    //when timer goes to 0, turn red
    if (timer <= 0) {
        c = "red";
        //red = true;
    }

    //flag
    color(c);
    flag = rect(G.HEIGHT / 3, G.WIDTH / 16, 50, 25);

    //input
    if (input.isJustPressed) {
        if (stop) {
            speed = 1;
            stop = false;
            moving = true;
        }
        else{
            speed = 0;
            stop = true;
            moving = false;
        }
    }
    
    //checks for lose condition
    if(red && moving) {
        remove(player);
        red = false;    
        c = "green";
        count = 30;
        end();
    }
    
}