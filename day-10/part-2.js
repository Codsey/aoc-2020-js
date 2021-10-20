const path = require("path");
const fs = require("fs");

try {
  const data = fs
    .readFileSync(path.join(__dirname, "input.txt"), "utf-8")
    .split("\n")
    .map((n) => parseInt(n, 10));

  var arrangements = 1;
  data.sort(function (a, b) {
    return a - b;
  });
  data.push(data[data.length - 1] + 3);
  var tribonacci = [0, 1, 2, 4, 7, 13, 24]; //INDEX corresponds to how many arrangements for that many integers
  for (let i = 7; i < 80; i++) {
    var newElem = tribonacci[i - 1] + tribonacci[i - 2] + tribonacci[i - 3];
    tribonacci.push(newElem);
  }
  var oneJoltDifferences = 0;
  for (let i = 0; i < data.length; i++) {
    var diff = i == 0 ? data[i] - 0 : data[i] - data[i - 1];
    if (diff == 1) {
      oneJoltDifferences++;
    } else {
      if (oneJoltDifferences > 0) {
        arrangements *= tribonacci[oneJoltDifferences];
        oneJoltDifferences = 0;
      }
    }
  }
  console.log(arrangements);

  //   console.log(Day10Part2(data));
} catch (err) {
  console.error(err);
}
