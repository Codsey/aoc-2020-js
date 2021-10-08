const path = require("path");
const fs = require("fs");

try {
  const data = fs
    .readFileSync(path.join(__dirname, "input.txt"), "utf-8")
    .split("\n");
  const inputArr = data.map((num) => {
    return parseInt(num, 10);
  });
  for (let i = 0; i < inputArr.length; i++) {
    for (let j = i + 1; j < inputArr.length; j++) {
      for (let k = j + 1; k < inputArr.length; k++) {
        if (inputArr[i] + inputArr[j] + inputArr[k] === 2020) {
          console.log(
            `The three entries that sum to 2020 are ${inputArr[i]}, ${inputArr[j]} and ${inputArr[k]}`
          );
          console.log(
            `Multiplying them together produces ${
              inputArr[i] * inputArr[j] * inputArr[k]
            } `
          );
        }
      }
    }
  }
} catch (err) {
  console.error(err);
}
