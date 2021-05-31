class Population {
    constructor(size) {
        this.fitnessSum = 0;

        this.players = [];
        for (let i = 0; i < size; i++) {
            this.players[i] = new Player(100, 200);
        }

        this.gen = 1;
        this.bestPlayer = 0;
    }

    draw() {
        for (let i = 1; i < this.players.length; i++) {
            this.players[i].draw();
        }
        this.players[0].draw();
    }

    update() {
        for (let i = 1; i < this.players.length; i++) {
            this.players[i].update();
        }
    }

    calculateFitness() {
        for (let i = 0; i < this.players.length; i++) {
            this.players[i].calculateFitness();
        }
    }

    allPlayersDead() {
        for (let i = 0; i < this.players.length; i++) {
            if (!this.players[i].dead) {
                return false;
            }
            return true;
        }
    }

    naturalSelection() {
        this.gen++;
    }
}