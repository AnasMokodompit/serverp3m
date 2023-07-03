/*
  Warnings:

  - Added the required column `statusRevisi` to the `Penelitian` table without a default value. This is not possible if the table is not empty.
  - Added the required column `sebagai` to the `ReviewPenelitian` table without a default value. This is not possible if the table is not empty.
  - Added the required column `sebagai` to the `ReviewPengabdian` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `catatanharian` MODIFY `ttg` DATETIME(3) NULL;

-- AlterTable
ALTER TABLE `partisipasipenelitian` ADD COLUMN `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    ADD COLUMN `statusRevisi` BOOLEAN NULL,
    ADD COLUMN `updatedAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3);

-- AlterTable
ALTER TABLE `penelitian` ADD COLUMN `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    ADD COLUMN `statusDibiayai` BOOLEAN NOT NULL DEFAULT false,
    ADD COLUMN `statusRevisi` BOOLEAN NOT NULL,
    ADD COLUMN `updatedAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3);

-- AlterTable
ALTER TABLE `reviewpenelitian` ADD COLUMN `sebagai` VARCHAR(191) NOT NULL;

-- AlterTable
ALTER TABLE `reviewpengabdian` ADD COLUMN `sebagai` VARCHAR(191) NOT NULL;

-- AlterTable
ALTER TABLE `user` ADD COLUMN `jnsKelaminName` VARCHAR(191) NULL,
    ADD COLUMN `prodiId` INTEGER NULL,
    ADD COLUMN `profile_picture` VARCHAR(191) NULL,
    ADD COLUMN `profile_picture_id` VARCHAR(191) NULL;

-- CreateTable
CREATE TABLE `jadwalP3M` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `jadwalJudul` VARCHAR(191) NOT NULL,
    `tglMulai` DATETIME(3) NOT NULL,
    `tglAkhir` DATETIME(3) NOT NULL,
    `keterangan` VARCHAR(191) NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `DokumenPenelitian` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `name` VARCHAR(191) NOT NULL,
    `nameUser` VARCHAR(191) NOT NULL,
    `idPenelitian` INTEGER NOT NULL,
    `namePdf` VARCHAR(191) NOT NULL,
    `urlPdf` VARCHAR(191) NOT NULL,
    `pdf_id` VARCHAR(191) NOT NULL,
    `namePdfRevisi` VARCHAR(191) NULL,
    `urlPdfRevisi` VARCHAR(191) NULL,
    `pdf_idRevisi` VARCHAR(191) NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `JenisKelamin` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `name` VARCHAR(191) NOT NULL,

    UNIQUE INDEX `JenisKelamin_name_key`(`name`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `User` ADD CONSTRAINT `User_prodiId_fkey` FOREIGN KEY (`prodiId`) REFERENCES `Prodi`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `User` ADD CONSTRAINT `User_jnsKelaminName_fkey` FOREIGN KEY (`jnsKelaminName`) REFERENCES `JenisKelamin`(`name`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `DokumenPenelitian` ADD CONSTRAINT `DokumenPenelitian_nameUser_fkey` FOREIGN KEY (`nameUser`) REFERENCES `User`(`name`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `DokumenPenelitian` ADD CONSTRAINT `DokumenPenelitian_idPenelitian_fkey` FOREIGN KEY (`idPenelitian`) REFERENCES `Penelitian`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
