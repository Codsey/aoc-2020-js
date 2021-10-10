const path = require("path");
const fs = require("fs");

try {
  const data = fs
    .readFileSync(path.join(__dirname, "input.txt"), "utf-8")
    .split("\n");

  let numOfTrees = 0;
  let pointerX = 0;
  let pointerY = 0;

  const patterns = data.map((pattern) => {
    let escapedPattern = pattern.replace(/\r?\n|\r/g, "");
    return escapedPattern.repeat(data.length * 3);
  });

  patterns.map((pattern) => {
    if (pointerY > 0) {
      const isTree = pattern.split("")[pointerX];
      if (isTree === "#") {
        numOfTrees = numOfTrees + 1;
      }
    }
    pointerX = pointerX + 3;
    pointerY = pointerY + 1;
  });
  console.log(numOfTrees);
} catch (err) {
  console.error(err);
}
