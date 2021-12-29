/*
  Warnings:

  - Added the required column `name` to the `UserAuth` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "UserAuth" ADD COLUMN     "name" TEXT NOT NULL;
