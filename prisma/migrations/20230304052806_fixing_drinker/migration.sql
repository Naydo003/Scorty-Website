/*
  Warnings:

  - You are about to alter the column `drinker` on the `Escort` table. The data in that column could be lost. The data in that column will be cast from `Enum(EnumId(23))` to `VarChar(191)`.

*/
-- AlterTable
ALTER TABLE `Escort` MODIFY `drinker` VARCHAR(191) NULL;
