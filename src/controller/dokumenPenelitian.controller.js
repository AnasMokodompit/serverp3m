const responseModel = require('../utility/responModel')
const { PrismaClient } = require('@prisma/client')
const cloudinary = require('../utility/cloudinary')
const uploadCloudinary = async (path, opts) => await cloudinary.CloudinaryUpload(path,opts)

const prisma = new PrismaClient()


const getByIdDokumenPenelitian = async (req, res) => {
    try{
        const {id} = req.params

        console.log(req.params)

        const dataDokumen = await prisma.dokumenPenelitian.findUnique({
            where: {
                id: Number(id)
            }
        })

        return res.status(201).json(responseModel.success(201, dataDokumen))


    }catch(error){
        console.log(error)
        return res.status(500).json(responseModel.error(500, `Internal Server Error`))
    }
}

const updateDokumenPenelitian = async (req, res) => {
    try{
        const id = req.params.id
        
        
        if (req.file === undefined) {
            return res.status(404).json(responseModel.error(404, `Masukan FIle`))
        }

        const optionsCloudinary =  {
            folder: "P3MPolimdo/PDF/usulanPenelitianRevisi"
        }

        const UploadPDF = await uploadCloudinary(req.file.path, optionsCloudinary)

        const {public_id,secure_url} = UploadPDF

        const options = {
            // name: "Usulan Proposal",
            // nameUser: user.name,
            // idPenelitian: Number(id),
            urlPdfRevisi: secure_url,
            pdf_idRevisi: public_id,
            namePdfRevisi: req.file.originalname
        }

        const cekDataDokumenPenelitian = await prisma.dokumenPenelitian.findUnique({
            where: {
                id: Number(id)
            },
            include: {
                penelitian: true
            }
        })

        
        const updateRevisiDokumenPenelitian = await prisma.dokumenPenelitian.update({
            where: {
                id: Number(id)
            },
            data: options
        })

        await prisma.reviewPenelitian.updateMany({
            where: {
                judulPenelitian: cekDataDokumenPenelitian.penelitian.judul
            },
            data: {
                revisi: null
            }
        })


        await prisma.partisipasiPenelitian.updateMany({
            where: {
                judulPenelitian: cekDataDokumenPenelitian.penelitian.judul
            },
            data: {
                statusRevisi: false
            },
        })

        await prisma.penelitian.update({
            where: {
                id: cekDataDokumenPenelitian.penelitian.id
            },
            data: {
                statusRevisi: false
            }
        })

        return res.status(201).json(responseModel.success(201, updateRevisiDokumenPenelitian))

        
    }catch(error){
        console.log(error)
        return res.status(500).json(responseModel.error(500, `Internal Server Error`))
    }
}


module.exports = {
    getByIdDokumenPenelitian,
    updateDokumenPenelitian
}


