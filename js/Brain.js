class Brain {
    constructor() {
        this.weightsForUp = {};
        this.weightsForDown = {};
        this.randomizeWeights();

        this.bias = 1;

        this.dir = 0;
    }

    randomizeWeights() {
        this.weightsForUp = {
            y: this.getRandomWeightNumber(),
            vely: this.getRandomWeightNumber(),
            accy: this.getRandomWeightNumber(),
            obstacles: this.getRandomWeightNumber(),
            obTwin: this.getRandomWeightNumber(),
            xNextObstacle: this.getRandomWeightNumber(),
            yNextObstacle: this.getRandomWeightNumber(),
            bias: this.getRandomWeightNumber()
        }
        this.weightsForDown = {
            y: this.getRandomWeightNumber(),
            vely: this.getRandomWeightNumber(),
            accy: this.getRandomWeightNumber(),
            obstacles: this.getRandomWeightNumber(),
            obTwin: this.getRandomWeightNumber(),
            xNextObstacle: this.getRandomWeightNumber(),
            yNextObstacle: this.getRandomWeightNumber(),
            bias: this.getRandomWeightNumber()
        }

    }

    getRandomWeightNumber() {
        return random(-1, 1)
    }

    getDir() {
        this.shallIGoUp();
        this.shallIGoDown();
        return this.dir;
    }

    shallIGoUp() {
        //Up
    }

    shallIGoDown() {
        //Down
    }

    clone() {
        let clone = new Brain();
        return clone;
    }
}