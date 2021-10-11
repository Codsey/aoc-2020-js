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

  const findMissing = (num) => {
    const max = Math.max(...num);
    const min = Math.min(...num);
    const missing = [];

    for (let i = min; i <= max; i++) {
      if (!num.includes(i)) {
        missing.push(i);
      }
    }
    return missing;
  };

  let missingRowForEveryCol = [];

  for (let i = 0; i < 8; i++) {
    const filtered = parsedPasses.filter((pass) => {
      return pass.col == [i];
    });
    const rowArr = filtered.map((pass) => pass.row);
    missingRowForEveryCol.push(rowArr);
  }

  missingRowForEveryCol.map((rows, index) => {
    const emptyRow = findMissing(rows);
    if (emptyRow.length > 0) {
      console.log({
        row: emptyRow[0],
        col: index,
        seatid: emptyRow[0] * 8 + index,
      });
    }
  });
} catch (err) {
  console.error(err);
}
