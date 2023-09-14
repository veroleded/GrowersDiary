-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Strain" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "name" TEXT NOT NULL,
    "type" BOOLEAN NOT NULL,
    "description" TEXT,
    "feminization" BOOLEAN NOT NULL
);
INSERT INTO "new_Strain" ("description", "feminization", "id", "name", "type") SELECT "description", "feminization", "id", "name", "type" FROM "Strain";
DROP TABLE "Strain";
ALTER TABLE "new_Strain" RENAME TO "Strain";
CREATE UNIQUE INDEX "Strain_name_key" ON "Strain"("name");
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
