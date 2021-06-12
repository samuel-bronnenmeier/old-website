class Brain {
    constructor() {
        this.player = 2;

        this.weights = {};
        this.getWeights();

        this.lastMove = 1;
        this.bias = 1;
    }

    getWeights() {
        /*this.weights = {
            y: this.randWeight(),
            vely: this.randWeight(),
            accy: this.randWeight(),
            obstaclesOnScreen: this.randWeight(),
            xNextObstacle: this.randWeight(),
            yNextObstacle: this.randWeight(),
            lastMove: this.randWeight(),
            bias: this.randWeight()
        }*/
        this.weights = weightsJSON;
    }

    randWeight() {
        return random(-1, 1)
    }

    getDir() {
        let dir = 1;

        let y = population.players[this.player].pos.y;
        let vely = population.players[this.player].vely;
        let accy = population.players[this.player].accy;
        let obstaclesOnScreen = obstacles.length;
        let xNextObstacle = obstacles[this.nextOb()].x;
        let yNextObstacle = obstacles[this.nextOb()].y;
        let lastMove = this.lastMove;
        let bias = this.bias;

        y *= this.weights.y;
        vely *= this.weights.vely;
        accy *= this.weights.accy;
        obstaclesOnScreen *= this.weights.obstaclesOnScreen;
        xNextObstacle *= this.weights.xNextObstacle;
        yNextObstacle *= this.weights.yNextObstacle;
        lastMove *= this.weights.lastMove;
        bias = this.bias;

        let sum = y + vely + accy + obstaclesOnScreen + xNextObstacle + yNextObstacle + lastMove + bias;

        if (sum > 1) {
            dir = 1;
        } else {
            dir = 0;
        }

        switch (dir) {
            case 1:
                this.lastMove = 1;
                break;

            case 2:
                this.lastMove = -1;
                break;
        
            default:
                this.lastMove = 0;
                break;
        }

        return dir;
    }

    nextOb() {
        let i = 0;
        while (obstacles[i].x < 100) {
            i++;
        }
        return i;
    }

    clone() {
        let clone = new Brain();
        for (const key in clone.weights) {
            if (Object.hasOwnProperty.call(clone.weights, key)) {
                clone.weights[key] = this.weights[key];
            }
        }
        return clone;
    }

    mutate() {
        let mutationRate = 0.01;

        for (const weight in this.weights) {
            if (Object.hasOwnProperty.call(this.weights, weight)) {
                let rand = random();
                if (rand < mutationRate) {
                    this.weights[weight] += random(-1, 1) * 0.1;
                    if (this.weights[weight] > 1) {
                        this.weights[weight] = 1;
                    } else if (this.weights[weight] < -1) {
                        this.weights[weight] = -1;
                    }
                    console.log(weight, "from", this.player, "mutated");
                }
            }
        }
    }
}