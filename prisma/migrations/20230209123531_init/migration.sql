-- CreateTable
CREATE TABLE `Escort` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,
    `name` VARCHAR(191) NOT NULL,
    `email` VARCHAR(191) NOT NULL,
    `emailVerifiedOn` DATETIME(3) NULL,
    `phoneNumber` VARCHAR(191) NOT NULL,
    `phoneNumberVerifiedOn` DATETIME(3) NULL,
    `homeAddress` VARCHAR(191) NULL,
    `identificationDoc1url` VARCHAR(191) NULL,
    `identificationDoc2url` VARCHAR(191) NULL,
    `identifyingImageUrl` VARCHAR(191) NULL,
    `identityDocumentsVerifiedOn` DATETIME(3) NULL,
    `identityDocumentsVerifiedBy` VARCHAR(191) NULL,
    `accountBlacklistedOn` DATETIME(3) NULL,
    `workingAddress` VARCHAR(191) NULL,
    `suburb` VARCHAR(191) NULL,
    `city` VARCHAR(191) NULL,
    `suburbCoordinates` VARCHAR(191) NULL,
    `age` TINYINT NULL,
    `basePrice` DECIMAL(9, 2) NULL,
    `deposit` DECIMAL(9, 2) NULL,
    `generalCancellationPolicy` ENUM('free', 'percent10', 'percent25', 'percent50', 'percent100', 'customPolicy') NULL,
    `isUnrated` BOOLEAN NOT NULL DEFAULT true,
    `rating` DECIMAL(3, 2) NOT NULL DEFAULT 0.00,
    `avgResponseTime` DOUBLE NOT NULL DEFAULT 0,
    `transactionCount` INTEGER NOT NULL DEFAULT 0,

    UNIQUE INDEX `Escort_email_key`(`email`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Photos` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `escortId` INTEGER NOT NULL,
    `imageUrl` VARCHAR(191) NOT NULL,
    `order` TINYINT NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `User` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,
    `name` VARCHAR(191) NOT NULL,
    `email` VARCHAR(191) NOT NULL,
    `emailVerifiedOn` DATETIME(3) NULL,
    `phoneNumber` VARCHAR(191) NOT NULL,
    `phoneNumberVerifiedOn` DATETIME(3) NULL,
    `identificationDoc1url` VARCHAR(191) NULL,
    `identificationDoc2url` VARCHAR(191) NULL,
    `identifyingImageUrl` VARCHAR(191) NULL,
    `profilePictureUrl` VARCHAR(191) NULL,
    `aboutMe` VARCHAR(191) NULL,
    `identityDocumentsVerifiedOn` DATETIME(3) NULL,
    `identityDocumentsVerifiedBy` VARCHAR(191) NULL,
    `recentSearch1` VARCHAR(191) NULL,
    `recentSearch2` VARCHAR(191) NULL,
    `recentSearch3` VARCHAR(191) NULL,
    `recentSearch4` VARCHAR(191) NULL,
    `isUnrated` BOOLEAN NOT NULL DEFAULT true,
    `rating` DECIMAL(3, 2) NOT NULL DEFAULT 0.00,
    `transactionCount` SMALLINT NOT NULL DEFAULT 0,
    `transactionValue` DECIMAL(3, 2) NOT NULL DEFAULT 0.00,
    `isSuspended` BOOLEAN NOT NULL DEFAULT false,
    `notesForEscorts` VARCHAR(191) NULL,
    `avgResponseTime` DOUBLE NOT NULL DEFAULT 0,
    `accountBlacklistedOn` DATETIME(3) NULL,

    UNIQUE INDEX `User_email_key`(`email`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `EscortInvestigation` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `escortId` INTEGER NOT NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,
    `flagType` ENUM('rudeOrDisrespectful', 'violent', 'failedToProvideService', 'suspectedPolicyBreach', 'underAge', 'escortWellbeingConcern', 'unresolvedTransaction', 'consistentLowRating', 'suspectedIdentityFraud') NOT NULL,
    `investigatingAgent` VARCHAR(191) NOT NULL,
    `actions` VARCHAR(191) NOT NULL,
    `recommendations` VARCHAR(191) NOT NULL,
    `result` ENUM('warned', 'accountSuspendedUntilRectified', 'userBlacklisted') NOT NULL,
    `isClosed` BOOLEAN NOT NULL DEFAULT false,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `UserInvestigation` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `userId` INTEGER NOT NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,
    `flagType` ENUM('rudeOrDisrespectful', 'violent', 'failureToPay', 'suspectedPolicyBreach', 'underAge', 'unresolvedTransaction', 'consistentLowRating', 'suspectedIdentityFraud') NOT NULL,
    `investigatingAgent` VARCHAR(191) NOT NULL,
    `actions` VARCHAR(191) NOT NULL,
    `recommendations` VARCHAR(191) NOT NULL,
    `result` ENUM('warned', 'accountSuspendedUntilRectified', 'userBlacklisted') NOT NULL,
    `isClosed` BOOLEAN NOT NULL DEFAULT false,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Booking` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `escortId` INTEGER NOT NULL,
    `userId` INTEGER NOT NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,
    `itemAgreedRate` DECIMAL(7, 2) NOT NULL,
    `agreedDeposit` DECIMAL(7, 2) NOT NULL,
    `expectedtransactionCost` DECIMAL(7, 2) NOT NULL,
    `startTime` DATETIME(3) NOT NULL,
    `endTime` DATETIME(3) NOT NULL,
    `escortNote` VARCHAR(191) NULL,
    `userNote` VARCHAR(191) NULL,
    `statusAccepted` BOOLEAN NOT NULL DEFAULT false,
    `acceptedOnDate` DATETIME(3) NULL,
    `statusDeclined` BOOLEAN NOT NULL DEFAULT false,
    `declinedOnDate` DATETIME(3) NULL,
    `modRequest` BOOLEAN NULL,
    `modPickUpTime` DATETIME(3) NULL,
    `modReturnTime` DATETIME(3) NULL,
    `statusCancelled` BOOLEAN NOT NULL DEFAULT false,
    `cancelledOnDate` DATETIME(3) NULL,
    `bookingClosedOnDate` DATETIME(3) NULL,
    `transactionStatus` ENUM('uninitialized', 'open', 'awaitingDepositDebit', 'awaitingBookingDebit', 'awaitingJobConfirmation', 'awaitingCancellationProcessing', 'awaitingUserClaimProcessing', 'awaitingEscortClaimProcessing', 'awaitingUserRefund', 'awaitingAdditionalDebit', 'awaitingEscortCredit', 'closed') NOT NULL DEFAULT 'uninitialized',

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Transaction` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `bookingId` INTEGER NOT NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,
    `status` ENUM('uninitialized', 'open', 'awaitingDepositDebit', 'awaitingBookingDebit', 'awaitingJobConfirmation', 'awaitingCancellationProcessing', 'awaitingUserClaimProcessing', 'awaitingEscortClaimProcessing', 'awaitingUserRefund', 'awaitingAdditionalDebit', 'awaitingEscortCredit', 'closed') NOT NULL,
    `depositDebitsSuccessful` BOOLEAN NOT NULL DEFAULT false,
    `depositReturnSuccessful` BOOLEAN NOT NULL DEFAULT false,
    `bookingDebitSuccessful` BOOLEAN NOT NULL DEFAULT false,
    `jobConfirmed` BOOLEAN NOT NULL DEFAULT false,
    `jobConfirmedTime` DATETIME(3) NULL,
    `tipAmount` SMALLINT NULL,
    `tipDebitOutstanding` BOOLEAN NOT NULL DEFAULT false,
    `escortCreditSuccessful` BOOLEAN NOT NULL DEFAULT false,
    `enactedCancellationPolicy` BOOLEAN NOT NULL DEFAULT false,
    `cancellationForgiven` BOOLEAN NULL,
    `escortDepositCreditSuccessful` BOOLEAN NOT NULL DEFAULT false,
    `openUserRefundClaim` BOOLEAN NOT NULL DEFAULT false,
    `escortInitiatedRefundAmount` SMALLINT NULL,
    `UserRefundCreditOutstanding` BOOLEAN NOT NULL DEFAULT false,

    UNIQUE INDEX `Transaction_bookingId_key`(`bookingId`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `TransferRecord` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `type` ENUM('debit', 'credit') NOT NULL,
    `description` ENUM('depositDebit', 'bookingDebit', 'tipDebit', 'refundDebitFromEscort', 'depositReturnCredit', 'refundCredit', 'escortPayment') NOT NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,
    `transactionId` INTEGER NOT NULL,
    `creditAmount` DECIMAL(9, 2) NOT NULL DEFAULT 0.00,
    `paymentMethod` ENUM('stripe', 'paypal', 'googlePay') NOT NULL,
    `providersRecordId` VARCHAR(191) NULL,
    `success` BOOLEAN NOT NULL DEFAULT false,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `EscortReview` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `escortId` INTEGER NOT NULL,
    `userId` INTEGER NOT NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `rating` ENUM('rated1', 'rated2', 'rated3', 'rated4', 'rated5') NOT NULL,
    `tag1` ENUM('bestBlowJob', 'hotterThanHerPhotos', 'notAsHotAsPhotos', 'easyToTalkTo', 'squirtsALot') NOT NULL,
    `tag2` ENUM('bestBlowJob', 'hotterThanHerPhotos', 'notAsHotAsPhotos', 'easyToTalkTo', 'squirtsALot') NOT NULL,
    `tag3` ENUM('bestBlowJob', 'hotterThanHerPhotos', 'notAsHotAsPhotos', 'easyToTalkTo', 'squirtsALot') NOT NULL,
    `tag4` ENUM('bestBlowJob', 'hotterThanHerPhotos', 'notAsHotAsPhotos', 'easyToTalkTo', 'squirtsALot') NOT NULL,
    `tag5` ENUM('bestBlowJob', 'hotterThanHerPhotos', 'notAsHotAsPhotos', 'easyToTalkTo', 'squirtsALot') NOT NULL,
    `publicComment` VARCHAR(191) NULL,
    `privateComment` VARCHAR(191) NULL,
    `reviewDisqualified` BOOLEAN NOT NULL DEFAULT false,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `UserPaidReview` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `escortId` INTEGER NOT NULL,
    `userId` INTEGER NOT NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `publicComment` VARCHAR(191) NULL,
    `privateComment` VARCHAR(191) NULL,
    `reviewDisqualified` BOOLEAN NOT NULL DEFAULT false,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `UserRefundClaim` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,
    `transactionId` INTEGER NOT NULL,
    `details` VARCHAR(191) NOT NULL,
    `value` DECIMAL(7, 2) NOT NULL DEFAULT 0.00,
    `statusClosed` BOOLEAN NOT NULL DEFAULT false,
    `closedAt` DATETIME(3) NULL,
    `result` ENUM('paid', 'rejected') NULL,
    `comments` VARCHAR(191) NULL,
    `report` VARCHAR(191) NULL,

    UNIQUE INDEX `UserRefundClaim_transactionId_key`(`transactionId`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `MessageChain` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `type` ENUM('bookingQuery', 'investigation', 'inbound', 'notice') NOT NULL,
    `subject` VARCHAR(191) NOT NULL,
    `bookingId` INTEGER NULL,
    `userInvestigationId` INTEGER NULL,
    `escortInvestigationId` INTEGER NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Message` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `MessageChainId` INTEGER NOT NULL,
    `Direction` BOOLEAN NOT NULL,
    `orderInChain` INTEGER NOT NULL,
    `text` VARCHAR(191) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `Photos` ADD CONSTRAINT `Photos_escortId_fkey` FOREIGN KEY (`escortId`) REFERENCES `Escort`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `EscortInvestigation` ADD CONSTRAINT `EscortInvestigation_escortId_fkey` FOREIGN KEY (`escortId`) REFERENCES `Escort`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `UserInvestigation` ADD CONSTRAINT `UserInvestigation_userId_fkey` FOREIGN KEY (`userId`) REFERENCES `User`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Booking` ADD CONSTRAINT `Booking_escortId_fkey` FOREIGN KEY (`escortId`) REFERENCES `Escort`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Booking` ADD CONSTRAINT `Booking_userId_fkey` FOREIGN KEY (`userId`) REFERENCES `User`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Transaction` ADD CONSTRAINT `Transaction_bookingId_fkey` FOREIGN KEY (`bookingId`) REFERENCES `Booking`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `TransferRecord` ADD CONSTRAINT `TransferRecord_transactionId_fkey` FOREIGN KEY (`transactionId`) REFERENCES `Transaction`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `EscortReview` ADD CONSTRAINT `EscortReview_escortId_fkey` FOREIGN KEY (`escortId`) REFERENCES `Escort`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `EscortReview` ADD CONSTRAINT `EscortReview_userId_fkey` FOREIGN KEY (`userId`) REFERENCES `User`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `UserPaidReview` ADD CONSTRAINT `UserPaidReview_escortId_fkey` FOREIGN KEY (`escortId`) REFERENCES `Escort`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `UserPaidReview` ADD CONSTRAINT `UserPaidReview_userId_fkey` FOREIGN KEY (`userId`) REFERENCES `User`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `UserRefundClaim` ADD CONSTRAINT `UserRefundClaim_transactionId_fkey` FOREIGN KEY (`transactionId`) REFERENCES `Transaction`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `MessageChain` ADD CONSTRAINT `MessageChain_bookingId_fkey` FOREIGN KEY (`bookingId`) REFERENCES `Booking`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `MessageChain` ADD CONSTRAINT `MessageChain_userInvestigationId_fkey` FOREIGN KEY (`userInvestigationId`) REFERENCES `UserInvestigation`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `MessageChain` ADD CONSTRAINT `MessageChain_escortInvestigationId_fkey` FOREIGN KEY (`escortInvestigationId`) REFERENCES `EscortInvestigation`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Message` ADD CONSTRAINT `Message_MessageChainId_fkey` FOREIGN KEY (`MessageChainId`) REFERENCES `MessageChain`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
