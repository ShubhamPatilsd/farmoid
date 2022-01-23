-- CreateTable
CREATE TABLE "Garden" (
    "id" TEXT NOT NULL,
    "ownerId" TEXT NOT NULL
);

-- CreateTable
CREATE TABLE "Plant" (
    "id" TEXT NOT NULL,
    "moisture" INTEGER NOT NULL,
    "name" TEXT NOT NULL,
    "type" TEXT NOT NULL,
    "gardenId" TEXT NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "Garden_id_key" ON "Garden"("id");

-- CreateIndex
CREATE UNIQUE INDEX "Plant_id_key" ON "Plant"("id");

-- AddForeignKey
ALTER TABLE "Garden" ADD CONSTRAINT "Garden_ownerId_fkey" FOREIGN KEY ("ownerId") REFERENCES "User"("uid") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Plant" ADD CONSTRAINT "Plant_gardenId_fkey" FOREIGN KEY ("gardenId") REFERENCES "Garden"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
