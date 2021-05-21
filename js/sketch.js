let canvas;
let player;

let obstacles = [];

function preload() {
    //assets
}

function setup() {
    canvas = createCanvas(windowWidth - 200, windowHeight - 150);
    canvas.parent("canvas-container");
    canvas.position(0, 0);

    createWelcome();

    player = new Player(100, 200);

    for (let i = 0; i < STARTER_OBS.length; i++) {
        obstacles.push(new Obstacle(STARTER_OBS[i].x, STARTER_OBS[i].y, STARTER_OBS[i].width, STARTER_OBS[i].height));
    }

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
    }
}

function createWelcome() {
    let welcome = createDiv("Welcome to my site");
    welcome.parent("canvas-container");
    welcome.style("font-size", "60px");
    welcome.style("color", "#8C8C8C8D");
    welcome.style("width", "100%");
    welcome.style("position", "absolute");
    welcome.style("left", width / 2 - 80 + "px");
    welcome.style("top", height / 2 - 80 + "px");
    welcome.style("white-space", "nowrap");
}