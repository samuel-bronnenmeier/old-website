class Player {
    constructor(x, y) {
        this.pos = createVector(x, y);
        this.vely = 0;
        this.accy = PLAYER_ACC;
    }

    update() {
        //move
        switch (this.getRandomDir()) {
            case "up":
                this.accy = -PLAYER_ACC;
                break;

            case "down":
                this.accy = PLAYER_ACC;
                break;

            default:
                console.log("ERROR: Player.update()");
                break;
        }

        this.accy += this.vely * PLAYER_FRICTION;
        this.vely += this.accy;

        //stop it if stopping
        if (Math.abs(this.vely) < 0.1) {
            this.vely = 0;
        }

        this.pos.y += this.vely + 0.5 * this.accy;
        if (this.pos.y - PLAYER_RADIUS < 0) {
            this.pos.y = 0 + PLAYER_RADIUS;
        } else if (this.pos.y + PLAYER_RADIUS > height) {
            this.pos.y = height - PLAYER_RADIUS;
        }
    }

    draw() {
        fill(30, 240, 110);
        noStroke();
        ellipse(this.pos.x, this.pos.y, PLAYER_RADIUS, PLAYER_RADIUS);
    }

    getRandomDir() {
        let n = random();
        if (n > 0.5) {
            return "up";
        }
        return "down";
    }
}