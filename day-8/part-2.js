const path = require("path");
const fs = require("fs");

try {
  const data = fs
    .readFileSync(path.join(__dirname, "input.txt"), "utf-8")
    .split("\n")
    .map((n) => n.split(" "));

  const execute = (input) => {
    let executedInstructions = [];
    let accumulator = 0;

    for (let i = 0; i < input.length; ) {
      const didExexcute = executedInstructions.includes(i);
      !didExexcute ? executedInstructions.push(i) : false;

      if (input[i][0] === "acc" && !didExexcute) {
        accumulator += Number(input[i][1]);
        i++;
      } else if (input[i][0] === "jmp" && !didExexcute) {
        i += Number(input[i][1]);
      } else if (input[i][0] === "nop" && !didExexcute) {
        i++;
      } else {
        break;
      }
    }

    return {
      executedInstructions,
      accumulator,
      cleanLoop:
        Math.max(...executedInstructions) === input.length - 1 ? true : false,
    };
  };

  for (let i = 0; i < data.length; i++) {
    if (data[i][0] === "nop" || data[i][0] === "jmp") {
      const patchedData = data.slice();
      const newOpCode = patchedData[i][0] === "nop" ? "jmp" : "nop";

      patchedData[i] = [newOpCode, patchedData[i][1]];
      const result = execute(patchedData);

      if (result.cleanLoop) {
        console.log(result.accumulator);
      }
    }
  }
} catch (err) {
  console.error(err);
}
