const path = require("path");
const fs = require("fs");

try {
  const data = fs
    .readFileSync(path.join(__dirname, "input.txt"), "utf-8")
    .split("\n")
    .map((n) => parseInt(n, 10));

  data.sort(function (a, b) {
    return a - b;
  });

  data.push(data[data.length - 1] + 3);

  let oneJoltDiffernce = 0;
  let threeJoltDifference = 0;

  let pointer = 0;

  for (let i = 0; i < data.length; i++) {
    const availableAdapters = data.filter(
      (num) => num > pointer && num <= pointer + 3
    );
    if (availableAdapters[0] === pointer + 1) {
      oneJoltDiffernce++;
      pointer = availableAdapters[0];
    } else if (availableAdapters[0] === pointer + 3) {
      threeJoltDifference++;
      pointer = availableAdapters[0];
    } else if (i === data.length) {
      threeJoltDifference++;
    }
  }

  console.log(oneJoltDiffernce * threeJoltDifference);
} catch (err) {
  console.error(err);
}
