-- AlterTable
ALTER TABLE `catatanharian` ADD COLUMN `idDokumenPenelitian` INTEGER NULL;

-- AddForeignKey
ALTER TABLE `CatatanHarian` ADD CONSTRAINT `CatatanHarian_idDokumenPenelitian_fkey` FOREIGN KEY (`idDokumenPenelitian`) REFERENCES `DokumenPenelitian`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;
