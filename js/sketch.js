let canvas;
let player;

let cwidth;
let cheight;

let obstacles = [];

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

    obstacles.push(new Obstacle(0, 0, PX, PX));
    obstacles.push(new Obstacle(600, Math.floor(PXheight / 2) * PX, PX, PX));
    obstacles.push(new Obstacle(800, Math.floor(PXheight / 12 * 3) * PX, PX, PX));
    obstacles.push(new Obstacle(1000, Math.floor(PXheight / 12 * 9) * PX, PX, PX));
    obstacles.push(new Obstacle(width - 40, height - 40, PX, PX));

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
    welcome.style("left", width / 2 - 250 + "px");
    welcome.style("top", height / 2 - 40 + "px");
    welcome.style("white-space", "nowrap");
}