/*
  Warnings:

  - A unique constraint covering the columns `[name]` on the table `Garden` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `name` to the `Garden` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Garden" ADD COLUMN     "name" TEXT NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "Garden_name_key" ON "Garden"("name");
