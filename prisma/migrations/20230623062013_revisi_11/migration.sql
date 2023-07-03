/*
  Warnings:

  - You are about to drop the column `hki` on the `penelitian` table. All the data in the column will be lost.
  - You are about to drop the column `kesiapanTek` on the `penelitian` table. All the data in the column will be lost.
  - You are about to drop the column `namaBerkas` on the `penelitian` table. All the data in the column will be lost.
  - You are about to drop the column `pubInter` on the `penelitian` table. All the data in the column will be lost.
  - You are about to drop the column `pubNasion` on the `penelitian` table. All the data in the column will be lost.
  - You are about to drop the column `ttg` on the `penelitian` table. All the data in the column will be lost.
  - Added the required column `biayaLuaran` to the `Penelitian` table without a default value. This is not possible if the table is not empty.
  - Added the required column `bidangFokus` to the `Penelitian` table without a default value. This is not possible if the table is not empty.
  - Added the required column `jenisTKT` to the `Penelitian` table without a default value. This is not possible if the table is not empty.
  - Added the required column `jenisTargetTKT` to the `Penelitian` table without a default value. This is not possible if the table is not empty.
  - Added the required column `lamaKegiatan` to the `Penelitian` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `penelitian` DROP COLUMN `hki`,
    DROP COLUMN `kesiapanTek`,
    DROP COLUMN `namaBerkas`,
    DROP COLUMN `pubInter`,
    DROP COLUMN `pubNasion`,
    DROP COLUMN `ttg`,
    ADD COLUMN `biayaLuaran` VARCHAR(191) NOT NULL,
    ADD COLUMN `bidangFokus` VARCHAR(191) NOT NULL,
    ADD COLUMN `jenisTKT` VARCHAR(191) NOT NULL,
    ADD COLUMN `jenisTargetTKT` VARCHAR(191) NOT NULL,
    ADD COLUMN `lamaKegiatan` VARCHAR(191) NOT NULL;
