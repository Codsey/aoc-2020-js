const path = require("path");
const fs = require("fs");

try {
  const data = fs
    .readFileSync(path.join(__dirname, "input.txt"), "utf-8")
    .split("\n");

  let groups = [];

  let arr = [];
  let groupSize = 0;

  for (let i = 0; i <= data.length; i++) {
    if (data[i] === "\r") {
      groups.push({ groupSize: groupSize, answers: arr });
      arr = [];
      groupSize = 0;
    } else if (i === data.length) {
      groups.push({ groupSize: groupSize, answers: arr });
      arr = [];
      groupSize = 0;
    } else {
      groupSize++;
      arr.push(data[i]);
    }
  }

  const parsedGroups = groups.map((group) => {
    return {
      groupSize: group.groupSize,
      answers: group.answers.map((str) => str.replace(/\r?\n|\r/g, "")),
    };
  });

  const findDuplicates = (arr, n) => {
    const result = {};
    arr.forEach((item) => (result[item] = (result[item] || 0) + 1));
    return Object.entries(result).filter((letter) => letter[1] === n);
  };

  let totalYes = 0;

  parsedGroups.map((group) => {
    if (group.groupSize === 1) {
      let uniq = [...new Set(group.answers.join("").split(""))];
      totalYes += uniq.length;
    } else {
      totalYes += findDuplicates(
        group.answers.join("").split(""),
        group.groupSize
      ).length;
    }
  });

  console.log(totalYes);
} catch (err) {
  console.error(err);
}
