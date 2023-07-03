-- CreateTable
CREATE TABLE `LaporanTahunan` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `judulPenelitian` VARCHAR(191) NOT NULL,
    `idDokumenPenelitian` INTEGER NULL,
    `tahun` VARCHAR(191) NOT NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `LaporanTahunan` ADD CONSTRAINT `LaporanTahunan_judulPenelitian_fkey` FOREIGN KEY (`judulPenelitian`) REFERENCES `Penelitian`(`judul`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `LaporanTahunan` ADD CONSTRAINT `LaporanTahunan_idDokumenPenelitian_fkey` FOREIGN KEY (`idDokumenPenelitian`) REFERENCES `DokumenPenelitian`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;
