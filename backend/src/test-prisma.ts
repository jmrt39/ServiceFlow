import { prisma } from "./lib/prisma.js";

async function test() {
  console.log("Testing Prisma...");

  const user = await prisma.user.findUnique({
    where: {
      email: "test@example.com",
    },
  });

  console.log("RESULT:", user);

  await prisma.$disconnect();
}

test().catch((error) => {
  console.error("PRISMA TEST ERROR:");
  console.error(error);
});