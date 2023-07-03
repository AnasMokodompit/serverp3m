const router = require('express').Router()
const {getByAllLaporanKemajuan, getByIdLaporanKemajuan, CreateLaporanKemajuan, UpdateByIdLaporanKemajuan, DeleteByIdLaporanKemajuan} = require('../controller/laporanKemajuan.controller')
const {getByAllLaporanTahunan, getByIdLaporanTahunan, CreateLaporanTahunan, UpdateByIdLaporanTahunan, DeleteByIdLaporanTahunan} = require('../controller/laporanTahunan.controller')
const {getByAllLaporanAkhir, getByIdLaporanAkhir, CreateLaporanAkhir, UpdateByIdLaporanAkhir, DeleteByIdLaporanAkhir} = require('../controller/laporanAkhir.controller')
const authJWT = require('../middleware/passport-jwt')
const {upload, MulterError} = require('../middleware/multerPdf')

// Kemajuan
router.get('/kemajuan', authJWT, getByAllLaporanKemajuan)
router.get('/kemajuan/:id', authJWT, getByIdLaporanKemajuan)
router.post('/kemajuan', authJWT, upload.single('laporan_kemajuan_pdf'), MulterError, CreateLaporanKemajuan)
router.patch('/kemajuan/:id', upload.single('laporan_kemajuan_pdf'), MulterError, authJWT, UpdateByIdLaporanKemajuan)
router.delete('/kemajuan/:id', authJWT, DeleteByIdLaporanKemajuan)

// Tahunan
router.get('/tahunan', authJWT, getByAllLaporanTahunan)
router.get('/tahunan/:id', authJWT, getByIdLaporanTahunan)
router.post('/tahunan', authJWT, upload.single('laporan_tahunan_pdf'), MulterError, CreateLaporanTahunan)
router.patch('/tahunan/:id', upload.single('laporan_tahunan_pdf'), MulterError, authJWT, UpdateByIdLaporanTahunan)
router.delete('/tahunan/:id', authJWT, DeleteByIdLaporanTahunan)


// Akhir
router.get('/akhir', authJWT, getByAllLaporanAkhir)
router.get('/akhir/:id', authJWT, getByIdLaporanAkhir)
router.post('/akhir', authJWT, upload.single('laporan_akhir_pdf'), MulterError, CreateLaporanAkhir)
router.patch('/akhir/:id', upload.single('laporan_akhir_pdf'), MulterError, authJWT, UpdateByIdLaporanAkhir)
router.delete('/akhir/:id', authJWT, DeleteByIdLaporanAkhir)

module.exports = router