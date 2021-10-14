const path = require("path");
const fs = require("fs");

try {
  const data = fs
    .readFileSync(path.join(__dirname, "input.txt"), "utf-8")
    .split("\n");

  const map = new Map();

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

  function sumBags(topBag) {
    if (topBag.number == 0) return 0;

    const bagsWithin = map.get(topBag.color);
    let sum = 1;
    for (const bag of bagsWithin) {
      sum += bag.number * sumBags(bag);
    }
    return sum;
  }

  console.log(sumBags({ number: 1, color: "shiny gold" }) - 1);
} catch (err) {
  console.error(err);
}
