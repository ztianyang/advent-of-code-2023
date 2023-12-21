function quadFormula(a, b, c) {
    let discriminant = b * b - 4 * a * c;
    return [(-b - Math.sqrt(discriminant)) / (2 * a), (-b + Math.sqrt(discriminant)) / (2 * a)];
}

function partOne(input) {
    console.log("Part one");
    let rows = input.split("\n");
    let times = rows[0].match(/[0-9]+/g).map((time) => Number.parseInt(time));
    let distances = rows[1].match(/[0-9]+/g).map((distance) => Number.parseInt(distance));
    let result = 1;
    for (let i = 0; i < times.length; i++) {
        let roots = quadFormula(1, -times[i], distances[i]);
        roots[0] = Math.floor(roots[0]);
        roots[1] = Math.ceil(roots[1]);
        result *= (roots[1] - roots[0] - 1);
    }
    console.log("The product of the number of ways to beat the record is " + result);
}

function partTwo(input) {
    console.log("Part two");
    let rows = input.split("\n");
    let time = Number.parseInt(rows[0].match(/[0-9]/g).join(""));
    let distance = Number.parseInt(rows[1].match(/[0-9]/g).join(""));
    let roots = quadFormula(1, -time, distance);
    let result = Math.ceil(roots[1]) - Math.floor(roots[0]) - 1;
    console.log("The number of ways to beat the record is " + result);
}