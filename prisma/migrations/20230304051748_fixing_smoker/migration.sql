/*
  Warnings:

  - You are about to alter the column `smoker` on the `Escort` table. The data in that column could be lost. The data in that column will be cast from `Enum(EnumId(33))` to `VarChar(191)`.

*/
-- AlterTable
ALTER TABLE `Escort` MODIFY `smoker` VARCHAR(191) NULL;
