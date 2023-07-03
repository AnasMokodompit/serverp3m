const responseModel = require('../utility/responModel')
const { PrismaClient } = require('@prisma/client')
const cloudinary = require('../utility/cloudinary')
const uploadCloudinary = async (path, opts) => await cloudinary.CloudinaryUpload(path,opts)


const prisma = new PrismaClient()

const getAllCatatanHarian = async (req, res) => {
    try{
        const user = req.user[0]
        const idPartisiPenelitian = []

        // return console.log(user.roleId)

        if (user.roleId === 1) {

            const getDataAllCatatanHarian = await prisma.catatanHarian.findMany({
                include: {
                    partisipasiPenelitian: {
                        include: {
                            penelitian: true
                        }
                    },
                    partisipasiPengabdian: true,
                    dokumenPenelitian: true
                },
            })
    
            // return console.log(getDataAllCatatanHarian)
    
            return res.status(200).json(responseModel.success(200, getDataAllCatatanHarian))
        }

        
        const cekNameUser = await prisma.partisipasiPenelitian.findMany({
            where: {
                nameUser: user?.name
            }
        })


        cekNameUser.map((data) => {
            idPartisiPenelitian.push(data.id)
        })


        // return console.log(idPartisiPenelitian)

        const getDataAllCatatanHarian = await prisma.catatanHarian.findMany({
            where: {
                partisipasiPenelitianId: {in: idPartisiPenelitian}
            },
            include: {
                partisipasiPenelitian: {
                    include: {
                        penelitian: true
                    }
                },
                partisipasiPengabdian: true,
                dokumenPenelitian: true
            },
        })

        // return console.log(getDataAllCatatanHarian)


        return res.status(200).json(responseModel.success(200, getDataAllCatatanHarian))


    }catch(error){
        console.log(error)
        return res.status(500).json(responseModel.error(500, `Internal Server Error`))
    }
}

const getByIdCatatanHarian = async (req, res) => {
    try{
        const {id} = req.params

        const getDataByIdCatatanHarian = await prisma.CatatanHarian.findUnique({
            where: {
                id: Number(id)
            },
            include: {
                partisipasiPenelitian: true,
                partisipasiPengabdian: true,
                dokumenPenelitian: true
            }
        })

        return res.status(200).json(responseModel.success(200, getDataByIdCatatanHarian))
        
    }catch(error){
        console.log(error)
        return res.status(500).json(responseModel.error(500, `Internal Server Error`))
    }
}

const createCatatanHarian = async (req, res) => {
    try{
        const {kegiatan, ttg, kehadiran, partisipasiPenelitianId, partisipasiPengabdianId} = req.body
        const user = req.user[0]
        let idDokumenCatatanHarian = ''
        let cekPenelitianId = ''

        // console.log(partisipasiPenelitianId, partisipasiPengabdianId)

        if (partisipasiPenelitianId) {
            cekPenelitianId = await prisma.partisipasiPenelitian.findUnique({
                where: {
                    id: Number(partisipasiPenelitianId)
                },
                include: {
                    penelitian: true
                }
            })
        }

        // return console.log(cekPenelitianId)

        const options ={
            kegiatan: kegiatan,
            ttg: ttg,
            kehadiran: kehadiran,
        }

        if (req.file !== undefined) {

            const optionsCloudinary =  {
                folder: "P3MPolimdo/PDF/catatanHarian"
            }

            const UploadPDF = await uploadCloudinary(req.file.path, optionsCloudinary)

            const {public_id,secure_url} = UploadPDF

            const options = {
                name: "Catatan Penelitian",
                nameUser: user.name,
                idPenelitian: cekPenelitianId?.penelitian?.id,
                urlPdf: secure_url,
                pdf_id: public_id,
                namePdf: req.file.originalname

            }

            const dataDokumenCatatanHarian = await prisma.dokumenPenelitian.create({
                data: options
            })

            idDokumenCatatanHarian = dataDokumenCatatanHarian.id
        }


        if (idDokumenCatatanHarian !== '') {
            options.idDokumenPenelitian = idDokumenCatatanHarian
        }

        if (partisipasiPenelitianId) {     
            options.partisipasiPenelitianId = Number(partisipasiPenelitianId)
        }

        if (partisipasiPengabdianId) {
            options.partisipasiPengabdianId = Number(partisipasiPengabdianId)
        }
        

        const dataCreateCatatanHarian = await prisma.CatatanHarian.create({
            data: options
        })

        return res.status(200).json(responseModel.success(200, dataCreateCatatanHarian))
        
    }catch(error){
        console.log(error)
        return res.status(500).json(responseModel.error(500, `Internal Server Error`))
    }
}


const updateByIdCatatanHarian = async (req, res) => {
    try{
        const {kegiatan, ttg, kehadiran, partisipasiPenelitianId, partisipasiPengabdianId} = req.body
        const {id} = req.params
        const user = req.user[0]
        let cekPenelitianId = ''

        // console.log(partisipasiPenelitianId, partisipasiPengabdianId)

        if (partisipasiPenelitianId) {
            cekPenelitianId = await prisma.partisipasiPenelitian.findUnique({
                where: {
                    id: Number(partisipasiPenelitianId)
                },
                include: {
                    penelitian: true
                }
            })
        }

        // return console.log(cekPenelitianId)
        

        const option = {
            kegiatan: kegiatan,
            ttg: ttg,
            kehadiran: kehadiran,
        }

        if (req.file !== undefined) {

            const cekCatatanHarian = await prisma.catatanHarian.findUnique({
                where: {
                    id: Number(id)
                },
                include: {
                    dokumenPenelitian: true
                }
            })


            
            const optionsCloudinary =  {
                folder: "P3MPolimdo/PDF/catatanHarian"
            }
            
            const UploadPDF = await uploadCloudinary(req.file.path, optionsCloudinary)
            
            const {public_id,secure_url} = UploadPDF
            
            const options = {
                name: "Catatan Penelitian",
                nameUser: user.name,
                idPenelitian: cekPenelitianId?.penelitian?.id,
                urlPdf: secure_url,
                pdf_id: public_id,
                namePdf: req.file.originalname
                
            }

            // return console.log(cekCatatanHarian, options)
            
            if (cekCatatanHarian?.dokumenPenelitian?.id) {
                await prisma.dokumenPenelitian.update({
                    where: {
                        id: cekCatatanHarian.dokumenPenelitian.id
                    },
                    data: options
                })
            }else{

                const createDokumen =  await prisma.dokumenPenelitian.create({
                    data: options
                })
                // console.log("ada", createDokumen)

                option.idDokumenPenelitian = createDokumen.id
            }


        }



        if (partisipasiPenelitianId) {     
           option.partisipasiPenelitianId = Number(partisipasiPenelitianId)
        }

        if (partisipasiPengabdianId) {
            option.partisipasiPengabdianId = Number(partisipasiPengabdianId)
        }


        // return console.log(option)

        const dataUpdateCatatanHarian = await prisma.CatatanHarian.update({
            where: {
                id: Number(id)
            },
            data: option
        })

        return res.status(200).json(responseModel.success(200, dataUpdateCatatanHarian))

        
    }catch(error){
        console.log(error)
        return res.status(500).json(responseModel.error(500, `Internal Server Error`))
    }
}


const deleteByIdCatatanHarian = async (req, res) => {
    try{

        const {id} = req.params

        const cekCatatanHarian = await prisma.catatanHarian.findUnique({
            where: {
                id: Number(id)
            },
            include: {
                dokumenPenelitian: true
            }
        })


        // return console.log(cekCatatanHarian?.dokumenPenelitian)

        if (cekCatatanHarian?.dokumenPenelitian !== null) {
            
            await prisma.dokumenPenelitian.delete({
                where: {
                    id: cekCatatanHarian.dokumenPenelitian.id
                }
            })
        }


        const dataDeleteCatatanHarianPengabdian = await prisma.CatatanHarian.delete({
            where: {
                id: Number(id)
            }
        })

        return res.status(200).json(responseModel.success(200, dataDeleteCatatanHarianPengabdian))
        
    }catch(error){
        console.log(error)
        return res.status(500).json(responseModel.error(500, `Internal Server Error`))
    }
}


module.exports = {
    getAllCatatanHarian,
    getByIdCatatanHarian,
    createCatatanHarian,
    updateByIdCatatanHarian,
    deleteByIdCatatanHarian
}


