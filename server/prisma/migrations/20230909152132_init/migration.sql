-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_GrowLog" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "name" TEXT NOT NULL,
    "description" TEXT,
    "strainId" INTEGER NOT NULL,
    "ownerId" INTEGER NOT NULL,
    "isPublic" BOOLEAN NOT NULL DEFAULT true,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL,
    "finshedAt" DATETIME NOT NULL,
    CONSTRAINT "GrowLog_strainId_fkey" FOREIGN KEY ("strainId") REFERENCES "Strain" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "GrowLog_ownerId_fkey" FOREIGN KEY ("ownerId") REFERENCES "User" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_GrowLog" ("createdAt", "description", "finshedAt", "id", "isPublic", "name", "ownerId", "strainId", "updatedAt") SELECT "createdAt", "description", "finshedAt", "id", "isPublic", "name", "ownerId", "strainId", "updatedAt" FROM "GrowLog";
DROP TABLE "GrowLog";
ALTER TABLE "new_GrowLog" RENAME TO "GrowLog";
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
