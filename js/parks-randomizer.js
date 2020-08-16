console.log("works");
function numOfPlayers(num) {
    console.log(num);
}


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

        this.season = 0

    }

    static generateTrail(data) {
        console.log(data);
        data.season++;
        console.log(data);
        data.addAdvancedTile();
        data.randomizeTrail();

    }

    displayTrail() {
        let element = document.createElement("div");
        let heading = document.createElement("div");
        let btn = document.createElement("button");
        element.id = ("trail" + this.season);
        element.textContent = this.tilePool.join(" -> ");
        heading.textContent = "Season " + this.season;

        btn.textContent = "Advance Season";
        // btn.onclick = function() {
        //     parksData.generateTrail(this);
        // }

        heading.appendChild(element);
        heading.appendChild(btn);
        document.body.appendChild(heading);

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
}

function newGame() {
    let trailRandomizer = new parksData();
}
