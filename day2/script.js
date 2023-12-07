function partOne(input) {
    console.log("Part one");
    let rows = input.split("\n");
    let result = 0;
    let numRed = 12;
    let numGreen = 13;
    let numBlue = 14;
    rows.forEach((row) => {
        let game = row.split(": ");
        let gameID = Number.parseInt(game[0].slice(5));
        let sets = game[1].split("; ");
        let meetsRequirements = true;
        for (let i = 0; i < sets.length; i++) {
            let set = sets[i];
            let colors = set.split(", ");
            for (let j = 0; j < colors.length; j++) {
                let color = colors[j];
                let numCubes = Number.parseInt(color.match(/^[0-9]+/)[0]);
                if ((color.includes("red") && numCubes > numRed) || (color.includes("green") && numCubes > numGreen) || (color.includes("blue") && numCubes > numBlue)) {
                    meetsRequirements = false;
                    break;
                }
            }
            if (!meetsRequirements) {
                break;
            }
        }
        if (meetsRequirements) {
            result += gameID;
        }
    });
    console.log("The sum of the IDs is " + result);
}

function partTwo(input) {
    console.log("Part two");
    let rows = input.split("\n");
    let result = 0;
    rows.forEach((row) => {
        let sets = row.split(": ")[1].split("; ");
        let maxRed = 0;
        let maxGreen = 0;
        let maxBlue = 0;
        let power = 0;
        for (let i = 0; i < sets.length; i++) {
            let set = sets[i];
            let colors = set.split(", ");
            for (let j = 0; j < colors.length; j++) {
                let color = colors[j];
                let numCubes = Number.parseInt(color.match(/^[0-9]+/)[0]);
                if (color.includes("red") && numCubes > maxRed) {
                    maxRed = numCubes;
                }
                if (color.includes("green") && numCubes > maxGreen) {
                    maxGreen = numCubes;
                }
                if (color.includes("blue") && numCubes > maxBlue) {
                    maxBlue = numCubes;
                }
            }
        }
        power = maxRed * maxGreen * maxBlue;
        result += power;
    });
    console.log("The sum of the powers is " + result);
}