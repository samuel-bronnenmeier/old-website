class Population {
    constructor(size) {
        this.fitnessSum = 0;

        this.players = [];
        for (let i = 0; i < size; i++) {
            this.players[i] = new Player(100, 200);
            this.players[i].brain.player = i;
            console.log(this.players[i].brain.player);
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
        for (let i = 0; i < this.players.length; i++) {
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
        let newPlayers = [];
        this.setBestDot();
        this.calculateFitnessSum();

        newPlayers[0] = this.players[0].getBaby();
        newPlayers[0].isBest = true;

        for (let i = 1; i < this.players.length; i++) {
            let parent = this.selectParent();

            newPlayers[i] = parent.getBaby();
        }
        this.players = newPlayers;

        this.gen++;
    }

    calculateFitnessSum() {
        this.fitnessSum = 0;
        for (let i = 0; i < this.players.length; i++) {
            this.fitnessSum += this.players[i].fitness;
        }
    }

    selectParent() {
        let rand = random() * this.fitnessSum;
		
		let runningSum = 0;
		
		for (let i = 0; i < this.players.length; i++) {
			runningSum += this.players[i].fitness;
			if (runningSum > rand) {
				return this.players[i];
			}
			
		}
		//should never get there
		return null;
    }

    mutate() {
        for (let i = 1; i < this.players.length; i++) {
            this.players[i].brain.mutate();
            //console.log("weight of player", i);
        }
    }

    setBestDot() {
        let max = 0;
        let maxIndex = 0;

        for (let i = 0; i < this.players.length; i++) {
            if (this.players[i].fitness > max) {
                max = this.players[i].fitness;
                maxIndex = i;
            }
        }

        this.bestPlayer = maxIndex;
    }
}