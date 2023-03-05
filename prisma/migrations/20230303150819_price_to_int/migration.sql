/*
  Warnings:

  - You are about to alter the column `price` on the `EscortIncallPrice` table. The data in that column could be lost. The data in that column will be cast from `VarChar(191)` to `Int`.
  - You are about to alter the column `price` on the `EscortOutcallPrice` table. The data in that column could be lost. The data in that column will be cast from `VarChar(191)` to `Int`.

*/
-- AlterTable
ALTER TABLE `EscortIncallPrice` MODIFY `price` INTEGER NOT NULL;

-- AlterTable
ALTER TABLE `EscortOutcallPrice` MODIFY `price` INTEGER NOT NULL;
