const responseModel = require('../utility/responModel')
const { PrismaClient } = require('@prisma/client')
const cloudinary = require('../utility/cloudinary')
const uploadCloudinary = async (path, opts) => await cloudinary.CloudinaryUpload(path,opts)

const prisma = new PrismaClient()

const getByAllLaporanTahunan = async (req, res) => {
    try{
        const user = req.user[0]
        const judulPenelitian = []

        if (user.roleId === 1) {
            const cekDataLaporanPenelitian = await prisma.laporanTahunan.findMany({
                include: {
                    penelitian: true,
                    dokumenPenelitian: true,
                    partisipasiPenelitian: {
                        include: {
                            user: true
                        }
                    }
                }
            })
    
            return res.status(200).json(responseModel.success(200, cekDataLaporanPenelitian))
        }

        
        const cekNameUser = await prisma.partisipasiPenelitian.findMany({
            where: {
                nameUser: user?.name
            }
        })


        // return console.log(cekNameUser)

        cekNameUser.map((data) => {
            judulPenelitian.push(data.judulPenelitian)
        })

        const cekDataLaporanPenelitian = await prisma.laporanTahunan.findMany({
            where: {
                judulPenelitian: {in: judulPenelitian}
            },
            include: {
                penelitian: true,
                dokumenPenelitian: true,
                partisipasiPenelitian: {
                    include: {
                        user: true
                    }
                }
            }
        })

        return res.status(200).json(responseModel.success(200, cekDataLaporanPenelitian))

    }catch(error){
        console.log(error)
        return res.status(500).json(responseModel.error(500, `Internal Server Error`))
    }
}


const getByIdLaporanTahunan = async (req, res) => {
    try{

        const {id} = req.params

        const getDataByIdLaporanTahunan = await prisma.LaporanTahunan.findUnique({
            where: {
                id: Number(id)
            },
            include: {
                penelitian: true,
                dokumenPenelitian: true
            }
        })

        return res.status(200).json(responseModel.success(200, getDataByIdLaporanTahunan))

    }catch(error){
        console.log(error)
        return res.status(500).json(responseModel.error(500, `Internal Server Error`))
    }
}


const CreateLaporanTahunan = async (req, res) => {
    try{

        const {judul, tahun} = req.body
        const user = req.user[0]
        let idDokumenCatatanHarian = ''

        const options = {
            judulPenelitian: judul,
            tahun: tahun
        }

        const cekPatisiPenelitian = await prisma.partisipasiPenelitian.findMany({
            where: {
                judulPenelitian: judul,
                nameUser: user.name,
                jabatan: "Ketua Pengusul"
            }
        })

        if (cekPatisiPenelitian) {
            options.partisipasiPenelitianId = cekPatisiPenelitian[0].id
        }

        const cekPenelitian = await prisma.penelitian.findUnique({
            where: {
                judul: judul
            }
        })

        if (req.file !== undefined) {

            const optionsCloudinary =  {
                folder: "P3MPolimdo/PDF/laporanTahunan"
            }

            const UploadPDF = await uploadCloudinary(req.file.path, optionsCloudinary)

            const {public_id,secure_url} = UploadPDF

            const options = {
                name: "Laporan Tahunan",
                nameUser: user.name,
                idPenelitian: cekPenelitian.id,
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

        const dataCreateLaporanTahunan = await prisma.LaporanTahunan.create({
            data: options
        })

        return res.status(200).json(responseModel.success(200, dataCreateLaporanTahunan))

    }catch(error){
        console.log(error)
        return res.status(500).json(responseModel.error(500, `Internal Server Error`))
    }
}


const UpdateByIdLaporanTahunan = async (req, res) => {
    try{

        const {judul, tahun} = req.body
        const user = req.user[0]
        const {id} = req.params

        const option = {
            judulPenelitian: judul,
            tahun: tahun
        } 

        const cekPenelitian = await prisma.LaporanTahunan.findUnique({
            where: {
                id: Number(id)
            },
            include: {
                penelitian: true,
                dokumenPenelitian: true
            }
        })

        if (req.file !== undefined) {

            const optionsCloudinary =  {
                folder: "P3MPolimdo/PDF/laporanTahunan"
            }

            const UploadPDF = await uploadCloudinary(req.file.path, optionsCloudinary)

            const {public_id,secure_url} = UploadPDF

            const options = {
                name: "Laporan Kemajuan",
                nameUser: user.name,
                idPenelitian: cekPenelitian?.penelitian.id,
                urlPdf: secure_url,
                pdf_id: public_id,
                namePdf: req.file.originalname

            }

            if (cekPenelitian?.dokumenPenelitian?.id) {
                await prisma.dokumenPenelitian.update({
                    where: {
                        id: cekPenelitian?.dokumenPenelitian.id
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

        const dataCreateLaporanTahunan = await prisma.LaporanTahunan.update({
            where:  {
                id: Number(id)
            },
            data: option
        })

        return res.status(200).json(responseModel.success(200, dataCreateLaporanTahunan))

    }catch(error){
        console.log(error)
        return res.status(500).json(responseModel.error(500, `Internal Server Error`))
    }
}


const DeleteByIdLaporanTahunan = async (req, res) => {
    try{

        const {id} = req.params

        const cekPenelitian = await prisma.LaporanTahunan.findUnique({
            where: {
                id: Number(id)
            },
            include: {
                penelitian: true,
                dokumenPenelitian: true
            }
        })

        if (cekPenelitian?.dokumenPenelitian?.id) {     
            await prisma.dokumenPenelitian.delete({
                where: {
                    id: cekPenelitian.dokumenPenelitian.id
                }
            })
        }

        const dataDeleteLaporanKemajuan = await prisma.LaporanTahunan.delete({
            where: {
                id: Number(id)
            }
        })

        return res.status(200).json(responseModel.success(200, dataDeleteLaporanKemajuan))

    }catch(error){
        console.log(error)
        return res.status(500).json(responseModel.error(500, `Internal Server Error`))
    }
}


module.exports = {
    getByAllLaporanTahunan,
    getByIdLaporanTahunan,
    CreateLaporanTahunan,
    UpdateByIdLaporanTahunan,
    DeleteByIdLaporanTahunan
}
