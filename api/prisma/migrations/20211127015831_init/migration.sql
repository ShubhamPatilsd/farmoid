-- CreateTable
CREATE TABLE "PlantInfo" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "min" INTEGER NOT NULL,
    "max" INTEGER NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "PlantInfo_id_key" ON "PlantInfo"("id");
