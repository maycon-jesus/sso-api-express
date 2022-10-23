-- CreateTable
CREATE TABLE `ApplicationRedirectUrlAllowed` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `appId` INTEGER NOT NULL,
    `url` TEXT NOT NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `ApplicationRedirectUrlAllowed` ADD CONSTRAINT `ApplicationRedirectUrlAllowed_appId_fkey` FOREIGN KEY (`appId`) REFERENCES `Applications`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
