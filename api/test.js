const PrismaClient = require("@prisma/client").PrismaClient;
const prisma = new PrismaClient();
const fs = require("fs");
// const argon2 = require("argon2");

// async function main() {
//   await prisma.userAuth.create({
//     data: {
//       email: "shubhampatilsd@gmail.com",
//       password: await argon2.hash("password"),
//       name: "Shubham Patil",
//     },
//   });
// }
// // main();

async function main() {
  let data = await prisma.plantInfo.findMany({
    select: {
      name: true,
    },
  });
  let test = [];
  data.filter((plant) => {
    // console.log(plant.name);
    test.push(plant.name);
  });
  console.log(test.sort());
  fs.writeFileSync("pain.json", JSON.stringify(test));
}

main();
// console.log(data);
