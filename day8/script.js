function partOne(input) {
    console.log("Part one");
    let row = input.split("\n");
    if (row[row.length - 1] === "") {
        row.pop();
    }
    let instruction = row[0];
    let instructionIndex = 0;
    let result = 0;
    let startLocations = [];
    let destLocations = [];
    for (let i = 2; i < row.length; i++) {
        let locations = row[i].match(/[A-Z]+/g);
        startLocations.push(locations[0]);
        destLocations.push([locations[1], locations[2]]);
    }
    let currentLocation = "AAA";
    while (currentLocation !== "ZZZ") {
        let mapIndex = startLocations.indexOf(currentLocation);
        if (instruction[instructionIndex] === "L") {
            currentLocation = destLocations[mapIndex][0];
        } else {
            currentLocation = destLocations[mapIndex][1];
        }
        result++;
        instructionIndex = (instructionIndex + 1) % instruction.length;
    }
    console.log(result + " steps are required to reach ZZZ");
}

function isPrime(num) {
    if (num === 1) {
        return false;
    }
    for (let i = 2; i < num; i++) {
        if (num % i === 0) {
            return false;
        }
    }
    return true;
}

function lcm(numbers) {
    let result = 1;
    let factor = 2;
    while (true) {
        if (isPrime(factor)) {
            while (true) {
                let factorFound = false;
                for (let i = 0; i < numbers.length; i++) {
                    if (numbers[i] % factor === 0) {
                        numbers[i] = numbers[i] / factor;
                        factorFound = true;
                    }
                }
                if (!factorFound) {
                    break;
                }
                result *= factor;
            }
        }
        factor++;
        let allOne = true;
        for (let i = 0; i < numbers.length; i++) {
            if (numbers[i] !== 1) {
                allOne = false;
            }
        }
        if (allOne) {
            break;
        }
    }
    return result;
}

function partTwo(input) {
    console.log("Part two");
    let row = input.split("\n");
    if (row[row.length - 1] === "") {
        row.pop();
    }
    let instruction = row[0];
    let result = 0;
    let startLocations = [];
    let destLocations = [];
    for (let i = 2; i < row.length; i++) {
        let locations = row[i].match(/[A-Z]+/g);
        startLocations.push(locations[0]);
        destLocations.push([locations[1], locations[2]]);
    }
    let currentLocations = [];
    for (let i = 0; i < startLocations.length; i++) {
        if (startLocations[i][2] === "A") {
            currentLocations.push(startLocations[i]);
        }
    }
    let numMoves = [];
    for (let i = 0; i < currentLocations.length; i++) {
        let moves = 0;
        let instructionIndex = 0;
        while (currentLocations[i][2] !== "Z") {
            let mapIndex = startLocations.indexOf(currentLocations[i]);
            if (instruction[instructionIndex] === "L") {
                currentLocations[i] = destLocations[mapIndex][0];
            } else {
                currentLocations[i] = destLocations[mapIndex][1];
            }
            moves++;
            instructionIndex = (instructionIndex + 1) % instruction.length;
        }
        numMoves.push(moves);
    }
    result = lcm(numMoves);
    console.log("It takes " + result + " steps to land on only nodes that ends with Z");
}