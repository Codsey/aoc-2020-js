const path = require("path");
const fs = require("fs");

try {
  const data = fs
    .readFileSync(path.join(__dirname, "input.txt"), "utf-8")
    .split("\n")
    .map((n) => n.split(" "));

  let executedInstructions = [];
  let accumulator = 0;

  for (let i = 0; i < data.length; ) {
    const didExexcute = executedInstructions.includes(i);
    !didExexcute ? executedInstructions.push(i) : false;

    if (data[i][0] === "acc" && !didExexcute) {
      accumulator += Number(data[i][1]);
      i++;
    } else if (data[i][0] === "jmp" && !didExexcute) {
      i += Number(data[i][1]);
    } else if (data[i][0] === "nop" && !didExexcute) {
      i++;
    } else {
      break;
    }
  }
  console.log(accumulator);
} catch (err) {
  console.error(err);
}
