/*
  Warnings:

  - You are about to drop the column `provinsiId` on the `user` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE `user` DROP FOREIGN KEY `User_provinsiId_fkey`;

-- AlterTable
ALTER TABLE `user` DROP COLUMN `provinsiId`,
    ADD COLUMN `alamat` VARCHAR(191) NULL;
