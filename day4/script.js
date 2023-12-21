function partOne(input) {
    console.log("Part one");
    let rows = input.split("\n");
    if (rows[rows.length - 1] === "") {
        rows.pop();
    }
    let result = 0;

    for (let i = 0; i < rows.length; i++) {
        let card = rows[i];
        let numbers = card.split(": ")[1];
        let winningNumbers = numbers.split(" | ")[0].split(" ");
        let wins = 0;
        winningNumbers = winningNumbers.filter((num) => num !== "");
        let numbersIHave = numbers.split(" | ")[1].split(" ");
        numbersIHave = numbersIHave.filter((num) => num !== "");
        for (let j = 0; j < numbersIHave.length; j++) {
            for (let k = 0; k < winningNumbers.length; k++) {
                if (numbersIHave[j] === winningNumbers[k]) {
                    wins++;
                    break;
                }
            }
        }
        if (wins > 0) {
            result += Math.pow(2, wins - 1);
        }
    }
    console.log("The number of points in total is " + result);
}

function partTwo(input) {
    console.log("Part two");
    let rows = input.split("\n");
    if (rows[rows.length - 1] === "") {
        rows.pop();
    }
    let cardsWins = [];
    let result = 0;

    for (let i = 0; i < rows.length; i++) {
        let card = rows[i];
        let numbers = card.split(": ")[1];
        let winningNumbers = numbers.split(" | ")[0].split(" ");
        let wins = 0;
        winningNumbers = winningNumbers.filter((num) => num !== "");
        let numbersIHave = numbers.split(" | ")[1].split(" ");
        numbersIHave = numbersIHave.filter((num) => num !== "");
        for (let j = 0; j < numbersIHave.length; j++) {
            for (let k = 0; k < winningNumbers.length; k++) {
                if (numbersIHave[j] === winningNumbers[k]) {
                    wins++;
                    break;
                }
            }
        }
        cardsWins.push(wins);
    }
    let scratchcardsWon = [];
    for (let i = 0; i < cardsWins.length; i++) {
        scratchcardsWon.push(0);
    }
    for (let i = 0; i < cardsWins.length; i++) {
        let wins = cardsWins[i];
        scratchcardsWon[i]++;
        for (let j = 1; j <= wins; j++) {
            if (i + j < scratchcardsWon.length) {
                scratchcardsWon[i + j] += scratchcardsWon[i];
            }
        }
    }
    result = scratchcardsWon.reduce((acc, current) => acc + current, 0);
    console.log("The total scratchcards won is " + result);
}