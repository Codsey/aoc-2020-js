const path = require("path");
const fs = require("fs");

try {
  const data = fs
    .readFileSync(path.join(__dirname, "input.txt"), "utf-8")
    .split("\n");

  let groups = [];

  let arr = [];
  for (let i = 0; i <= data.length; i++) {
    if (data[i] === "\r") {
      groups.push(arr);
      arr = [];
    } else if (i === data.length) {
      groups.push(arr);
      arr = [];
    } else {
      arr.push(data[i]);
    }
  }

  const parsedGroups = groups.map((group) => {
    return group.map((str) => str.replace(/\r?\n|\r/g, ""));
  });

  let totalYes = 0;

  parsedGroups.map((group) => {
    let uniq = [...new Set(group.join("").split(""))];
    totalYes += uniq.length;
  });

  console.log(totalYes);
} catch (err) {
  console.error(err);
}
