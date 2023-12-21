function sortHands(hand1, hand2) {
    let hand1Str = hand1["handStr"];
    let hand2Str = hand2["handStr"];
    let cardRank = ["2", "3", "4", "5", "6", "7", "8", "9", "T", "J", "Q", "K", "A"];
    for (let i = 0; i < hand1Str.length; i++) {
        if (cardRank.indexOf(hand1Str[i]) < cardRank.indexOf(hand2Str[i])) {
            return 1;
        } else if (cardRank.indexOf(hand1Str[i]) > cardRank.indexOf(hand2Str[i])) {
            return -1;
        }
    }
    return 0;
}

function sortHandsWithJoker(hand1, hand2) {
    let hand1Str = hand1["handStr"];
    let hand2Str = hand2["handStr"];
    let cardRank = ["J", "2", "3", "4", "5", "6", "7", "8", "9", "T", "Q", "K", "A"];
    for (let i = 0; i < hand1Str.length; i++) {
        if (cardRank.indexOf(hand1Str[i]) < cardRank.indexOf(hand2Str[i])) {
            return 1;
        } else if (cardRank.indexOf(hand1Str[i]) > cardRank.indexOf(hand2Str[i])) {
            return -1;
        }
    }
    return 0;
}

function partOne(input) {
    console.log("Part one");
    let rows = input.split("\n");
    if (rows[rows.length - 1] === "") {
        rows.pop();
    }
    let hands = [];
    let bids = [];
    for (let i = 0; i < rows.length; i++) {
        hands.push(rows[i].split(" ")[0]);
        bids.push(Number.parseInt(rows[i].split(" ")[1]));
    }
    let handsObj = [];
    for (let i = 0; i < hands.length; i++) {
        let hand = hands[i];
        let handObj = {};
        for (let j = 0; j < hand.length; j++) {
            if (hand[j] in handObj) {
                handObj[hand[j]]++;
            } else {
                handObj[hand[j]] = 1;
            }
        }
        handObj["handStr"] = hand;
        handObj["bid"] = bids[i];
        handsObj.push(handObj);
    }
    let ranking = [[], [], [], [], [], [], []];
    for (let i = 0; i < handsObj.length; i++) {
        let hand = handsObj[i];
        let cardNums = [];
        for (let card in hand) {
            if (card !== "handStr" && card !== "bid") {
                cardNums.push(hand[card]);
            }
        }
        cardNums.sort((a, b) => a - b);
        let highestCardCount = cardNums[cardNums.length - 1];
        if (highestCardCount === 5) {
            ranking[0].push(hand);
        } else if (highestCardCount === 4) {
            ranking[1].push(hand);
        } else if (highestCardCount === 3) {
            if (cardNums.length === 2) {
                ranking[2].push(hand);
            } else {
                ranking[3].push(hand);
            }
        } else if (highestCardCount === 2) {
            if (cardNums.length === 3) {
                ranking[4].push(hand);
            } else {
                ranking[5].push(hand);
            }
        } else {
            ranking[6].push(hand);
        }
    }
    for (let i = 0; i < ranking.length; i++) {
        ranking[i].sort(sortHands);
    }
    let result = 0;
    let counter = 1;
    for (let i = ranking.length - 1; i >= 0; i--) {
        for (let j = ranking[i].length - 1; j >= 0; j--) {
            result += counter * ranking[i][j]["bid"];
            counter++;
        }
    }
    console.log("The total winnings is " + result);
}

function partTwo(input) {
    console.log("Part two");
    let rows = input.split("\n");
    if (rows[rows.length - 1] === "") {
        rows.pop();
    }
    let hands = [];
    let bids = [];
    for (let i = 0; i < rows.length; i++) {
        hands.push(rows[i].split(" ")[0]);
        bids.push(Number.parseInt(rows[i].split(" ")[1]));
    }
    let handsObj = [];
    for (let i = 0; i < hands.length; i++) {
        let hand = hands[i];
        let handObj = {};
        for (let j = 0; j < hand.length; j++) {
            if (hand[j] in handObj) {
                handObj[hand[j]]++;
            } else {
                handObj[hand[j]] = 1;
            }
        }
        handObj["handStr"] = hand;
        handObj["bid"] = bids[i];
        handsObj.push(handObj);
    }
    let ranking = [[], [], [], [], [], [], []];
    for (let i = 0; i < handsObj.length; i++) {
        let hand = handsObj[i];
        let cardNums = [];
        let numJokers = 0;
        for (let card in hand) {
            if (card !== "handStr" && card !== "bid") {
                if (card !== "J") {
                    cardNums.push(hand[card]);
                } else {
                    numJokers = hand[card];
                }
            }
        }
        cardNums.sort((a, b) => a - b);
        if (cardNums.length >= 1) {
            cardNums[cardNums.length - 1] += numJokers;
        } else {
            cardNums.push(numJokers);
        }
        let highestCardCount = cardNums[cardNums.length - 1];
        if (highestCardCount === 5) {
            ranking[0].push(hand);
        } else if (highestCardCount === 4) {
            ranking[1].push(hand);
        } else if (highestCardCount === 3) {
            if (cardNums.length === 2) {
                ranking[2].push(hand);
            } else {
                ranking[3].push(hand);
            }
        } else if (highestCardCount === 2) {
            if (cardNums.length === 3) {
                ranking[4].push(hand);
            } else {
                ranking[5].push(hand);
            }
        } else {
            ranking[6].push(hand);
        }
    }
    for (let i = 0; i < ranking.length; i++) {
        ranking[i].sort(sortHandsWithJoker);
    }
    let result = 0;
    let counter = 1;
    for (let i = ranking.length - 1; i >= 0; i--) {
        for (let j = ranking[i].length - 1; j >= 0; j--) {
            result += counter * ranking[i][j]["bid"];
            counter++;
        }
    }
    console.log("The new total winnings is " + result);
}