let canvas;
let player;

let cwidth;
let cheight;

let obstacles = [];

function preload() {
    //assets
}

function setup() {
    //make it responsiv, ...
    cwidth = windowWidth - 200;
    cheight = windowHeight - 110;
    cheight -= cheight % PX;

    PXheight = cheight / PX;

    if (PXheight < 4 || cwidth < 200) {
        remove();
    } else {
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

function draw() {
    update();

    background("#333");

    player.draw();

    for (let i = 0; i < obstacles.length; i++) {
        obstacles[i].draw();
    }
}

function update() {
    //check if game is over
    collisionDetection();

    player.update();

    //update obstacles; delete obstacles that are roo far out
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
    var rigidBody1 = {
        x: player.pos.x - Math.floor(PLAYER_RADIUS / 2),
        y: player.pos.y - Math.floor(PLAYER_RADIUS / 2),
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
            gameOver();
            return;
        }
    }
}

function gameOver() {
    //pretty much simulating a reload
    player = new Player(100, 200);

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

/*function createDisplayTooSmallMessage() {
    let message = createDiv("If your display was bigger you could see")
}*/