const path = require("path");
const fs = require("fs");

try {
  const data = fs
    .readFileSync(path.join(__dirname, "input.txt"), "utf-8")
    .split("\n");

  const parsedData = data.map((x) => {
    const str = x.replace(/\.|bags?|[0-9]/g, "").split("contain");

    return {
      color: str[0].trim(),
      bagsWithin: str[1].split(",").map((x) => x.trim()),
    };
  });

  const colors = parsedData.map((data) => data.color);

  const hasShinyGold = (color) => {
    if (color === "shiny gold") return true;
    if ((parsedData.filter((data) => data.color === color).length = 0))
      return false;
    const bagsWithin = parsedData.filter((bag) => bag.color === color);
    const selectedBag = bagsWithin.length > 0 ? bagsWithin[0].bagsWithin : [];
    for (const bag of selectedBag) {
      if (hasShinyGold(bag)) {
        return true;
      }
    }
    return false;
  };

  let total = 0;
  for (const color of colors) {
    if (hasShinyGold(color) && color != "shiny gold") {
      total++;
    }
  }

  console.log(total);
} catch (err) {
  console.error(err);
}
