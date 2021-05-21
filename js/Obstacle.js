class Obstacle {
    constructor(x, y, width, height) {
        this.x = x;
        this.y = y;
        this.width = width;
        this.height = height;
        this.dead = false;
    }

    update() {
        this.x -= OBSTACLE_VEL;
    }

    draw() {
        fill(30, 240, 110);
        noStroke();
        rect(this.x, this.y, this.width, this.height);
    }
}