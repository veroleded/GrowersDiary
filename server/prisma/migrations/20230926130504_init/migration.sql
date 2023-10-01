/*
  Warnings:

  - A unique constraint covering the columns `[name]` on the table `Strain` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "Strain_name_key" ON "Strain"("name");
