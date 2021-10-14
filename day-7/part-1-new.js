const path = require("path");
const fs = require("fs");

try {
  const data = fs
    .readFileSync(path.join(__dirname, "input.txt"), "utf-8")
    .split("\n");

  const map = new Map();

  function containsShinyGold(color) {
    if (color === "shiny gold") return true;
    if (!map.has(color)) return false;

    const bagsWithin = map.get(color);
    for (const { color: bag } of bagsWithin) {
      if (containsShinyGold(bag)) {
        return true;
      }
    }
    return false;
  }

  for (const line of data) {
    const [bag, bags] = line.split(" bags contain ");
    bags
      .replace(/\./, "")
      .split(", ")
      .map((txt) => {
        const { groups } = /((?<number>\d+) )?(?<color>.*)/.exec(
          txt.replace(/ bags?/, "")
        );

        if (!map.has(bag)) {
          map.set(bag, []);
        }
        if (!groups.number) groups.number = 0;
        map.set(bag, [...map.get(bag), groups]);
      });
  }

  const colors = map.keys();
  let total = 0;

  for (const color of colors) {
    if (containsShinyGold(color) && color != "shiny gold") {
      total++;
    }
  }

  console.log(total);
} catch (err) {
  console.error(err);
}
