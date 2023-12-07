function partOne(input) {
    console.log("Part one");
    let rows = input.split("\n");
    let result = 0;
    rows.forEach((row) => {
        let digits = row.match(/[0-9]/g);
        let firstDigit = digits[0];
        let lastDigit = digits[digits.length - 1];
        result += Number.parseInt(firstDigit + lastDigit);
    });
    console.log("The sum of all of the calibration values is " + result);
}

function wordsToNumbers(text) {
    const conversion = {
        one: 1,
        two: 2,
        three: 3,
        four: 4,
        five: 5,
        six: 6,
        seven: 7,
        eight: 8,
        nine: 9
    };

    let result = "";
    let i = 0;
    while (i < text.length) {
        let wordFound = false;
        for (let word in conversion) {
            if (text.indexOf(word, i) === i) {
                result += conversion[word];
                wordFound = true;
                break;
            }
        }
        if (!wordFound) {
            result += text[i];
        }
        i++;
    }
    return result;
}

function partTwo(input) {
    console.log("Part two");
    let rows = input.split("\n");
    rows = rows.map((row) => wordsToNumbers(row));
    let result = 0;
    rows.forEach((row) => {
        let digits = row.match(/[1-9]/g);
        let firstDigit = digits[0];
        let lastDigit = digits[digits.length - 1];
        result += Number.parseInt(firstDigit + lastDigit);
    });
    console.log("The sum of all of the calibration values is " + result);
}