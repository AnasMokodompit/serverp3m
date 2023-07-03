/*
  Warnings:

  - You are about to drop the column `nilai1` on the `reviewpenelitian` table. All the data in the column will be lost.
  - You are about to drop the column `nilai2` on the `reviewpenelitian` table. All the data in the column will be lost.
  - You are about to drop the column `nilai3` on the `reviewpenelitian` table. All the data in the column will be lost.
  - You are about to drop the column `nilai4` on the `reviewpenelitian` table. All the data in the column will be lost.
  - You are about to drop the column `nilai5` on the `reviewpenelitian` table. All the data in the column will be lost.
  - You are about to drop the column `nilai6` on the `reviewpenelitian` table. All the data in the column will be lost.
  - You are about to drop the column `nilai7` on the `reviewpenelitian` table. All the data in the column will be lost.
  - You are about to drop the column `nilai8` on the `reviewpenelitian` table. All the data in the column will be lost.
  - You are about to drop the column `nilai1` on the `reviewpengabdian` table. All the data in the column will be lost.
  - You are about to drop the column `nilai2` on the `reviewpengabdian` table. All the data in the column will be lost.
  - You are about to drop the column `nilai3` on the `reviewpengabdian` table. All the data in the column will be lost.
  - You are about to drop the column `nilai4` on the `reviewpengabdian` table. All the data in the column will be lost.
  - You are about to drop the column `nilai5` on the `reviewpengabdian` table. All the data in the column will be lost.
  - You are about to drop the column `nilai6` on the `reviewpengabdian` table. All the data in the column will be lost.
  - You are about to drop the column `nilai7` on the `reviewpengabdian` table. All the data in the column will be lost.
  - You are about to drop the column `nilai8` on the `reviewpengabdian` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE `reviewpenelitian` DROP COLUMN `nilai1`,
    DROP COLUMN `nilai2`,
    DROP COLUMN `nilai3`,
    DROP COLUMN `nilai4`,
    DROP COLUMN `nilai5`,
    DROP COLUMN `nilai6`,
    DROP COLUMN `nilai7`,
    DROP COLUMN `nilai8`;

-- AlterTable
ALTER TABLE `reviewpengabdian` DROP COLUMN `nilai1`,
    DROP COLUMN `nilai2`,
    DROP COLUMN `nilai3`,
    DROP COLUMN `nilai4`,
    DROP COLUMN `nilai5`,
    DROP COLUMN `nilai6`,
    DROP COLUMN `nilai7`,
    DROP COLUMN `nilai8`;

-- CreateTable
CREATE TABLE `NilaiPenelitian` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `idReviewPenelitian` INTEGER NOT NULL,
    `nilai` INTEGER NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `NilaiPengabdian` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `idReviewPengabdian` INTEGER NOT NULL,
    `nilai` INTEGER NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `NilaiPenelitian` ADD CONSTRAINT `NilaiPenelitian_idReviewPenelitian_fkey` FOREIGN KEY (`idReviewPenelitian`) REFERENCES `ReviewPenelitian`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `NilaiPengabdian` ADD CONSTRAINT `NilaiPengabdian_idReviewPengabdian_fkey` FOREIGN KEY (`idReviewPengabdian`) REFERENCES `ReviewPengabdian`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
