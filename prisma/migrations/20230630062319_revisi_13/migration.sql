-- AlterTable
ALTER TABLE `laporankemajuan` ADD COLUMN `partisipasiPenelitianId` INTEGER NULL,
    ADD COLUMN `partisipasiPengabdianId` INTEGER NULL;

-- AlterTable
ALTER TABLE `laporantahunan` ADD COLUMN `partisipasiPenelitianId` INTEGER NULL,
    ADD COLUMN `partisipasiPengabdianId` INTEGER NULL;

-- AlterTable
ALTER TABLE `penelitian` MODIFY `tema` VARCHAR(255) NOT NULL;

-- AddForeignKey
ALTER TABLE `LaporanKemajuan` ADD CONSTRAINT `LaporanKemajuan_partisipasiPenelitianId_fkey` FOREIGN KEY (`partisipasiPenelitianId`) REFERENCES `PartisipasiPenelitian`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `LaporanKemajuan` ADD CONSTRAINT `LaporanKemajuan_partisipasiPengabdianId_fkey` FOREIGN KEY (`partisipasiPengabdianId`) REFERENCES `PartisipasiPengabdian`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `LaporanTahunan` ADD CONSTRAINT `LaporanTahunan_partisipasiPenelitianId_fkey` FOREIGN KEY (`partisipasiPenelitianId`) REFERENCES `PartisipasiPenelitian`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `LaporanTahunan` ADD CONSTRAINT `LaporanTahunan_partisipasiPengabdianId_fkey` FOREIGN KEY (`partisipasiPengabdianId`) REFERENCES `PartisipasiPengabdian`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;
