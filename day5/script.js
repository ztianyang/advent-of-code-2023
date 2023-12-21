function partOne(input) {
    console.log("Part one");
    let rows = input.split("\n");
    if (rows[rows.length - 1] === "") {
        rows.pop();
    }
    let seeds = rows[0].split(": ")[1].split(" ").map((seed) => Number.parseInt(seed));
    let mappings = [];
    let row = 3;
    let mapping = [];
    while (row < rows.length) {
        let numbers = rows[row].split(" ").map((num) => Number.parseInt(num));
        mapping.push(numbers);
        if (row === rows.length - 1 || rows[row + 1] !== "") {
            row++;
        } else {
            mappings.push(mapping);
            mapping = [];
            row += 3;
        }
    }
    mappings.push(mapping);
    let locations = [];
    for (let i = 0; i < seeds.length; i++) {
        let currentNum = seeds[i];
        for (let j = 0; j < mappings.length; j++) {
            mapping = mappings[j];
            for (let k = 0; k < mapping.length; k++) {
                let destRangeStart = mapping[k][0];
                let sourceRangeStart = mapping[k][1];
                let rangeLength = mapping[k][2];
                if (currentNum >= sourceRangeStart && currentNum < sourceRangeStart + rangeLength) {
                    currentNum = destRangeStart + (currentNum - sourceRangeStart);
                    break;
                }
            }
        }
        locations.push(currentNum);
    }
    let result = locations.reduce((acc, location) => {
        if (location < acc) {
            return location;
        } else {
            return acc;
        }
    });
    console.log("The lowest location number that corresponds to any of the initial seed numbers is " + result);
}

function mappingRangeToRanges(mapping, range) {
    let start = range[0];
    let end = range[1];
    let result = [];
    for (let i = 0; i < mapping.length; i++) {
        let destRangeStart = mapping[i][0];
        let sourceRangeStart = mapping[i][1];
        let sourceRangeEnd = mapping[i][2];
        if (start >= sourceRangeStart && start <= sourceRangeEnd) {
            if (end <= sourceRangeEnd) {
                result.push([destRangeStart + (start - sourceRangeStart), destRangeStart + (end - sourceRangeStart)]);
                return result;
            } else {
                result.push([destRangeStart + (start - sourceRangeStart), destRangeStart + (sourceRangeEnd - sourceRangeStart)]);
                start = sourceRangeEnd + 1;
            }
        }
    }
    result.push([start, end]);
    return result;
}

function partTwo(input) {
    console.log("Part two");
    let rows = input.split("\n");
    if (rows[rows.length - 1] === "") {
        rows.pop();
    }
    let seedInputs = rows[0].split(": ")[1].split(" ").map((seed) => Number.parseInt(seed));
    for (let i = 1; i < seedInputs.length; i += 2) {
        seedInputs[i] = seedInputs[i - 1] + seedInputs[i] - 1;
    }
    let ranges = [];
    for (let i = 0; i < seedInputs.length; i += 2) {
        ranges.push([seedInputs[i], seedInputs[i + 1]]);
    }
    let mappings = [];
    let row = 3;
    let mapping = [];
    while (row < rows.length) {
        let numbers = rows[row].split(" ").map((num) => Number.parseInt(num));
        mapping.push(numbers);
        if (row === rows.length - 1 || rows[row + 1] !== "") {
            row++;
        } else {
            mappings.push(mapping);
            mapping = [];
            row += 3;
        }
    }
    mappings.push(mapping);
    for (let i = 0; i < mappings.length; i++) {
        for (let j = 0; j < mappings[i].length; j++) {
            mappings[i][j][2] = mappings[i][j][1] + mappings[i][j][2] - 1;
        }
        mappings[i].sort((map1, map2) => map1[1] - map2[1]);
        let k = 0;
        let min = 0;
        while (k < mappings[i].length) {
            if (min < mappings[i][k][1]) {
                mappings[i].splice(k, 0, [min, min, mappings[i][k][1] - 1]);
                min = mappings[i][k + 1][2] + 1;
                k++;
            } else {
                min = mappings[i][k][2] + 1;
            }
            k++;
        }
    }
    for (let i = 0; i < mappings.length; i++) {
        let newRanges = [];
        for (let j = 0; j < ranges.length; j++) {
            newRanges = newRanges.concat(mappingRangeToRanges(mappings[i], ranges[j]));
        }
        ranges = newRanges;
    }
    let result = ranges.reduce((acc, range) => {
        if (range[0] < acc) {
            return range[0];
        } else {
            return acc;
        }
    }, ranges[0][0]);
    console.log("The lowest location number is " + result);
}