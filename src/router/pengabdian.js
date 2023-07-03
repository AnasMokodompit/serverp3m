const router = require('express').Router()
const { getByAllPengabdian, getByIdPengabdian, createPengabdiann, updatePengabdian, deletePengabdian } = require('../controller/pengabdian.contoller')
const authJWT = require('../middleware/passport-jwt')

router.get('/', authJWT, getByAllPengabdian)
router.get('/:id', authJWT, getByIdPengabdian)
router.post('/', authJWT, createPengabdiann)
router.patch('/:id', authJWT, updatePengabdian)
router.delete('/:id', authJWT, deletePengabdian)


module.exports = router

