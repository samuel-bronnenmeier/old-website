class Obstacle {
    constructor(x, y, width, height, twinEnabled) {
        this.x = x;
        this.y = y;
        this.width = width;
        this.height = height;
        this.dead = false;
        this.twin = false;
        //create random "twins"(2 obstacles as acting as one)
        if (twinEnabled) {
            this.yoff = 2;
            this.twin = this.figureTwinsOut();
        }
        if (this.twin) {
            obstacles.push(new Obstacle(this.x, this.y + this.yoff, this.width, this.height, false));
        }
    }

    update() {
        //obviously moving
        this.x -= OBSTACLE_VEL;
    }

    draw() {
        fill(30, 240, 110);
        noStroke();
        rect(this.x, this.y, this.width, this.height);
    }

    figureTwinsOut() {
        if (random() > 0.8) {
            //try statement for too small devices
            try {
                this.yoff = random(2, PXheight - 2) * PX;
            } catch (e) {
                console.log(e);
                this.yoff = 2 * PX;
            }
            if (this.y > height - this.yoff) {
                this.y = height - this.yoff;
            }
            return true;
        }
        return false;
    }
}