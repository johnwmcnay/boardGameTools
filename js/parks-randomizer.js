class parksData {
    constructor() {
        this.basicTrailTiles = ["Valley",
            "Ocean",
            "Mountain",
            "Forest",
            "Vista",
        ]

        this.advancedTrailTiles = ["River",
            "Lodge",
            "Lookout",
            "Wildlife",
        ]

        this.bonusTrailTile = "Waterfall";
        this.tilePool = this.basicTrailTiles;
        this.season = 0;

    }

    static initializePage() {
        document.body.innerHTML = "";
        let container = document.createElement("div");
        let text = document.createElement("p");
        let players = ["p2", "p3", "p4", "p5"];
        container.id = "players";
        text.id = "howManyPlayers";
        text.textContent = "How many people are playing?";
        container.appendChild(text);

        for (let index in players) {
            let btn = document.createElement("button");
            let i = parseInt(index);
            btn.id = players[i];
            i += 2;

            btn.textContent = (i) + " players";
            btn.onclick = function () {
                parksData.newGame(i);
            }
            container.appendChild(btn);
        }
        document.body.appendChild(container);
    }

    static generateTrail(data) {
        data.season++;
        if (data.season === 1 && data.players > 3) {
            data.tilePool.push(data.bonusTrailTile);
        }

        data.addAdvancedTile();
        data.randomizeTrail();

    }

    displayTrail() {
        let element = document.createElement("div");
        let heading = document.createElement("h3");
        let trail = document.createElement("p");
        let btn = document.createElement("button");
        let data = this;
        element.id = ("trail" + this.season);
        trail.textContent = this.tilePool.join(" -> ");
        heading.textContent = "Season " + this.season;




        if (this.season < 4) {
            btn.onclick = function () {
                parksData.generateTrail(data);
                this.hidden = true;
            }
            btn.textContent = "Advance Season";
        } else {
            btn.onclick = function () {
                this.hidden = true;
                parksData.initializePage();
            }
            btn.textContent = "Reset";
        }

        element.appendChild(heading);
        element.appendChild(trail);
        element.appendChild(btn);
        document.body.appendChild(element);
    }


    randomizeTrail() {
        let availableTiles = this.tilePool;
        let randomArray = [];
        let numberOfTrails = availableTiles.length;

        for (let i = 0; i < numberOfTrails; i++) {
            let randomNumber = this.randomInt(0, availableTiles.length - 1);
            let element = availableTiles[randomNumber];
            randomArray.push(element);
            availableTiles.splice(randomNumber, 1);
        }

        this.tilePool = randomArray;
        this.displayTrail();
        return randomArray;

    }

    randomInt(min, max) {
        return Math.floor(Math.random() * (max - min + 1) + min);
    }

    addAdvancedTile() {
        let randomNumber = this.randomInt(0, this.advancedTrailTiles.length - 1);
        let trail = this.advancedTrailTiles[randomNumber];

        this.tilePool.push(trail);
        this.advancedTrailTiles.splice(randomNumber, 1);
    }

    static newGame(numberOfPlayers) {

        let trailRandomizer = new parksData();
        trailRandomizer.players = numberOfPlayers;
        let elements = document.getElementsByTagName("button");

        for (let element of elements) {
            if (element.id === ("p" + numberOfPlayers)) {
                element.disabled = true;
            } else {
                element.hidden = true;
            }
        }
        parksData.generateTrail(trailRandomizer);
    }
}



