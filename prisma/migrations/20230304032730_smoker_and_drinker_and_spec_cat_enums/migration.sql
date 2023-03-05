/*
  Warnings:

  - You are about to alter the column `drinker` on the `Escort` table. The data in that column could be lost. The data in that column will be cast from `TinyInt` to `Enum(EnumId(8))`.
  - You are about to alter the column `smoker` on the `Escort` table. The data in that column could be lost. The data in that column will be cast from `TinyInt` to `Enum(EnumId(7))`.
  - The values [DominatrixMistress,Hotwife,OnlineOnly,Couple,MassageOnly,PornActress,SugarBaby,Lesbian,MaleEscort,Trans] on the enum `Escort_specialCategory` will be removed. If these variants are still used in the database, this will fail.

*/
-- AlterTable
ALTER TABLE `Escort` MODIFY `drinker` ENUM('nonDrinker', 'occasionalDrinker', 'happyDrinker') NULL,
    MODIFY `smoker` ENUM('nonSmoker', 'socially', 'yesSmoker') NULL,
    MODIFY `specialCategory` ENUM('dominatrixMistress', 'hotwife', 'onlineOnly', 'couple', 'massageOnly', 'pornActress', 'sugarBaby', 'lesbian', 'maleEscort', 'trans') NULL;
