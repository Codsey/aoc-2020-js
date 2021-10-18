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

  for (let i = 25; i < data.length; i++) {
    if (!sumExists(i - 25, data[i])) console.log(data[i]);
  }
} catch (err) {
  console.error(err);
}
