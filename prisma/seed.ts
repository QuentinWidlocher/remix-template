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
          create: [
            { name: "Project 1", date: new Date() },
            { name: "Project 2" },
          ],
        },
      },
    }),
    db.demoUser.create({
      data: {
        name: "Jane Doe",
        email: "jane.doe@example.com",
        projects: {
          create: [
            { name: "Project 3" },
            { name: "Project 4", date: new Date() },
          ],
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
  // REMOVE THIS
  demo();

  // Put here your seeding script
}

seed();
