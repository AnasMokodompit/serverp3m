const router = require('express').Router()
const {getAllNilaiPenelian, getByIdNilaiPenelitian} = require('../controller/nilaiUsulan.controller')
const authJWT = require('../middleware/passport-jwt')

router.get('/', authJWT, getAllNilaiPenelian)
router.get('/:id', authJWT, getByIdNilaiPenelitian)

module.exports = router