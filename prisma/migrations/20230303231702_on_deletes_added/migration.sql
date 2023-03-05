-- DropForeignKey
ALTER TABLE `EscortActivities` DROP FOREIGN KEY `EscortActivities_escortId_fkey`;

-- DropForeignKey
ALTER TABLE `EscortIncallPrice` DROP FOREIGN KEY `EscortIncallPrice_escortId_fkey`;

-- DropForeignKey
ALTER TABLE `EscortMeetsWith` DROP FOREIGN KEY `EscortMeetsWith_escortId_fkey`;

-- DropForeignKey
ALTER TABLE `EscortOutcallPrice` DROP FOREIGN KEY `EscortOutcallPrice_escortId_fkey`;

-- DropForeignKey
ALTER TABLE `Link` DROP FOREIGN KEY `Link_escortId_fkey`;

-- AddForeignKey
ALTER TABLE `EscortActivities` ADD CONSTRAINT `EscortActivities_escortId_fkey` FOREIGN KEY (`escortId`) REFERENCES `Escort`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `EscortMeetsWith` ADD CONSTRAINT `EscortMeetsWith_escortId_fkey` FOREIGN KEY (`escortId`) REFERENCES `Escort`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Link` ADD CONSTRAINT `Link_escortId_fkey` FOREIGN KEY (`escortId`) REFERENCES `Escort`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `EscortIncallPrice` ADD CONSTRAINT `EscortIncallPrice_escortId_fkey` FOREIGN KEY (`escortId`) REFERENCES `Escort`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `EscortOutcallPrice` ADD CONSTRAINT `EscortOutcallPrice_escortId_fkey` FOREIGN KEY (`escortId`) REFERENCES `Escort`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;
