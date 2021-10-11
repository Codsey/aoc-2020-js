const path = require("path");
const fs = require("fs");

try {
  const data = fs
    .readFileSync(path.join(__dirname, "input.txt"), "utf-8")
    .split("\n");

  let passports = [];

  let arr = [];
  for (let i = 0; i <= data.length; i++) {
    if (data[i] === "\r") {
      passports.push(arr);
      arr = [];
    } else if (i === data.length) {
      passports.push(arr);
      arr = [];
    } else {
      arr.push(data[i]);
    }
  }

  const parsedPassports = passports.map((passArr) => {
    return passArr
      .map((str) => str.replace(/\r?\n|\r/g, ""))
      .join(" ")
      .split(" ")
      .reduce(
        (a, value) => ({ ...a, [value.split(":")[0]]: value.split(":")[1] }),
        {}
      );
  });

  let validPassports = 0;

  for (let i = 0; i < parsedPassports.length; i++) {
    const { byr, iyr, eyr, hgt, hcl, ecl, pid } = parsedPassports[i];
    if (byr && iyr && eyr && hgt && hcl && ecl && pid) {
      validPassports++;
    }
  }
  console.log(validPassports);
} catch (err) {
  console.error(err);
}
