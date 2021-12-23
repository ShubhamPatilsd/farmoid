/*
  Warnings:

  - Added the required column `query_name` to the `PlantInfo` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "PlantInfo" ADD COLUMN     "query_name" TEXT NOT NULL;
