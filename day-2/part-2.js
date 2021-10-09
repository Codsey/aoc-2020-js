const path = require("path");
const fs = require("fs");

try {
  const data = fs
    .readFileSync(path.join(__dirname, "input.txt"), "utf-8")
    .split("\n");

  const validPasswords = data.filter((policy) => {
    const splittedPolicy = policy.split(" ");
    const letterPosition = splittedPolicy[0]
      .split("-")
      .map((str) => parseInt(str, 10)); // Arr with the range
    const requiredLetter = splittedPolicy[1].split("")[0];
    const password = splittedPolicy[2].split("");
    if (
      (password[letterPosition[0] - 1] === requiredLetter &&
        password[letterPosition[1] - 1] !== requiredLetter) ||
      (password[letterPosition[0] - 1] !== requiredLetter &&
        password[letterPosition[1] - 1] === requiredLetter)
    ) {
      return policy;
    } else return null;
  });
  console.log(validPasswords.length);
} catch (err) {
  console.error(err);
}
