function getPermutations(numbers, length) {
    if (numbers.length === 1) {
        if (numbers[0] > length) {
            return [];
        }
        let permutations = [];
        for (let i = 0; i <= length - numbers[0]; i++) {
            let permutation = "";
            for (let j = 0; j < i; j++) {
                permutation += ".";
            }
            for (let j = 0; j < numbers[0]; j++) {
                permutation += "#";
            }
            for (let j = i + numbers[0]; j < length; j++) {
                permutation += ".";
            }
            permutations.push(permutation);
        }
        return permutations;
    } else {
        let permutations = [];
        let minSubLength = 0;
        for (let i = 1; i < numbers.length; i++) {
            minSubLength += numbers[i];
        }
        minSubLength += numbers.length - 2;
        if (numbers[0] + 1 + minSubLength > length) {
            return [];
        }
        for (let i = 0; i <= length - numbers[0] - 1 - minSubLength; i++) {
            let start = "";
            for (let j = 0; j < i; j++) {
                start += ".";
            }
            for (let j = 0; j < numbers[0]; j++) {
                start += "#";
            }
            start += ".";
            let subPermutations = getPermutations(numbers.slice(1), length - i - numbers[0] - 1);
            for (let j = 0; j < subPermutations.length; j++) {
                permutations.push(start + subPermutations[j]);
            }
        }
        return permutations;
    }
}

function checkPermutation(permutation, record) {
    if (permutation.length !== record.length) {
        return false;
    }
    for (let i = 0; i < permutation.length; i++) {
        if (record[i] === "#") {
            if (permutation[i] !== "#") {
                return false;
            }
        } else if (record[i] === ".") {
            if (permutation[i] !== ".") {
                return false;
            }
        }
    }
    return true;
}

function partOne(input) {
    console.log("Part one");
    let rows = input.split("\n");
    if (rows[rows.length - 1] === "") {
        rows.pop();
    }
    let result = 0;
    for (let i = 0; i < rows.length; i++) {
        let record = rows[i].split(" ")[0];
        let numbers = rows[i].split(" ")[1].split(",").map((num) => Number.parseInt(num));
        let permutations = getPermutations(numbers, record.length);
        for (let j = 0; j < permutations.length; j++) {
            if (checkPermutation(permutations[j], record)) {
                result++;
            }
        }
    }
    console.log("The sum of the counts is " + result);
}

function unfoldRecord(record) {
    let result = "";
    for (let i = 0; i < 5; i++) {
        result += record;
        if (i < 4) {
            result += "?";
        }
    }
    return result;
}

function unfoldNumbers(numbers) {
    let result = [];
    for (let i = 0; i < 5; i++) {
        for (let j = 0; j < numbers.length; j++) {
            result.push(numbers[j]);
        }
    }
    return result;
}

function partTwo(input) {
    let rows = input.split("\n");
    if (rows[rows.length - 1] === "") {
        rows.pop();
    }
    let result = 0;
    for (let i = 0; i < rows.length; i++) {
        let record = rows[i].split(" ")[0];
        let numbers = rows[i].split(" ")[1].split(",").map((num) => Number.parseInt(num));
        let permutations = getPermutations(numbers, record.length);
        let validPermutations = [];
        for (let j = 0; j < permutations.length; j++) {
            if (checkPermutation(permutations[j], record)) {
                validPermutations.push(permutations[j]);
            }
        }
        console.log(validPermutations);
        result += validPermutations.length;
    }
    console.log(result);
}