/*
  Warnings:

  - Added the required column `judulPenelitian` to the `NilaiPenelitian` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `nilaipenelitian` ADD COLUMN `judulPenelitian` VARCHAR(191) NOT NULL;

-- AddForeignKey
ALTER TABLE `NilaiPenelitian` ADD CONSTRAINT `NilaiPenelitian_judulPenelitian_fkey` FOREIGN KEY (`judulPenelitian`) REFERENCES `Penelitian`(`judul`) ON DELETE RESTRICT ON UPDATE CASCADE;
