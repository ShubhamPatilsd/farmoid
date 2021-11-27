const PrismaClient = require("@prisma/client").PrismaClient;
const prisma = new PrismaClient();

var data = require("fs").readFileSync("plants.csv", "utf8");
data = data.split("\r\n");

async function main() {
  for (let i = 1; i < data.length; i++) {
    const temp = data[i].split(",");
    if (temp[1] !== "" && temp[2] !== "") {
      await prisma.plantInfo.create({
        data: {
          name: temp[0],
          min: parseInt(temp[1]),
          max: parseInt(temp[2]),
        },
      });
    }
  }
}
main();
console.log(data);
