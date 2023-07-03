-- CreateTable
CREATE TABLE `LaporanAkhir` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `judulPenelitian` VARCHAR(191) NOT NULL,
    `idDokumenPenelitian` INTEGER NULL,
    `partisipasiPenelitianId` INTEGER NULL,
    `partisipasiPengabdianId` INTEGER NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `LaporanAkhir` ADD CONSTRAINT `LaporanAkhir_judulPenelitian_fkey` FOREIGN KEY (`judulPenelitian`) REFERENCES `Penelitian`(`judul`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `LaporanAkhir` ADD CONSTRAINT `LaporanAkhir_idDokumenPenelitian_fkey` FOREIGN KEY (`idDokumenPenelitian`) REFERENCES `DokumenPenelitian`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `LaporanAkhir` ADD CONSTRAINT `LaporanAkhir_partisipasiPenelitianId_fkey` FOREIGN KEY (`partisipasiPenelitianId`) REFERENCES `PartisipasiPenelitian`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `LaporanAkhir` ADD CONSTRAINT `LaporanAkhir_partisipasiPengabdianId_fkey` FOREIGN KEY (`partisipasiPengabdianId`) REFERENCES `PartisipasiPengabdian`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;
