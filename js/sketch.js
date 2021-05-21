let canvas;
let player;

let cwidth;
let cheight;

let obstacles = [];

let maxObs;

let realmode = false;

function preload() {
    //assets
}

function setup() {
    cwidth = windowWidth - 200;
    cheight = windowHeight - 110;
    cheight -= cheight % PX;

    PXheight = cheight / PX;

    canvas = createCanvas(cwidth, cheight);
    canvas.parent("canvas-container");
    canvas.position(0, 0);

    createWelcome();

    player = new Player(100, 200);

    //obstacles.push(new Obstacle(0, 0, PX, PX));
    obstacles.push(new Obstacle(600, Math.floor(PXheight / 2) * PX, PX, PX));
    obstacles.push(new Obstacle(800, Math.floor(PXheight / 12 * 3) * PX, PX, PX));
    obstacles.push(new Obstacle(1000, Math.floor(PXheight / 12 * 9) * PX, PX, PX));
    obstacles.push(new Obstacle(1200, height - 40, PX, PX));
    maxObs = 4;

    frameRate(40);
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
    player.update()

    for (let i = 0; i < obstacles.length; i++) {
        obstacles[i].update();
        if (obstacles[i].x < 0-40) {
            obstacles.shift();
            console.log(obstacles)
        }
    }

    if (obstacles.length < 14 && realmode || obstacles.length < 14 && frameCount % 50 == 0) {
        obstacles.push(new Obstacle(width, Math.floor(random(PXheight)) * PX, PX, PX));
    }

    if (!realmode && frameCount > 5000) {
        realmode = true;
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

function createWelcome() {
    let welcome = createDiv("Welcome to my site");
    welcome.parent("canvas-container");
    welcome.style("font-size", "60px");
    welcome.style("color", "#8C8C8C8D");
    welcome.style("width", "100%");
    welcome.style("position", "absolute");
    welcome.style("left", width / 2 - 250 + "px");
    welcome.style("top", height / 2 - 40 + "px");
    welcome.style("white-space", "nowrap");
}