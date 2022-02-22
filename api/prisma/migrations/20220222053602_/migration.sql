/*
  Warnings:

  - You are about to drop the column `gardenId` on the `Plant` table. All the data in the column will be lost.
  - You are about to drop the `Garden` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `ownerId` to the `Plant` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "Garden" DROP CONSTRAINT "Garden_ownerId_fkey";

-- DropForeignKey
ALTER TABLE "Plant" DROP CONSTRAINT "Plant_gardenId_fkey";

-- AlterTable
ALTER TABLE "Plant" DROP COLUMN "gardenId",
ADD COLUMN     "ownerId" TEXT NOT NULL;

-- DropTable
DROP TABLE "Garden";

-- AddForeignKey
ALTER TABLE "Plant" ADD CONSTRAINT "Plant_ownerId_fkey" FOREIGN KEY ("ownerId") REFERENCES "User"("uid") ON DELETE RESTRICT ON UPDATE CASCADE;
