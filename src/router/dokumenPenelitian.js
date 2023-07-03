const router = require('express').Router()
const {getByIdDokumenPenelitian, updateDokumenPenelitian} = require('../controller/dokumenPenelitian.controller')
const authJWT = require('../middleware/passport-jwt')
const {upload, MulterError} = require('../middleware/multerPdf')


router.get('/:id', authJWT, getByIdDokumenPenelitian)
router.patch('/:id', authJWT,  upload.single('usulan_pdf_revisi'), MulterError, updateDokumenPenelitian)

module.exports = router

