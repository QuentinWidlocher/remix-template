-- CreateTable
CREATE TABLE "DemoUser" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "name" TEXT NOT NULL,
    "email" TEXT
);

-- CreateTable
CREATE TABLE "DemoProject" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "name" TEXT NOT NULL,
    "date" DATETIME,
    "userId" TEXT NOT NULL,
    CONSTRAINT "DemoProject_userId_fkey" FOREIGN KEY ("userId") REFERENCES "DemoUser" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
