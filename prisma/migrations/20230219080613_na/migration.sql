-- AlterTable
ALTER TABLE `Escort` MODIFY `numberOfDepositsForMonth` INTEGER NULL,
    MODIFY `plan` ENUM('freePlan', 'monthAdvertiseWithContacts', 'premium', 'month12', 'month12Premium') NULL,
    MODIFY `preferredContactMethod` ENUM('call', 'text', 'whatsApp', 'email', 'ourMessagingService') NULL,
    MODIFY `privatePhoneNumber` VARCHAR(191) NULL,
    MODIFY `totalNumOfDeposits` INTEGER NULL;
