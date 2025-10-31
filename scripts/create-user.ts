import { prisma } from "../lib/prisma";
import bcrypt from "bcrypt";

async function main() {
  const email = "test@example.com";
  const password = "123456";

  const hashedPassword = await bcrypt.hash(password, 10);

  const user = await prisma.user.upsert({
    where: { email },
    update: {},
    create: {
      email,
      password: hashedPassword,
      name: "Test User",
    },
  });

  console.log("✅ User created:", user);
}

main()
  .catch(console.error)
  .finally(() => prisma.$disconnect());