class Brain {
    constructor() {
        //this.player = 0;

        this.weights = {};
        this.getWeights();

        this.lastMove = 1;
        this.bias = 1;

        //console.log(this.player);
        this.mutate();
    }

    getWeights() {
        this.weights = {
            y: weightsJSON.y,
            vely: weightsJSON.vely,
            accy: weightsJSON.accy,
            obstaclesOnScreen: weightsJSON.obstaclesOnScreen,
            xNextObstacle: weightsJSON.xNextObstacle,
            yNextObstacle: weightsJSON.yNextObstacle,
            lastMove: weightsJSON.lastMove,
            bias: weightsJSON.bias
        }
        //this.weights = weightsJSON;
    }

    /*randWeight() {
        return random(-1, 1)
    }*/

    getDir(py, pvely, paccy) {
        let dir = 1;

        let y = py;
        let vely = pvely;
        let accy = paccy;
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

            case 0:
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
                let rand = Math.random();

                if (rand < mutationRate) {
                    this.weights[weight] += Math.random(-1, 1) * 0.01;

                    if (this.weights[weight] > 1) {
                        this.weights[weight] = 1;
                    } else if (this.weights[weight] < -1) {
                        this.weights[weight] = -1;
                    }
                }
            }
        }
    }
}