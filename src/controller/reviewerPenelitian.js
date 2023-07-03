const responseModel = require('../utility/responModel')
const { PrismaClient } = require('@prisma/client')

const prisma = new PrismaClient()


const getAllReviewerPenelitian = async (req,res) => {
    try{
        const {judul} = req.query
        const user = req.user[0]

        if (user.roleId === 1) {
            
            const getAllReviewPenelitianByNamePenelitian = await prisma.reviewPenelitian.findMany({
                where: {
                    judulPenelitian: judul
                },
                include: {
                    user: true,
                    penelitian: true
                }
            })


            // console.log(getAllReviewPenelitianByNamePenelitian)
            return res.status(200).json(responseModel.success(200, getAllReviewPenelitianByNamePenelitian))

        }

        if (user.roleId === 2) {    

            const getAllReviewerPenelitianForUserReviewer = await prisma.ReviewPenelitian.findMany({
                where: {
                    nameUser: user.name
                },
                include: {
                    user: true,
                    penelitian: {
                        include: {
                            reviewPenelitian:true
                        }
                    },
                    nilaiPenelitian: true
                }
            })
    
    
            return res.status(200).json(responseModel.success(200, getAllReviewerPenelitianForUserReviewer))
        }



    }catch(error){
        console.log(error)
        return res.status(500).json(responseModel.error(500, `Internal Server Error`))
    }
}


const getByIdReviewerPenelitian = async (req, res) => {
    try{
        const {id} = req.params

        const dataByIdReviewerPenelitian = await prisma.reviewPenelitian.findUnique({
            where: {
                id: Number(id)
            },
            include: {
                user: true,
                penelitian: true,
                nilaiPenelitian: true
            }
        })

        return res.status(200).json(responseModel.success(200, dataByIdReviewerPenelitian))


    }catch(error){
        console.log(error)
        return res.status(500).json(responseModel.error(500, `Internal Server Error`))
    }
}

const createReviewerPenelitan = async (req, res) => {
    try{
        const data = req.body

        const nameUserCek = data.map((value) => value.nameUser)

        
        const cekDataUser = await prisma.user.findMany({
            where: {
                name: {in: nameUserCek}
            }
        })

        const valuesIsYes = []

        cekDataUser.map((data) => {
            valuesIsYes.push(data.name)
        })

        
        const dataNot = []
        
        let newDataNotDaftar = nameUserCek.filter((nama) => {
            const redy = valuesIsYes.includes(nama)
            if (redy === false) {
                return dataNot.push(nama)
            }
        })


        if (newDataNotDaftar.length !== 0) {
            
            console.log(newDataNotDaftar)
    
            return res.status(404).json(responseModel.error(404, `User ${newDataNotDaftar.map((data) => data)} Tidak Terdaftar`))

        }
        
        
        const createReviewerPenelitian = await prisma.ReviewPenelitian.createMany({
            data: data
        })

        return res.status(200).json(responseModel.success(200, createReviewerPenelitian))
        

    
    }catch(error){
        console.log(error)
        return res.status(500).json(responseModel.error(500, `Internal Server Error`))
    }
}


const updateReviewerPenelitian = async (req, res) => {
    try{
        
        const {Data, idDeleteReviewer} = req.body

        const nameUserCek = Data.map((value) => value.nameUser)

        
        const cekDataUser = await prisma.user.findMany({
            where: {
                name: {in: nameUserCek}
            }
        })

        const valuesIsYes = []

        cekDataUser.map((data) => {
            valuesIsYes.push(data.name)
        })

        
        const dataNot = []
        
        let newDataNotDaftar = nameUserCek.filter((nama) => {
            const redy = valuesIsYes.includes(nama)
            if (redy === false) {
                return dataNot.push(nama)
            }
        })


        if (newDataNotDaftar.length !== 0) {
            
            console.log(newDataNotDaftar)
    
            return res.status(404).json(responseModel.error(404, `User ${newDataNotDaftar.map((data) => data)} Tidak Terdaftar`))

        }


        if (idDeleteReviewer.length !== 0) {
            await prisma.reviewPenelitian.deleteMany({
                where: {
                    id: {in: idDeleteReviewer}
                }
            })
        }


        Data.map(async (data,i ) => {
            console.log(data)
            if (!data.id) {
                
                await prisma.reviewPenelitian.create({
                    data: {
                        nameUser: data.nameUser,
                        judulPenelitian: data.judulPenelitian,
                        sebagai: data.sebagai
                    }
                })

            }else{
                
                await prisma.reviewPenelitian.update({
                    where: {
                        id: data.id
                  },
                  data: {
                    nameUser: data.nameUser,
                    judulPenelitian: data.judulPenelitian,
                    sebagai: data.sebagai
                  }
                })
            }
        })


        return res.status(200).json(responseModel.success(200, `Reviewer Penelitian Berhasil Diperbarui`))


    }catch(error) {
        console.log(error)
        return res.status(500).json(responseModel.error(500, `Internal Server Error`))
    }
}


const updateReviewerByUserPenelitian = async (req, res) => {
    try{
        const {id} = req.params
        const {nilai, revisi} = req.body
        const dataUserPartisipasi = []
        const idNilai = []


        
        
        const cekByIdDataReviewer = await prisma.reviewPenelitian.findUnique({
            where: {
                id: Number(id)
            },
            include: {
                penelitian: {
                    include: {
                        partisipasiPenelitian: true
                    }
                },
                nilaiPenelitian: true
            }
        })


        nilai.map((data, i) => {
           data.idReviewPenelitian = cekByIdDataReviewer.id
           data.judulPenelitian = cekByIdDataReviewer.judulPenelitian

           if (data?.nilai) {
               data.nilai = Number(data.nilai)
           }
        })

        
        if (revisi) {

            await prisma.partisipasiPenelitian.updateMany({
                where: {
                    judulPenelitian: cekByIdDataReviewer.judulPenelitian
                },
                data: {
                    statusRevisi: true
                },
            })

            await prisma.penelitian.update({
                where: {
                    id: cekByIdDataReviewer.penelitian.id
                },
                data: {
                    statusRevisi: true
                }
            })

        }

        if (cekByIdDataReviewer.nilaiPenelitian.length !== 0) {
            
            await prisma.nilaiPenelitian.deleteMany({
                where: {
                    idReviewPenelitian: cekByIdDataReviewer.id
                }
            })
            
        }

        await prisma.NilaiPenelitian.createMany({
            data: nilai
        })
        
        
        const dataUpdateReviewerByUserPenelitian = await prisma.reviewPenelitian.update({
            where: {
                id: cekByIdDataReviewer.id
            },
            data: {
                revisi: revisi
            },
            include: {
                nilaiPenelitian: true
            }
        })


        return res.status(200).json(responseModel.success(200, dataUpdateReviewerByUserPenelitian))


    }catch(error){
        console.log(error)
        return res.status(500).json(responseModel.error(500, `Internal Server Error`))
    }
}

const deleteReviewerPenelitian = async (req, res) => {
    try{
        const {id} = req.params

        console.log(id)

        const deleteReviewerPenelitian = await prisma.reviewPenelitian.delete({
            where: {
                id: Number(id)
            }
        })

        return res.status(200).json(responseModel.success(200, deleteReviewerPenelitian))

    }catch(error){
        console.log(error)
        return res.status(500).json(responseModel.error(500, `Internal Server Error`))
    }
}


module.exports = {
    getAllReviewerPenelitian,
    getByIdReviewerPenelitian,
    createReviewerPenelitan,
    updateReviewerPenelitian,
    updateReviewerByUserPenelitian,
    deleteReviewerPenelitian,
}