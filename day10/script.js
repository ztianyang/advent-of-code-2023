function nextCoord(rows, i, j, direction) {
    if (direction === "start") {
        let west = nextCoord(rows, i, j, "west");
        if (west[2] !== "unknown") {
            return west;
        }
        let east = nextCoord(rows, i, j, "east");
        if (east[2] !== "unknown") {
            return east;
        }
        let north = nextCoord(rows, i, j, "north");
        if (north[2] !== "unknown") {
            return north;
        }
        let south = nextCoord(rows, i, j, "south");
        if (south[2] !== "unknown") {
            return south;
        }
        return [i, j, "unknown"];
    }
    if (direction === "west") {
        if (j > 0) {
            let west = rows[i][j - 1];
            if (west === "F") {
                return [i, j - 1, "south"];
            }
            if (west === "L") {
                return [i, j - 1, "north"];
            }
            if (west === "-") {
                return [i, j - 1, "west"];
            }
            if (west === "S") {
                return [i, j - 1, "start"];
            }
        }
        return [i, j, "unknown"];
    }
    if (direction === "east") {
        if (j < rows[i].length - 1) {
            let east = rows[i][j + 1];
            if (east === "J") {
                return [i, j + 1, "north"];
            }
            if (east === "7") {
                return [i, j + 1, "south"];
            }
            if (east === "-") {
                return [i, j + 1, "east"];
            }
            if (east === "S") {
                return [i, j + 1, "start"];
            }
        }
        return [i, j, "unknown"];
    }
    if (direction === "north") {
        if (i > 0) {
            let north = rows[i - 1][j];
            if (north === "7") {
                return [i - 1, j, "west"];
            }
            if (north === "F") {
                return [i - 1, j, "east"];
            }
            if (north === "|") {
                return [i - 1, j, "north"];
            }
            if (north === "S") {
                return [i - 1, j, "start"];
            }
        }
        return [i, j, "unknown"];
    }
    if (direction === "south") {
        if (i < rows.length - 1) {
            let south = rows[i + 1][j];
            if (south === "|") {
                return [i + 1, j, "south"];
            }
            if (south === "J") {
                return [i + 1, j, "west"];
            }
            if (south === "L") {
                return [i + 1, j, "east"];
            }
            if (south === "S") {
                return [i + 1, j, "start"];
            }
        }
        return [i, j, "unknown"];
    }
    return [i, j, "unknown"];
}

function findStart(rows) {
    for (let i = 0; i < rows.length; i++) {
        for (let j = 0; j < rows[i].length; j++) {
            if (rows[i][j] === "S") {
                return [i, j];
            }
        }
    }
}

function partOne(input) {
    console.log("Part one");
    let rows = input.split("\n");
    if (rows[rows.length - 1] === "") {
        rows.pop();
    }
    let coords = [];
    coords.push(findStart(rows));
    let direction = "start";
    while (true) {
        if (coords.length > 1) {
            if (direction === "start") {
                break;
            }
        }
        if (direction === "unknown") {
            break;
        }
        let lastCoord = coords[coords.length - 1];
        let next = nextCoord(rows, lastCoord[0], lastCoord[1], direction);
        direction = next[2];
        coords.push([next[0], next[1]]);
    }
    let result = Math.floor(coords.length / 2);
    console.log("It takes " + result + " steps to get from the starting position to the point farthest from the starting position");
}

function getDirection(coord1, coord2) {
    if (coord1[1] < coord2[1]) {
        return 0;
    } else if (coord1[1] > coord2[1]) {
        return 180;
    } else if (coord1[0] > coord2[0]) {
        return 90;
    } else {
        return 270;
    }
}

function checkLeft(newMap, i, j) {
    for (let k = j - 1; k >= 0; k--) {
        if (newMap[i][k] === "0") {
            return false;
        }
    }
    return true;
}

function checkRight(newMap, i, j) {
    for (let k = j + 1; k < newMap[i].length; k++) {
        if (newMap[i][k] === "0") {
            return false;
        }
    }
    return true;
}

function checkUp(newMap, i, j) {
    for (let k = i - 1; k >= 0; k--) {
        if (newMap[k][j] === "0") {
            return false;
        }
    }
    return true;
}

function checkDown(newMap, i, j) {
    for (let k = i + 1; k < newMap.length; k++) {
        if (newMap[k][j] === "0") {
            return false;
        }
    }
    return true;
}

function partTwo(input) {
    console.log("Part two");
    let rows = input.split("\n");
    if (rows[rows.length - 1] === "") {
        rows.pop();
    }
    let coords = [];
    coords.push(findStart(rows));
    let direction = "start";
    while (true) {
        if (coords.length > 1) {
            if (direction === "start") {
                break;
            }
        }
        if (direction === "unknown") {
            break;
        }
        let lastCoord = coords[coords.length - 1];
        let next = nextCoord(rows, lastCoord[0], lastCoord[1], direction);
        direction = next[2];
        coords.push([next[0], next[1]]);
    }
    coords.pop();
    let newMap = [];
    let result = 0;
    for (let i = 0; i < rows.length; i++) {
        let newRow = "";
        for (let j = 0; j < rows[i].length; j++) {
            let inCoords = false;
            for (let k = 0; k < coords.length; k++) {
                if (i === coords[k][0] && j === coords[k][1]) {
                    inCoords = true;
                    break;
                }
            }
            if (inCoords) {
                newRow += "0";
            } else {
                newRow += ".";
            }
        }
        newMap.push(newRow);
    }
    for (let i = 0; i < newMap.length; i++) {
        for (let j = 0; j < newMap[i].length; j++) {
            if (newMap[i][j] === ".") {
                if (checkLeft(newMap, i, j) || checkRight(newMap, i, j) || checkUp(newMap, i, j) || checkDown(newMap, i, j)) {
                    newMap[i] = newMap[i].slice(0, j) + "," + newMap[i].slice(j + 1);
                } else {
                    let k = i - 1;
                    while (newMap[k][j] !== "0") {
                        k--;
                    }
                    let startIndex = 0;
                    while (coords[startIndex][0] !== k || coords[startIndex][1] !== j) {
                        startIndex++;
                    }
                    let coordIndex = startIndex;
                    let side = "";
                    let direction = getDirection(coords[coordIndex], coords[(coordIndex + 1) % coords.length]);
                    if (direction === 0) {
                        side = "right";
                    } else if (direction === 180) {
                        side = "left";
                    } else {
                        let previousDirection = getDirection(coords[(coords.length + (coordIndex - 1)) % coords.length], coords[coordIndex]);
                        if (previousDirection === 0) {
                            side = "right";
                        } else {
                            side = "left";
                        }
                    }
                    let outside = false;
                    while (true) {
                        let checkDirection = 0;
                        if (side === "left") {
                            checkDirection = (direction + 90) % 360;
                        } else {
                            checkDirection = (360 + (direction - 90)) % 360;
                        }
                        if (checkDirection === 0) {
                            if (checkRight(newMap, coords[coordIndex][0], coords[coordIndex][1])) {
                                outside = true;
                                break;
                            }
                        } else if (checkDirection === 90) {
                            if (checkUp(newMap, coords[coordIndex][0], coords[coordIndex][1])) {
                                outside = true;
                                break;
                            }
                        } else if (checkDirection === 180) {
                            if (checkLeft(newMap, coords[coordIndex][0], coords[coordIndex][1])) {
                                outside = true;
                                break;
                            }
                        } else {
                            if (checkDown(newMap, coords[coordIndex][0], coords[coordIndex][1])) {
                                outside = true;
                                break;
                            }
                        }
                        coordIndex = (coordIndex + 1) % coords.length;
                        direction = getDirection(coords[coordIndex], coords[(coordIndex + 1) % coords.length]);
                        if (coordIndex === startIndex) {
                            break;
                        }
                    }
                    if (!outside) {
                        result++;
                        newMap[i] = newMap[i].slice(0, j) + "!" + newMap[i].slice(j + 1);
                    }
                }
            }
        }
    }
    console.log("There are " + result + " tiles enclosed by the loop");
}