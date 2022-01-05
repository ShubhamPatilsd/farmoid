/*
  Warnings:

  - You are about to drop the `UserAuth` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropTable
DROP TABLE "UserAuth";

-- CreateTable
CREATE TABLE "User" (
    "email" TEXT NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "User_email_key" ON "User"("email");
