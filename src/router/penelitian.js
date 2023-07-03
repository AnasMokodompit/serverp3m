const router = require('express').Router()
const {getByAllPenelitianForCatatanHarian, getByAllPenelitianForLaporan, getStatisticByUser, getAllDiajukanPenelitian, getAllPengusulPenelitian, getAllKeangotaanPenelitian, UpdateStatusPartisiPasiPenelitian, getByAllPenelitian, getByIdPenelitian, createPenelitian, updatePenelitian, deletePenelitian} = require('../controller/penelitian.contoller')
const authJWT = require('../middleware/passport-jwt')
const {upload, MulterError} = require('../middleware/multerPdf')

router.get('/', authJWT, getByAllPenelitian)
router.get('/catatanHarian', authJWT, getByAllPenelitianForCatatanHarian)
router.get('/laporan', authJWT, getByAllPenelitianForLaporan)
router.get('/statisticPenelitian', authJWT, getStatisticByUser)
router.get('/keanggotaan', authJWT, getAllKeangotaanPenelitian)
router.get('/usulan', authJWT, getAllPengusulPenelitian)
router.get('/diajukan', authJWT, getAllDiajukanPenelitian)
router.get('/:id',authJWT, getByIdPenelitian)
router.post('/', authJWT, upload.single('usulan_pdf'), MulterError, createPenelitian)
router.patch('/:id', authJWT, upload.single('usulan_pdf'), MulterError, updatePenelitian)
router.patch('/statusPartisipasi/:id', authJWT, UpdateStatusPartisiPasiPenelitian)
router.delete('/:id', authJWT, deletePenelitian)


module.exports = router