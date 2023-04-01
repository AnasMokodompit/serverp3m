const router = require('express').Router();
const { PrismaClient } = require('@prisma/client')

const prisma = new PrismaClient()

router.get('/users', async (req, res, next) => {
  try {
    const users = await prisma.User.findMany({
      include: { alamat : true }
    })

    res.json(users)
  } catch (error) {
    next(error)
  }
});

router.get('/users/:id', async (req, res, next) => {
  try {

    const {id} = req.params
    const users = await prisma.User.findUnique({
      where: {
        id: Number(id)
      },
      include: { alamat : true }
    })
    res.json(users)
  } catch (error) {
    next(error)
  }
});

router.post('/users', async (req, res, next) => {
  try {
    const users = await prisma.User.create({
      data: req.body,
      include: { alamat : true }
    })

    res.json(users)
  } catch (error) {
    next(error)
  }
});

router.patch('/users/:id', async (req, res, next) => {
  try {
    const {id} = req.params
    const user = await prisma.User.update({
      where: {
        id: Number(id)
      },
      data: req.body,
      include: { alamat : true }
    })

    res.json(user)
  } catch (error) {
    next(error)
  }
});


router.delete('/users/:id', async (req, res, next) => {
  try {

    const {id} = req.params
    const deleteUsers = await prisma.User.delete({
      where: {
        id: Number(id)
      }
    })
    res.json(deleteUsers)
  } catch (error) {
    next(error)
  }
});




module.exports = router;
