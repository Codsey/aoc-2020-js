const path = require("path");
const fs = require("fs");

try {
  const data = fs
    .readFileSync(path.join(__dirname, "input.txt"), "utf-8")
    .split("\n")
    .map((n) => parseInt(n, 10));

  const sumExists = (startPoint, num) => {
    for (let i = startPoint; i < startPoint + 25; i++) {
      for (let j = startPoint + 1; j < startPoint + 25; j++) {
        if (data[i] + data[j] === num) return true;
      }
    }
  };

  let invalidNumber;

  for (let i = 25; i < data.length; i++) {
    if (!sumExists(i - 25, data[i])) {
      invalidNumber = data[i];
      break;
    }
  }
  let acc = 0;
  let setOfValues = [];
  let startPoint = 0;

  for (let i = 0; i < data.length; i++) {
    acc += data[i];
    setOfValues.push(data[i]);

    if (acc > invalidNumber) {
      acc = 0;
      setOfValues = [];
      i = startPoint++;
    } else if (acc === invalidNumber && data[i] !== invalidNumber) {
      const sortedSetOfvalues = setOfValues.sort();
      console.log(
        sortedSetOfvalues[0] + sortedSetOfvalues[sortedSetOfvalues.length - 1]
      );
    }
  }
} catch (err) {
  console.error(err);
}
