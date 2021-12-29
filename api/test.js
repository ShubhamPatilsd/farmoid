const PrismaClient = require("@prisma/client").PrismaClient;
const prisma = new PrismaClient();
const argon2 = require("argon2");

async function main() {
  await prisma.userAuth.create({
    data: {
      email: "shubhampatilsd@gmail.com",
      password: await argon2.hash("password"),
      name: "Shubham Patil",
    },
  });
}
main();
// console.log(data);
