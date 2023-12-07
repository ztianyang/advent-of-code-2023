function getSurroundingChars(rows, row, col, length) {
    let startIndex = col - 1;
    if (startIndex < 0) {
        startIndex = 0;
    }
    let endIndex = col + length + 1;
    if (endIndex > rows[row].length) {
        endIndex = rows[row].length;
    }
    let result = "";
    if (row > 0) {
        result += rows[row - 1].slice(startIndex, endIndex);
    }
    result += rows[row].slice(startIndex, endIndex);
    if (row + 1 < rows.length) {
        result += rows[row + 1].slice(startIndex, endIndex);
    }
    return result;
}

function partOne(input) {
    console.log("Part one");
    let rows = input.split("\n");
    let result = 0;
    for (let i = 0; i < rows.length; i++) {
        let j = 0;
        let length = 0;
        let number = "";
        let row = rows[i];
        while (j < row.length) {
            let digit = row[j].match(/[0-9]/);
            if (digit) {
                digit = digit[0];
                number += digit;
                length++;
            } else {
                if (number !== "") {
                    let surroundingChars = getSurroundingChars(rows, i, j - length, length);
                    let symbols = surroundingChars.match(/[^0-9.]/g);
                    if (symbols) {
                        result += Number.parseInt(number);
                    }
                }
                number = "";
                length = 0;
            }
            j++;
        }
        if (number !== "") {
            let surroundingChars = getSurroundingChars(rows, i, j - length, length);
            let symbols = surroundingChars.match(/[^0-9.]/g);
            if (symbols) {
                result += Number.parseInt(number);
            }
        }
    }
    console.log("The sum of all of the part numbers is " + result);
}

function numSearchLeft(row, col) {
    if (!row[col].match(/[0-9]/)) {
        return "";
    }
    let result = row[col];
    let i = col - 1;
    while (i >= 0 && row[i].match(/[0-9]/)) {
        result = row[i] + result;
        i--;
    }
    return result;
}

function numSearchRight(row, col) {
    if (!row[col].match(/[0-9]/)) {
        return "";
    }
    let result = row[col];
    let i = col + 1;
    while (i < row.length && row[i].match(/[0-9]/)) {
        result += row[i];
        i++;
    }
    return result;
}

function numSearch(row, col) {
    if (!row[col].match(/[0-9]/)) {
        return "";
    }
    return numSearchLeft(row, col) + numSearchRight(row, col).slice(1);
}

function getAdjacentNums(rows, row, col) {
    let result = [];
    // Top row
    if (row - 1 >= 0) {
        if (rows[row - 1][col].match(/[0-9]/)) {
            result.push(Number.parseInt(numSearch(rows[row - 1], col)));
        } else {
            if (col - 1 >= 0 && rows[row - 1][col - 1].match(/[0-9]/)) {
                result.push(Number.parseInt(numSearchLeft(rows[row - 1], col - 1)));
            }
            if (col + 1 < rows[row - 1].length && rows[row - 1][col + 1].match(/[0-9]/)) {
                result.push(Number.parseInt(numSearchRight(rows[row - 1], col + 1)));
            }
        }
    }
    // Middle row
    if (col - 1 >= 0 && rows[row][col - 1].match(/[0-9]/)) {
        result.push(Number.parseInt(numSearchLeft(rows[row], col - 1)));
    }
    if (col + 1 < rows[row].length && rows[row][col + 1].match(/[0-9]/)) {
        result.push(Number.parseInt(numSearchRight(rows[row], col + 1)));
    }
    // Bottom row
    if (row + 1 < rows.length) {
        if (rows[row + 1][col].match(/[0-9]/)) {
            result.push(Number.parseInt(numSearch(rows[row + 1], col)));
        } else {
            if (col - 1 >= 0 && rows[row + 1][col - 1].match(/[0-9]/)) {
                result.push(Number.parseInt(numSearchLeft(rows[row + 1], col - 1)));
            }
            if (col + 1 < rows[row + 1].length && rows[row + 1][col + 1].match(/[0-9]/)) {
                result.push(Number.parseInt(numSearchRight(rows[row + 1], col + 1)));
            }
        }
    }
    return result;
}

function partTwo(input) {
    console.log("Part two");
    let rows = input.split("\n");
    let result = 0;
    for (let i = 0; i < rows.length; i++) {
        let row = rows[i];
        for (let j = 0; j < row.length; j++) {
            if (rows[i][j] === "*") {
                let numbers = getAdjacentNums(rows, i, j);
                if (numbers.length === 2) {
                    result += numbers[0] * numbers[1];
                }
            }
        }
    }
    console.log("The sum of all of the gear ratios is " + result);
}