/*
  Warnings:

  - You are about to drop the `EscortPrice` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE `EscortPrice` DROP FOREIGN KEY `incallEscort`;

-- DropForeignKey
ALTER TABLE `EscortPrice` DROP FOREIGN KEY `outcallEscort`;

-- DropTable
DROP TABLE `EscortPrice`;

-- CreateTable
CREATE TABLE `EscortIncallPrice` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `escortId` INTEGER NOT NULL,
    `time` ENUM('mins15', 'mins30', 'hour1', 'mins90', 'hours2', 'hours3', 'hours4', 'hours5', 'hours6', 'hours7', 'hours8', 'hours10', 'hours12', 'additionalHour', 'overnight', 'day', 'extra', 'other') NOT NULL,
    `price` VARCHAR(191) NOT NULL,
    `includesInfo` VARCHAR(191) NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `EscortOutcallPrice` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `escortId` INTEGER NOT NULL,
    `time` ENUM('mins15', 'mins30', 'hour1', 'mins90', 'hours2', 'hours3', 'hours4', 'hours5', 'hours6', 'hours7', 'hours8', 'hours10', 'hours12', 'additionalHour', 'overnight', 'day', 'extra', 'other') NOT NULL,
    `price` VARCHAR(191) NOT NULL,
    `includesInfo` VARCHAR(191) NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `EscortIncallPrice` ADD CONSTRAINT `EscortIncallPrice_escortId_fkey` FOREIGN KEY (`escortId`) REFERENCES `Escort`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `EscortOutcallPrice` ADD CONSTRAINT `EscortOutcallPrice_escortId_fkey` FOREIGN KEY (`escortId`) REFERENCES `Escort`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
