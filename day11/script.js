function expandSpace(rows) {
    let emptyRows = [];
    let emptyColumns = [];

    for (let i = 0; i < rows.length; i++) {
        let empty = true;
        for (let j = 0; j < rows[i].length; j++) {
            if (rows[i][j] === "#") {
                empty = false;
                break;
            }
        }
        if (empty) {
            emptyRows.push(i);
        }
    }
    for (let j = 0; j < rows[0].length; j++) {
        let empty = true;
        for (let i = 0; i < rows.length; i++) {
            if (rows[i][j] === "#") {
                empty = false;
                break;
            }
        }
        if (empty) {
            emptyColumns.push(j);
        }
    }
    for (let i = 0; i < emptyRows.length; i++) {
        let newRow = "";
        for (let j = 0; j < rows[0].length; j++) {
            newRow = newRow + ".";
        }
        rows.splice(i + emptyRows[i], 0, newRow);
    }
    for (let i = 0; i < emptyColumns.length; i++) {
        for (let j = 0; j < rows.length; j++) {
            rows[j] = rows[j].slice(0, i + emptyColumns[i]) + "." + rows[j].slice(i + emptyColumns[i]);
        }
    }
}

function distance(p1, p2) {
    return Math.abs(p1[0] - p2[0]) + Math.abs(p1[1] - p2[1]);
}

function partOne(input) {
    console.log("Part one");
    let rows = input.split("\n");
    if (rows[rows.length - 1] === "") {
        rows.pop();
    }
    expandSpace(rows);
    let galaxies = [];
    for (let i = 0; i < rows.length; i++) {
        for (let j = 0; j < rows[i].length; j++) {
            if (rows[i][j] === "#") {
                galaxies.push([i, j]);
            }
        }
    }
    let result = 0;
    for (let i = 0; i < galaxies.length - 1; i++) {
        for (let j = i + 1; j < galaxies.length; j++) {
            result += distance(galaxies[i], galaxies[j]);
        }
    }
    console.log("The sum of the lengths is " + result);
}

function partTwo(input) {
    console.log("Part two");
    let rows = input.split("\n");
    if (rows[rows.length - 1] === "") {
        rows.pop();
    }
    let emptyRows = [];
    let emptyColumns = [];
    for (let i = 0; i < rows.length; i++) {
        let empty = true;
        for (let j = 0; j < rows[i].length; j++) {
            if (rows[i][j] === "#") {
                empty = false;
                break;
            }
        }
        if (empty) {
            emptyRows.push(i);
        }
    }
    for (let j = 0; j < rows[0].length; j++) {
        let empty = true;
        for (let i = 0; i < rows.length; i++) {
            if (rows[i][j] === "#") {
                empty = false;
                break;
            }
        }
        if (empty) {
            emptyColumns.push(j);
        }
    }
    let galaxies = [];
    for (let i = 0; i < rows.length; i++) {
        for (let j = 0; j < rows[i].length; j++) {
            if (rows[i][j] === "#") {
                galaxies.push([i, j]);
            }
        }
    }
    let result = 0;
    for (let i = 0; i < galaxies.length - 1; i++) {
        for (let j = i + 1; j < galaxies.length; j++) {
            let minX = Math.min(galaxies[i][1], galaxies[j][1]);
            let maxX = Math.max(galaxies[i][1], galaxies[j][1]);
            let minY = Math.min(galaxies[i][0], galaxies[j][0]);
            let maxY = Math.max(galaxies[i][0], galaxies[j][0]);

            let xDistance = maxX - minX;
            let yDistance = maxY - minY;
            for (let k = 0; k < emptyRows.length; k++) {
                if (minY < emptyRows[k] && emptyRows[k] < maxY) {
                    yDistance += 999999;
                }
            }
            for (let k = 0; k < emptyColumns.length; k++) {
                if (minX < emptyColumns[k] && emptyColumns[k] < maxX) {
                    xDistance += 999999;
                }
            }
            result += xDistance + yDistance;
        }
    }
    console.log("The sum of the lengths is " + result);
}