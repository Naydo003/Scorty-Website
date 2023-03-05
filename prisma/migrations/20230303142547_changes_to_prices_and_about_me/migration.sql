/*
  Warnings:

  - You are about to drop the column `description` on the `Escort` table. All the data in the column will be lost.
  - You are about to drop the column `workingAddress` on the `Escort` table. All the data in the column will be lost.
  - You are about to drop the `EscortPrices` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Price` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE `EscortPrices` DROP FOREIGN KEY `EscortPrices_escortId_fkey`;

-- DropForeignKey
ALTER TABLE `EscortPrices` DROP FOREIGN KEY `EscortPrices_priceId_fkey`;

-- AlterTable
ALTER TABLE `Escort` DROP COLUMN `description`,
    DROP COLUMN `workingAddress`,
    ADD COLUMN `aboutMe` VARCHAR(191) NULL,
    ADD COLUMN `contactInstructions` VARCHAR(191) NULL,
    ADD COLUMN `giftRelayService` BOOLEAN NOT NULL DEFAULT false,
    ADD COLUMN `incalls` BOOLEAN NOT NULL DEFAULT false,
    ADD COLUMN `profileHeading` VARCHAR(191) NULL,
    MODIFY `specialCategory` ENUM('DominatrixMistress', 'Hotwife', 'OnlineOnly', 'Couple', 'MassageOnly', 'PornActress', 'SugarBaby', 'Lesbian', 'MaleEscort', 'Trans') NULL;

-- DropTable
DROP TABLE `EscortPrices`;

-- DropTable
DROP TABLE `Price`;

-- CreateTable
CREATE TABLE `EscortPrice` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `escortId` INTEGER NOT NULL,
    `time` ENUM('mins15', 'mins30', 'hour1', 'mins90', 'hours2', 'hours3', 'hours4', 'hours5', 'hours6', 'hours7', 'hours8', 'hours10', 'hours12', 'additionalHour', 'overnight', 'day', 'extra', 'other') NOT NULL,
    `price` INTEGER NOT NULL,
    `includesInfo` VARCHAR(191) NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `EscortPrice` ADD CONSTRAINT `incallEscort` FOREIGN KEY (`escortId`) REFERENCES `Escort`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `EscortPrice` ADD CONSTRAINT `outcallEscort` FOREIGN KEY (`escortId`) REFERENCES `Escort`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
