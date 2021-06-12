class Player {
    constructor(x, y) {
        this.brain = new Brain();

        this.dead = false;

        this.fitness = 0;

        this.pos = createVector(x, y);
        this.vely = 0;
        this.accy = 0;

        this.isBest = false;
    }

    update() {
        if (!this.dead) {
            this.move();
            var rigidBody1 = {
                x: this.pos.x - Math.floor(PLAYER_RADIUS / 2),
                y: this.pos.y - Math.floor(PLAYER_RADIUS / 2),
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
                    this.dead = true;
                    this.fitness = frameCount / 100;
                    return;
                }
            }
        }
    }

    move() {
        //move
        switch (this.brain.getDir()) {
            case 1:
                this.accy = -PLAYER_ACC;
                break;

            case 0:
                this.accy = PLAYER_ACC;
                break;

            default:
                this.accy = 0;
                break;
        }

        this.accy += this.vely * PLAYER_FRICTION;
        this.vely += this.accy;

        //stop it if stopping
        if (Math.abs(this.vely) < 0.1) {
            this.vely = 0;
        }

        this.pos.y += this.vely + 0.5 * this.accy;

        if (this.pos.y - Math.floor(PLAYER_RADIUS / 2) < 0) {
            this.pos.y = 0 + Math.floor(PLAYER_RADIUS / 2);
        } else if (this.pos.y + Math.floor(PLAYER_RADIUS / 2) > height) {
            this.pos.y = height - Math.floor(PLAYER_RADIUS / 2);
        }
    }

    draw() {
        if (this.isBest) {
            fill(230, 230, 230);
        } else {
            fill(30, 240, 110);
        }
        noStroke();
        ellipse(this.pos.x, this.pos.y, PLAYER_RADIUS, PLAYER_RADIUS);
    }

    getDir() {
        let n = random();
        if (n > 0.5) {
            return "up";
        }
        return "down";
    }

    calculateFitness() {
        this.fitness = this.fitness;
    }

    getBaby() {
        let baby = new Player(100, 200);
        baby.brain = this.brain.clone();
        return baby;
    }
}