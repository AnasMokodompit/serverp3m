const express = require('express')
const router = express.Router()

const users = require('./users')
const pengabdian = require('./pengabdian')
const penelitian = require('./penelitian')
const anggotaPenelitian = require('./anggotaPenelitian')
const anggotaPengabdian = require('./anggotaPengabdian')
const catatanHarian = require('./catatanHarian')
const reviewerPenelitian = require('./reviewerPenelitian')
const reviewerPengabdian = require('./reviewerPengabdian')
const penJadwalan = require('./penjadwalan')
const jurusan = require('./jurusan')
const prodi = require('./prodi')
const revisiPenelitian = require('./revisiPenelitian')
const dokumen = require('./dokumen')
const laporanKemajuan = require('./laporan')
const nilaiUsulan = require('./nilaiUsulan')
const notification = require('./notification')
const skemaPenelitian = require('./skemaPenelitian')
const skemaPengabdian = require('./skemaPengabdian')
const deskripsiPenilaianPenelitian = require('./deskripsiPenilaianPenelitian')
const deskripsiPenilaianPengabdian = require('./deskripsiPenilaianPengabdian')
const ruangLingkupSkemaPengabdian = require('./ruangLingkupSkemaPengabdian')

router.use('/users', users)
router.use('/penelitian', penelitian)
router.use('/pengabdian', pengabdian)
router.use('/reviewerPenelitian', reviewerPenelitian)
router.use('/reviewerPengabdian', reviewerPengabdian)
router.use('/anggotaPenelitian', anggotaPenelitian)
router.use('/anggotaPengabdian', anggotaPengabdian)
router.use('/catatanHarian', catatanHarian)
router.use('/penJadwalan', penJadwalan)
router.use('/jurusan', jurusan)
router.use('/prodi', prodi)
router.use('/revisiPenelitian', revisiPenelitian)
router.use('/dokumen', dokumen)
router.use('/laporan', laporanKemajuan)
router.use('/nilaiUsulan', nilaiUsulan)
router.use('/notification', notification)
router.use('/skemaPenelitian', skemaPenelitian)
router.use('/skemaPengabdian', skemaPengabdian)
router.use('/deskripsiPenilaianPenelitian', deskripsiPenilaianPenelitian)
router.use('/deskripsiPenilaianPengabdian', deskripsiPenilaianPengabdian)
router.use('/ruangLingkupSkemaPengabdian', ruangLingkupSkemaPengabdian)

module.exports = router