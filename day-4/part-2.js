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

  const isValidPassportHeight = (hgt) => {
    if (hgt.endsWith("cm") || hgt.endsWith("in")) {
      if (hgt.endsWith("cm")) {
        const height = hgt.replace("cm", "");
        if (Number(height) >= 150 && Number(height) <= 193) {
          return true;
        }
      } else {
        const height = hgt.replace("in", "");
        if (Number(height) >= 59 && Number(height) <= 76) {
          return true;
        }
      }
    }
  };

  const validatePassportData = (passport) => {
    const isValidByr =
      passport.byr.length === 4 &&
      parseInt(passport.byr, 10) >= 1920 &&
      parseInt(passport.byr, 10) <= 2002;
    const isValidIyr =
      passport.iyr.length === 4 &&
      parseInt(passport.iyr, 10) >= 2010 &&
      parseInt(passport.iyr, 10) <= 2020;
    const isValidEyr =
      passport.eyr.length === 4 &&
      parseInt(passport.eyr, 10) >= 2020 &&
      parseInt(passport.eyr, 10) <= 2030;
    const isValidHgt = isValidPassportHeight(passport.hgt);
    const isValidHcl =
      passport.hcl.startsWith("#") &&
      passport.hcl.replace("#", "").match("^[a-f0-9]+$") &&
      passport.hcl.replace("#", "").length === 6;
    const isValidEcl = new RegExp(
      ["amb", "blu", "brn", "gry", "grn", "hzl", "oth"].join("|")
    ).test(passport.ecl);
    const isValidPid = passport.pid.length === 9;
    if (
      isValidByr &&
      isValidIyr &&
      isValidEyr &&
      isValidHgt &&
      isValidHcl &&
      isValidEcl &&
      isValidPid
    ) {
      return true;
    }
  };

  let validPassports = 0;

  for (let i = 0; i < parsedPassports.length; i++) {
    const { byr, iyr, eyr, hgt, hcl, ecl, pid } = parsedPassports[i];
    if (byr && iyr && eyr && hgt && hcl && ecl && pid) {
      if (validatePassportData(parsedPassports[i])) validPassports++;
    }
  }

  console.log(validPassports);
} catch (err) {
  console.error(err);
}
