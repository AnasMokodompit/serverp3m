-- CreateTable
CREATE TABLE `User` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `name` VARCHAR(191) NOT NULL,
    `nomor_tlp` VARCHAR(191) NULL,
    `email` VARCHAR(191) NULL,
    `password` VARCHAR(191) NULL,
    `username` VARCHAR(191) NOT NULL,
    `nim` VARCHAR(191) NULL,
    `nidn` VARCHAR(191) NULL,
    `jurusanId` INTEGER NULL,
    `roleId` INTEGER NOT NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `provinsiId` INTEGER NULL,

    UNIQUE INDEX `User_name_key`(`name`),
    UNIQUE INDEX `User_email_key`(`email`),
    UNIQUE INDEX `User_username_key`(`username`),
    UNIQUE INDEX `User_nim_key`(`nim`),
    UNIQUE INDEX `User_nidn_key`(`nidn`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Pengabdian` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `judul` VARCHAR(191) NOT NULL,
    `tema` VARCHAR(191) NOT NULL,
    `abstraksi` VARCHAR(191) NOT NULL,
    `pubInter` VARCHAR(191) NOT NULL,
    `pubNasion` VARCHAR(191) NOT NULL,
    `namaBerkas` VARCHAR(191) NOT NULL,
    `keterangan` VARCHAR(191) NOT NULL,
    `waktu` DATETIME(3) NOT NULL,
    `statusPengabdian` INTEGER NOT NULL,

    UNIQUE INDEX `Pengabdian_judul_key`(`judul`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `PartisipasiPengabdian` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `nameUser` VARCHAR(191) NOT NULL,
    `judulPengabdian` VARCHAR(191) NOT NULL,
    `jabatan` VARCHAR(191) NOT NULL,
    `statusPartisipasi` INTEGER NOT NULL,
    `statusAkun` INTEGER NOT NULL,
    `tugasdlmPenlitian` VARCHAR(191) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Penelitian` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `judul` VARCHAR(191) NOT NULL,
    `tema` VARCHAR(191) NOT NULL,
    `abstraksi` VARCHAR(191) NOT NULL,
    `pubInter` VARCHAR(191) NOT NULL,
    `pubNasion` VARCHAR(191) NOT NULL,
    `hki` VARCHAR(191) NOT NULL,
    `ttg` VARCHAR(191) NOT NULL,
    `kesiapanTek` VARCHAR(191) NOT NULL,
    `namaBerkas` VARCHAR(191) NOT NULL,
    `statusPenelitian` INTEGER NOT NULL,

    UNIQUE INDEX `Penelitian_judul_key`(`judul`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `PartisipasiPenelitian` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `nameUser` VARCHAR(191) NOT NULL,
    `judulPenelitian` VARCHAR(191) NOT NULL,
    `jabatan` VARCHAR(191) NULL,
    `tugasdlmPenlitian` VARCHAR(191) NOT NULL,
    `statusPartisipasi` INTEGER NOT NULL,
    `statusAkun` INTEGER NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `ReviewPenelitian` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `nameUser` VARCHAR(191) NOT NULL,
    `judulPenelitian` VARCHAR(191) NOT NULL,
    `revisi` VARCHAR(191) NULL,
    `nilai1` INTEGER NULL,
    `nilai2` INTEGER NULL,
    `nilai3` INTEGER NULL,
    `nilai4` INTEGER NULL,
    `nilai5` INTEGER NULL,
    `nilai6` INTEGER NULL,
    `nilai7` INTEGER NULL,
    `nilai8` INTEGER NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `ReviewPengabdian` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `nameUser` VARCHAR(191) NOT NULL,
    `judulPenelitian` VARCHAR(191) NOT NULL,
    `revisi` VARCHAR(191) NULL,
    `nilai1` INTEGER NULL,
    `nilai2` INTEGER NULL,
    `nilai3` INTEGER NULL,
    `nilai4` INTEGER NULL,
    `nilai5` INTEGER NULL,
    `nilai6` INTEGER NULL,
    `nilai7` INTEGER NULL,
    `nilai8` INTEGER NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `CatatanHarian` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `partisipasiPenelitianId` INTEGER NULL,
    `partisipasiPengabdianId` INTEGER NULL,
    `kegiatan` VARCHAR(191) NOT NULL,
    `ttg` DATE NULL,
    `kehadiran` VARCHAR(191) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Prodi` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `name` VARCHAR(191) NOT NULL,
    `nameJurusan` VARCHAR(191) NOT NULL,

    UNIQUE INDEX `Prodi_name_key`(`name`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Jurusan` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `name` VARCHAR(191) NOT NULL,

    UNIQUE INDEX `Jurusan_name_key`(`name`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Role` (
    `id` INTEGER NOT NULL,
    `name` VARCHAR(191) NOT NULL,

    UNIQUE INDEX `Role_id_key`(`id`),
    UNIQUE INDEX `Role_name_key`(`name`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Provinsi` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `name` VARCHAR(191) NOT NULL,

    UNIQUE INDEX `Provinsi_name_key`(`name`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `KotaOrKabupaten` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `name` VARCHAR(191) NOT NULL,
    `provinsiId` INTEGER NOT NULL,

    UNIQUE INDEX `KotaOrKabupaten_name_key`(`name`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Kecamatan` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `name` VARCHAR(191) NOT NULL,
    `kotaOrKabupatenId` INTEGER NOT NULL,

    UNIQUE INDEX `Kecamatan_name_key`(`name`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `DesaOrKelurahan` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `name` VARCHAR(191) NOT NULL,
    `kecamatanId` INTEGER NOT NULL,

    UNIQUE INDEX `DesaOrKelurahan_name_key`(`name`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `User` ADD CONSTRAINT `User_jurusanId_fkey` FOREIGN KEY (`jurusanId`) REFERENCES `Jurusan`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `User` ADD CONSTRAINT `User_roleId_fkey` FOREIGN KEY (`roleId`) REFERENCES `Role`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `User` ADD CONSTRAINT `User_provinsiId_fkey` FOREIGN KEY (`provinsiId`) REFERENCES `Provinsi`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `PartisipasiPengabdian` ADD CONSTRAINT `PartisipasiPengabdian_nameUser_fkey` FOREIGN KEY (`nameUser`) REFERENCES `User`(`name`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `PartisipasiPengabdian` ADD CONSTRAINT `PartisipasiPengabdian_judulPengabdian_fkey` FOREIGN KEY (`judulPengabdian`) REFERENCES `Pengabdian`(`judul`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `PartisipasiPenelitian` ADD CONSTRAINT `PartisipasiPenelitian_nameUser_fkey` FOREIGN KEY (`nameUser`) REFERENCES `User`(`name`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `PartisipasiPenelitian` ADD CONSTRAINT `PartisipasiPenelitian_judulPenelitian_fkey` FOREIGN KEY (`judulPenelitian`) REFERENCES `Penelitian`(`judul`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `ReviewPenelitian` ADD CONSTRAINT `ReviewPenelitian_nameUser_fkey` FOREIGN KEY (`nameUser`) REFERENCES `User`(`name`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `ReviewPenelitian` ADD CONSTRAINT `ReviewPenelitian_judulPenelitian_fkey` FOREIGN KEY (`judulPenelitian`) REFERENCES `Penelitian`(`judul`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `ReviewPengabdian` ADD CONSTRAINT `ReviewPengabdian_nameUser_fkey` FOREIGN KEY (`nameUser`) REFERENCES `User`(`name`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `ReviewPengabdian` ADD CONSTRAINT `ReviewPengabdian_judulPenelitian_fkey` FOREIGN KEY (`judulPenelitian`) REFERENCES `Pengabdian`(`judul`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `CatatanHarian` ADD CONSTRAINT `CatatanHarian_partisipasiPenelitianId_fkey` FOREIGN KEY (`partisipasiPenelitianId`) REFERENCES `PartisipasiPenelitian`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `CatatanHarian` ADD CONSTRAINT `CatatanHarian_partisipasiPengabdianId_fkey` FOREIGN KEY (`partisipasiPengabdianId`) REFERENCES `PartisipasiPengabdian`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Prodi` ADD CONSTRAINT `Prodi_nameJurusan_fkey` FOREIGN KEY (`nameJurusan`) REFERENCES `Jurusan`(`name`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `KotaOrKabupaten` ADD CONSTRAINT `KotaOrKabupaten_provinsiId_fkey` FOREIGN KEY (`provinsiId`) REFERENCES `Provinsi`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Kecamatan` ADD CONSTRAINT `Kecamatan_kotaOrKabupatenId_fkey` FOREIGN KEY (`kotaOrKabupatenId`) REFERENCES `KotaOrKabupaten`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `DesaOrKelurahan` ADD CONSTRAINT `DesaOrKelurahan_kecamatanId_fkey` FOREIGN KEY (`kecamatanId`) REFERENCES `Kecamatan`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
