const path = require("path");
const fs = require("fs");

try {
  const data = fs
    .readFileSync(path.join(__dirname, "input.txt"), "utf-8")
    .split("\n");

  const patterns = data.map((pattern) => {
    let escapedPattern = pattern.replace(/\r?\n|\r/g, "");
    return escapedPattern.repeat(data.length * 3);
  });

  const getTreesBySlop = (x, y) => {
    let numOfTrees = 0;
    let pointerX = 0;
    let pointerY = 0;

    patterns.map((pattern, index) => {
      if (index === pointerY) {
        if (pointerY > 0) {
          const isTree = pattern.split("")[pointerX];
          if (isTree === "#") {
            numOfTrees = numOfTrees + 1;
          }
        }
        pointerX = pointerX + x;
        pointerY = pointerY + y;
      }
    });

    return numOfTrees;
  };

  console.log(
    getTreesBySlop(1, 1) *
      getTreesBySlop(3, 1) *
      getTreesBySlop(5, 1) *
      getTreesBySlop(7, 1) *
      getTreesBySlop(1, 2)
  );
} catch (err) {
  console.error(err);
}
