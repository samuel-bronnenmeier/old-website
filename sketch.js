let canvas;
let player;

function preload() {
    //assets
}

function setup() {
    canvas = createCanvas(900, 500);
    canvas.parent("canvas");

    createWelcome();

    player = new Player(100, 200);
}

function draw() {
    update();

    background("#333");

    player.draw();
}

function update() {
    player.update()
}

function createWelcome() {
    let welcome = createDiv("Welcome to my site");
    welcome.style("font-size", "60px");
    welcome.style("color", "#8C8C8C8D");
    welcome.position(width / 2, height / 2 - 20);
}