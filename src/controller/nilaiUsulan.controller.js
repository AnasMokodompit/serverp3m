const responseModel = require('../utility/responModel')
const { PrismaClient } = require('@prisma/client')


const prisma = new PrismaClient()

const getAllNilaiPenelian = async (req, res) => {
    try{
        const {id, sebagai} = req.query


        console.log(id, sebagai)


        const cekPenelian = await prisma.penelitian.findUnique({
            where: {
                id: Number(id)
            }
        })


        const cekReviewer = await prisma.reviewPenelitian.findMany({
            where: {
                judulPenelitian: cekPenelian.judul,
                sebagai: sebagai
            }
        })

        
        const cekNilaiPenelitian = await prisma.nilaiPenelitian.findMany({
            where: {
                idReviewPenelitian: cekReviewer[0].id
            }
        })
        
        const cekRataRataAndTotal = await prisma.nilaiPenelitian.groupBy({
            where: {
                judulPenelitian:  cekPenelian.judul
            },
            by: ['judulPenelitian'],
            _count: {
                _all: true,
                nilai: true,
            },
            _sum: {
                nilai: true,
            },
            _avg: {
                nilai: true
            },
            orderBy: {
                judulPenelitian: 'desc',
            },
            // having: {
            //     nilai: {
            //       _avg: {
            //         gt: 75,
            //       },
            //     },
            //   },
        })

        const response = {
            nilaiPenelitian: cekNilaiPenelitian,
            rataRataAndTotal: cekRataRataAndTotal

        }

        return res.status(201).json(responseModel.success(201, response))


    }catch(error){
        console.log(error)
        return res.status(500).json(responseModel.error(500, `Internal Server Error`))
    }
} 

const getByIdNilaiPenelitian = async (req, res) => {
    try{
        const {id} = req.params

        const cekReviewer = await prisma.reviewPenelitian.findUnique({
            where: {
                id: Number(id)
            }
        })

        // console.log(cekReviewer.judulPenelitian)

        const cekNilaiPenelitian = await prisma.nilaiPenelitian.findMany({
            where: {
                idReviewPenelitian: Number(id)
            }
        })

        // console.log(cekNilaiPenelitian)
        
        const cekRataRataAndTotal = await prisma.nilaiPenelitian.groupBy({
            where: {
                judulPenelitian:  cekReviewer.judulPenelitian,
                idReviewPenelitian: Number(id)
            },
            by: ['judulPenelitian'],
            _count: {
                _all: true,
                nilai: true,
            },
            _sum: {
                nilai: true,
            },
            _avg: {
                nilai: true
            },
            orderBy: {
                judulPenelitian: 'desc',
            },
            // having: {
            //     nilai: {
            //       _avg: {
            //         gt: 75,
            //       },
            //     },
            //   },
        })

        const response = {
            nilaiPenelitian: cekNilaiPenelitian,
            rataRataAndTotal: cekRataRataAndTotal,
            Reviewer: cekReviewer

        }

        // console.log(response)
        return res.status(201).json(responseModel.success(201, response))

    }catch(error){
        console.log(error)
        return res.status(500).json(responseModel.error(500, `Internal Server Error`))
    }
}


module.exports = {
    getAllNilaiPenelian,
    getByIdNilaiPenelitian
}