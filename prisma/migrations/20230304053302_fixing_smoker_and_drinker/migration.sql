/*
  Warnings:

  - You are about to alter the column `drinker` on the `Escort` table. The data in that column could be lost. The data in that column will be cast from `VarChar(191)` to `Enum(EnumId(8))`.
  - You are about to alter the column `smoker` on the `Escort` table. The data in that column could be lost. The data in that column will be cast from `VarChar(191)` to `Enum(EnumId(7))`.

*/
-- AlterTable
ALTER TABLE `Escort` MODIFY `drinker` ENUM('noneSelected', 'nonDrinker', 'occasionalDrinker', 'happyDrinker') NULL,
    MODIFY `smoker` ENUM('noneSelected', 'nonSmoker', 'socially', 'yesSmoker') NULL;
