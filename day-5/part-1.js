const path = require("path");
const fs = require("fs");

try {
  const data = fs
    .readFileSync(path.join(__dirname, "input.txt"), "utf-8")
    .split("\n");

  const getNewRange = (currentRange, position) => {
    const range = (currentRange[1] - currentRange[0]) / 2;
    if (position === "F" || position === "L") {
      return [currentRange[0], currentRange[0] + Math.floor(range)];
    } else if (position === "B" || position === "R") {
      return [currentRange[1] - Math.floor(range), currentRange[1]];
    }
  };

  const parsedPasses = data.map((pass) => {
    const input = pass.replace(/\r?\n|\r/g, "").split("");
    const lastRow = input[6];
    const lastCol = input[9];

    let currentRange = [0, 127];
    let currentColRange = [0, 7];
    for (let i = 0; i < input.length; i++) {
      if (i < 7) {
        currentRange = getNewRange(currentRange, input[i]);
      } else {
        currentColRange = getNewRange(currentColRange, input[i]);
      }
    }

    return {
      row: currentRange[lastRow === "F" ? 0 : 1],
      col: currentColRange[lastCol === "L" ? 0 : 1],
      seatid:
        currentRange[lastRow === "F" ? 0 : 1] * 8 +
        currentColRange[lastCol === "L" ? 0 : 1],
    };
  });
  console.log(
    Math.max.apply(
      Math,
      parsedPasses.map(function (o) {
        return o.seatid;
      })
    )
  );
} catch (err) {
  console.error(err);
}
