import { PrismaClient } from "@prisma/client";
let db = new PrismaClient();

// REMOVE THIS
async function demo() {
  return Promise.all([
    db.demoUser.create({
      data: {
        name: "John Doe",
        email: "john.doe@example.com",
        projects: {
          create: [{ name: "Project 1" }, { name: "Project 2" }],
        },
      },
    }),
    db.demoUser.create({
      data: {
        name: "Jane Doe",
        email: "jane.doe@example.com",
        projects: {
          create: [{ name: "Project 3" }, { name: "Project 4" }],
        },
      },
    }),
    db.demoUser.create({
      data: {
        name: "Dohn Joe",
        email: "dohn.joe@example.com",
      },
    }),
  ]);
}

async function seed() {
  // Put here your seeding script
  demo();
}

seed();
