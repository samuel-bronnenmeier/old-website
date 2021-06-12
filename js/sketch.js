let weightsJSON;

let canvas;
var population;

let cwidth;
let cheight;
let PXwidth;
let PXheight;

let cthere;

let obstacles = [];

function preload() {
    //assets
    /*try {
        weightsJSON = loadJSON("assets/weights.json");
    } catch (e) {*/
        weightsJSON = {
            y: 0.01,
            vely: -0.1,
            accy: -0.1,
            obstaclesOnScreen: 0,
            xNextObstacle: 0.01,
            yNextObstacle: -0.05,
            lastMove: -0.9,
            bias: 0
        }
    //}
}

function setup() {
    //make it responsiv, ...
    cwidth = windowWidth - 200;
    cwidth -= cwidth % PX;
    cheight = windowHeight - 110;
    cheight -= cheight % PX;

    PXwidth = cwidth / PX;
    PXheight = cheight / PX;

    if (windowWidth < 600 || windowHeight < 600) {
        cthere = false;
        remove();
    } else {
        cthere = true;

        //initialize canvas
        canvas = createCanvas(cwidth, cheight);
        canvas.parent("canvas-container");
        canvas.position(0, 0);

        //doing that letters that form a "welcome"
        createWelcome();

        population = new Population(10);

        //do some starter obstacles
        obstacles.push(new Obstacle(600, Math.floor(PXheight / 2) * PX, PX, PX, false));
        obstacles.push(new Obstacle(800, Math.floor(PXheight / 12 * 3) * PX, PX, PX, false));
        obstacles.push(new Obstacle(1000, Math.floor(PXheight / 12 * 9) * PX, PX, PX, false));
        obstacles.push(new Obstacle(1200, height - 40, PX, PX, false));

        frameRate(40);
    }
}

function draw() {
    update();

    background("#333");

    population.draw();

    for (let i = 0; i < obstacles.length; i++) {
        obstacles[i].draw();
    }
}

function update() {
    //check if game is over
    collisionDetection();

    if (population.allPlayersDead()) {
        population.calculateFitness();
        population.naturalSelection();
        population.mutate();
        //console.log(population.players[2].brain);
        gameOver();
    } else {
        population.update();
    }

    //update obstacles; delete obstacles that are too far out
    for (let i = 0; i < obstacles.length; i++) {
        obstacles[i].update();
        if (obstacles[i].x < 0-40) {
            obstacles.shift();
        }
    }

    //create new obstacles
    if (obstacles.length < 11 && frameCount % 35 == 0) {
        obstacles.push(new Obstacle(width, Math.floor(random(PXheight - 1)) * PX, PX, PX, true));
    }
}

function checkIntersection(r1, r2) {
	if (r1.x >= r2.x + r2.width) {
		return false;
	} else if (r1.x + r1.width <= r2.x) {
		return false;
	} else if (r1.y >= r2.y + r2.height) {
		return false;
	} else if (r1.y + r1.height <= r2.y) {
		return false;
	} else {
		return true;
	}
}

function collisionDetection() {
    /*for (let i = 0; i < population.players.length; i++) {
        var rigidBody1 = {
            x: population.players[i].pos.x - Math.floor(PLAYER_RADIUS / 2),
            y: population.players[i].pos.y - Math.floor(PLAYER_RADIUS / 2),
            width: PLAYER_RADIUS,
            height: PLAYER_RADIUS
        };
        for (let i = 0; i < obstacles.length; i++) {
            var rigidBody2 = {
                x: obstacles[i].x,
                y: obstacles[i].y,
                width: obstacles[i].width,
                height: obstacles[i].height
            };
            if (checkIntersection(rigidBody1, rigidBody2)) {
                //gameOver();
                population.players[i].dead = true;
                population.players[i].fitness = frameCount;
                console.log("one is dead!!!")
                return;
            }
        }
    }*/
}

function gameOver() {
    //pretty much simulating a reload
    //player = new Player(100, 200);

    obstacles = [];
    obstacles.push(new Obstacle(600, Math.floor(PXheight / 2) * PX, PX, PX, false));
    obstacles.push(new Obstacle(800, Math.floor(PXheight / 12 * 3) * PX, PX, PX, false));
    obstacles.push(new Obstacle(1000, Math.floor(PXheight / 12 * 9) * PX, PX, PX, false));
    obstacles.push(new Obstacle(1200, height - 40, PX, PX, false));
}

function createWelcome() {
    let welcome = createDiv("Welcome to my site");
    welcome.id("welcome");
    welcome.parent("canvas-container");
    welcome.style("font-size", "60px");
    welcome.style("color", "#8C8C8C8D");
    welcome.style("width", "100%");
    welcome.style("position", "absolute");
    welcome.style("left", width / 2 - 250 + "px");
    welcome.style("top", height / 2 - 40 + "px");
    welcome.style("white-space", "nowrap");
}

function windowResized() {
    if (windowWidth < 600 || windowHeight < 600) {
        cthere = false;
        remove();
    } else if (!cthere) {
        //initialize canvas
        canvas = createCanvas(cwidth, cheight);
        canvas.parent("canvas-container");
        canvas.position(0, 0);

        //doing that letters that form a "welcome"
        createWelcome();

        player = new Player(100, 200);

        //do some starter obstacles
        obstacles.push(new Obstacle(600, Math.floor(PXheight / 2) * PX, PX, PX, false));
        obstacles.push(new Obstacle(800, Math.floor(PXheight / 12 * 3) * PX, PX, PX, false));
        obstacles.push(new Obstacle(1000, Math.floor(PXheight / 12 * 9) * PX, PX, PX, false));
        obstacles.push(new Obstacle(1200, height - 40, PX, PX, false));

        frameRate(40);
    }
}

function mousePressed() {
    saveJSON(population.players[0].brain.weights, "weights.json");
}