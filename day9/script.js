function partOne(input) {
    console.log("Part one");
    let rows = input.split("\n");
    if (rows[rows.length - 1] == "") {
        rows.pop();
    }
    let result = 0;
    for (let i = 0; i < rows.length; i++) {
        let numbers = rows[i].split(" ").map((num) => Number.parseInt(num));
        let diffs = [];
        diffs.push(numbers);
        while (true) {
            let j = diffs.length - 1;
            if (diffs[j].length === 1) {
                break;
            }
            let allZeros = true;
            for (let k = 0; k < diffs[j].length; k++) {
                if (diffs[j][k] !== 0) {
                    allZeros = false;
                }
            }
            if (allZeros) {
                break;
            }
            let newDiff = [];
            for (let k = 1; k < diffs[j].length; k++) {
                newDiff.push(diffs[j][k] - diffs[j][k - 1]);
            }
            diffs.push(newDiff);
        }
        if (diffs[diffs.length - 1].length === 1 && diffs[diffs.length - 1][0] !== 0) {
            diffs.push([0]);
        }
        diffs[diffs.length - 1].push(0);
        for (let j = diffs.length - 2; j >= 0; j--) {
            let diff = diffs[j + 1][diffs[j + 1].length - 1];
            let last = diffs[j][diffs[j].length - 1];
            diffs[j].push(last + diff);
        }
        result += diffs[0][diffs[0].length - 1];
    }
    console.log("The sum of the extrapolated values is " + result);
}

function partTwo(input) {
    console.log("Part two");
    let rows = input.split("\n");
    if (rows[rows.length - 1] == "") {
        rows.pop();
    }
    let result = 0;
    for (let i = 0; i < rows.length; i++) {
        let numbers = rows[i].split(" ").map((num) => Number.parseInt(num));
        let diffs = [];
        diffs.push(numbers);
        while (true) {
            let j = diffs.length - 1;
            if (diffs[j].length === 1) {
                break;
            }
            let allZeros = true;
            for (let k = 0; k < diffs[j].length; k++) {
                if (diffs[j][k] !== 0) {
                    allZeros = false;
                }
            }
            if (allZeros) {
                break;
            }
            let newDiff = [];
            for (let k = 1; k < diffs[j].length; k++) {
                newDiff.push(diffs[j][k] - diffs[j][k - 1]);
            }
            diffs.push(newDiff);
        }
        if (diffs[diffs.length - 1].length === 1 && diffs[diffs.length - 1][0] !== 0) {
            diffs.push([0]);
        }
        diffs[diffs.length - 1].push(0);
        for (let j = diffs.length - 2; j >= 0; j--) {
            let diff = diffs[j + 1][0];
            let first = diffs[j][0];
            diffs[j].splice(0, 0, first - diff);
        }
        result += diffs[0][0];
    }
    console.log("The sum of the extrapolated values is " + result);
}