/*
  Warnings:

  - You are about to drop the column `email` on the `Escort` table. All the data in the column will be lost.
  - You are about to drop the column `phoneNumber` on the `Escort` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[privateEmail]` on the table `Escort` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `numberOfDepositsForMonth` to the `Escort` table without a default value. This is not possible if the table is not empty.
  - Added the required column `plan` to the `Escort` table without a default value. This is not possible if the table is not empty.
  - Added the required column `preferredContactMethod` to the `Escort` table without a default value. This is not possible if the table is not empty.
  - Added the required column `privateEmail` to the `Escort` table without a default value. This is not possible if the table is not empty.
  - Added the required column `privatePhoneNumber` to the `Escort` table without a default value. This is not possible if the table is not empty.
  - Added the required column `totalNumOfDeposits` to the `Escort` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE `Booking` DROP FOREIGN KEY `Booking_escortId_fkey`;

-- DropForeignKey
ALTER TABLE `Booking` DROP FOREIGN KEY `Booking_userId_fkey`;

-- DropForeignKey
ALTER TABLE `EscortReview` DROP FOREIGN KEY `EscortReview_escortId_fkey`;

-- DropForeignKey
ALTER TABLE `EscortReview` DROP FOREIGN KEY `EscortReview_userId_fkey`;

-- DropForeignKey
ALTER TABLE `MessageChain` DROP FOREIGN KEY `MessageChain_bookingId_fkey`;

-- DropForeignKey
ALTER TABLE `Transaction` DROP FOREIGN KEY `Transaction_bookingId_fkey`;

-- DropForeignKey
ALTER TABLE `TransferRecord` DROP FOREIGN KEY `TransferRecord_transactionId_fkey`;

-- DropForeignKey
ALTER TABLE `UserPaidReview` DROP FOREIGN KEY `UserPaidReview_escortId_fkey`;

-- DropForeignKey
ALTER TABLE `UserPaidReview` DROP FOREIGN KEY `UserPaidReview_userId_fkey`;

-- DropForeignKey
ALTER TABLE `UserRefundClaim` DROP FOREIGN KEY `UserRefundClaim_transactionId_fkey`;

-- DropIndex
DROP INDEX `Escort_email_key` ON `Escort`;

-- AlterTable
ALTER TABLE `Escort` DROP COLUMN `email`,
    DROP COLUMN `phoneNumber`,
    ADD COLUMN `answer1` VARCHAR(191) NULL,
    ADD COLUMN `answer2` VARCHAR(191) NULL,
    ADD COLUMN `answer3` VARCHAR(191) NULL,
    ADD COLUMN `availableNowService` BOOLEAN NOT NULL DEFAULT false,
    ADD COLUMN `birthday` DATETIME(3) NULL,
    ADD COLUMN `bodyShape` ENUM('petite', 'athletic', 'average', 'curvy', 'aFewExtraPounds', 'bbw') NULL,
    ADD COLUMN `bookingService` BOOLEAN NOT NULL DEFAULT false,
    ADD COLUMN `braSize` VARCHAR(191) NULL,
    ADD COLUMN `description` VARCHAR(191) NULL,
    ADD COLUMN `displaySuburb` BOOLEAN NOT NULL DEFAULT false,
    ADD COLUMN `dressSize` VARCHAR(191) NULL,
    ADD COLUMN `drinker` BOOLEAN NOT NULL DEFAULT false,
    ADD COLUMN `education` ENUM('highSchool', 'studying', 'university') NULL,
    ADD COLUMN `escortSafeService` BOOLEAN NOT NULL DEFAULT false,
    ADD COLUMN `ethnicity` ENUM('asian', 'southAsian', 'black', 'latin', 'eastIndian', 'middleEastern', 'nativeAmerican', 'aboriginalOrTSIslander', 'maori', 'pacificIslander', 'whiteCaucasian', 'european', 'caribean') NULL,
    ADD COLUMN `favColour` VARCHAR(191) NULL,
    ADD COLUMN `favCuisine` VARCHAR(191) NULL,
    ADD COLUMN `hairColour` ENUM('blonde', 'brunette', 'black', 'red', 'grey', 'other') NULL,
    ADD COLUMN `height` TINYINT NULL,
    ADD COLUMN `incallAddress` VARCHAR(191) NULL,
    ADD COLUMN `languages` VARCHAR(191) NULL,
    ADD COLUMN `nationality` VARCHAR(191) NULL,
    ADD COLUMN `numberOfDepositsForMonth` INTEGER NOT NULL,
    ADD COLUMN `online` BOOLEAN NOT NULL DEFAULT false,
    ADD COLUMN `ourReview` VARCHAR(191) NULL,
    ADD COLUMN `outcalls` BOOLEAN NOT NULL DEFAULT false,
    ADD COLUMN `plan` ENUM('freePlan', 'monthAdvertiseWithContacts', 'premium', 'month12', 'month12Premium') NOT NULL,
    ADD COLUMN `preferredContactMethod` ENUM('call', 'text', 'whatsApp', 'email', 'ourMessagingService') NOT NULL,
    ADD COLUMN `privateEmail` VARCHAR(191) NOT NULL,
    ADD COLUMN `privatePhoneNumber` VARCHAR(191) NOT NULL,
    ADD COLUMN `pubicHair` ENUM('shaved', 'trimmed', 'natural') NULL,
    ADD COLUMN `publicEmail` VARCHAR(191) NULL,
    ADD COLUMN `publicPhone` INTEGER NULL,
    ADD COLUMN `question1` ENUM('q1', 'q2', 'q3', 'q4') NULL,
    ADD COLUMN `question2` ENUM('q1', 'q2', 'q3', 'q4') NULL,
    ADD COLUMN `question3` ENUM('q1', 'q2', 'q3', 'q4') NULL,
    ADD COLUMN `reviewService` BOOLEAN NULL DEFAULT false,
    ADD COLUMN `shoeSize` VARCHAR(191) NULL,
    ADD COLUMN `smoker` BOOLEAN NOT NULL DEFAULT false,
    ADD COLUMN `specialCategory` ENUM('DominatrixMistress', 'Hotwife', 'OnlineOnly', 'Couple', 'MassageOnly', 'PornActress', 'SugarBaby') NULL,
    ADD COLUMN `totalNumOfDeposits` INTEGER NOT NULL,
    ADD COLUMN `usingDepositSystem` BOOLEAN NOT NULL DEFAULT false,
    ADD COLUMN `whatsApp` INTEGER NULL;

-- AlterTable
ALTER TABLE `EscortReview` MODIFY `userId` INTEGER NULL;

-- AlterTable
ALTER TABLE `UserPaidReview` MODIFY `escortId` INTEGER NULL;

-- CreateTable
CREATE TABLE `WorksWithRelationships` (
    `requesterId` INTEGER NOT NULL,
    `acceptedId` INTEGER NOT NULL,

    PRIMARY KEY (`requesterId`, `acceptedId`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `EscortActivities` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `escortId` INTEGER NOT NULL,
    `activityId` INTEGER NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Activity` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `name` VARCHAR(191) NOT NULL,

    UNIQUE INDEX `Activity_name_key`(`name`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `EscortMeetsWith` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `escortId` INTEGER NOT NULL,
    `meetsWithId` INTEGER NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `MeetsWith` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `name` ENUM('men', 'women', 'mfcouples', 'mmcouples', 'groupSex', 'swingersParties', 'publicfunctions', 'privateEvents', 'disabled', 'transexuals') NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Link` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `escortId` INTEGER NOT NULL,
    `linkMedia` ENUM('twitter', 'instagram', 'website', 'snapchat', 'onlyfans', 'linktree', 'fansly', 'wishlist') NOT NULL,
    `linkUrl` VARCHAR(191) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `EscortPrices` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `escortId` INTEGER NOT NULL,
    `priceId` INTEGER NOT NULL,
    `includedActivity` VARCHAR(191) NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Price` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `perTime` ENUM('mins15', 'mins30', 'hour1', 'mins90', 'hours2', 'hours3', 'hours4', 'hours5', 'hours6', 'hours7', 'hours8', 'additionalHour', 'overnight', 'day') NOT NULL,
    `price` INTEGER NOT NULL,
    `incall` BOOLEAN NOT NULL DEFAULT true,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateIndex
CREATE UNIQUE INDEX `Escort_privateEmail_key` ON `Escort`(`privateEmail`);

-- AddForeignKey
ALTER TABLE `WorksWithRelationships` ADD CONSTRAINT `WorksWithRelationships_requesterId_fkey` FOREIGN KEY (`requesterId`) REFERENCES `Escort`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `WorksWithRelationships` ADD CONSTRAINT `WorksWithRelationships_acceptedId_fkey` FOREIGN KEY (`acceptedId`) REFERENCES `Escort`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `EscortActivities` ADD CONSTRAINT `EscortActivities_escortId_fkey` FOREIGN KEY (`escortId`) REFERENCES `Escort`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `EscortActivities` ADD CONSTRAINT `EscortActivities_activityId_fkey` FOREIGN KEY (`activityId`) REFERENCES `Activity`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `EscortMeetsWith` ADD CONSTRAINT `EscortMeetsWith_escortId_fkey` FOREIGN KEY (`escortId`) REFERENCES `Escort`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `EscortMeetsWith` ADD CONSTRAINT `EscortMeetsWith_meetsWithId_fkey` FOREIGN KEY (`meetsWithId`) REFERENCES `MeetsWith`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Link` ADD CONSTRAINT `Link_escortId_fkey` FOREIGN KEY (`escortId`) REFERENCES `Escort`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `EscortPrices` ADD CONSTRAINT `EscortPrices_escortId_fkey` FOREIGN KEY (`escortId`) REFERENCES `Escort`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `EscortPrices` ADD CONSTRAINT `EscortPrices_priceId_fkey` FOREIGN KEY (`priceId`) REFERENCES `Price`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Booking` ADD CONSTRAINT `Booking_escortId_fkey` FOREIGN KEY (`escortId`) REFERENCES `Escort`(`id`) ON DELETE RESTRICT ON UPDATE RESTRICT;

-- AddForeignKey
ALTER TABLE `Booking` ADD CONSTRAINT `Booking_userId_fkey` FOREIGN KEY (`userId`) REFERENCES `User`(`id`) ON DELETE RESTRICT ON UPDATE RESTRICT;

-- AddForeignKey
ALTER TABLE `Transaction` ADD CONSTRAINT `Transaction_bookingId_fkey` FOREIGN KEY (`bookingId`) REFERENCES `Booking`(`id`) ON DELETE RESTRICT ON UPDATE RESTRICT;

-- AddForeignKey
ALTER TABLE `TransferRecord` ADD CONSTRAINT `TransferRecord_transactionId_fkey` FOREIGN KEY (`transactionId`) REFERENCES `Transaction`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `EscortReview` ADD CONSTRAINT `EscortReview_escortId_fkey` FOREIGN KEY (`escortId`) REFERENCES `Escort`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `EscortReview` ADD CONSTRAINT `EscortReview_userId_fkey` FOREIGN KEY (`userId`) REFERENCES `User`(`id`) ON DELETE SET NULL ON UPDATE SET NULL;

-- AddForeignKey
ALTER TABLE `UserPaidReview` ADD CONSTRAINT `UserPaidReview_escortId_fkey` FOREIGN KEY (`escortId`) REFERENCES `Escort`(`id`) ON DELETE SET NULL ON UPDATE SET NULL;

-- AddForeignKey
ALTER TABLE `UserPaidReview` ADD CONSTRAINT `UserPaidReview_userId_fkey` FOREIGN KEY (`userId`) REFERENCES `User`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `UserRefundClaim` ADD CONSTRAINT `UserRefundClaim_transactionId_fkey` FOREIGN KEY (`transactionId`) REFERENCES `Transaction`(`id`) ON DELETE RESTRICT ON UPDATE RESTRICT;

-- AddForeignKey
ALTER TABLE `MessageChain` ADD CONSTRAINT `MessageChain_bookingId_fkey` FOREIGN KEY (`bookingId`) REFERENCES `Booking`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;
