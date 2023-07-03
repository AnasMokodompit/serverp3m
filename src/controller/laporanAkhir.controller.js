const responseModel = require('../utility/responModel')
const { PrismaClient } = require('@prisma/client')
const cloudinary = require('../utility/cloudinary')
const uploadCloudinary = async (path, opts) => await cloudinary.CloudinaryUpload(path,opts)

const prisma = new PrismaClient()

const getByAllLaporanAkhir = async (req, res) => {
    try{
        const user = req.user[0]
        const judulPenelitian = []

        if (user.roleId === 1) {
            const cekDataLaporanPenelitian = await prisma.laporanAkhir.findMany({
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

        const cekDataLaporanPenelitian = await prisma.laporanAkhir.findMany({
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

    }
}


const getByIdLaporanAkhir = async (req, res) => {
    try{

        const {id} = req.params

        const getDataByIdLaporanAkhir = await prisma.LaporanAkhir.findUnique({
            where: {
                id: Number(id)
            },
            include: {
                penelitian: true,
                dokumenPenelitian: true
            }
        })

        return res.status(200).json(responseModel.success(200, getDataByIdLaporanAkhir))

    }catch(error){
        console.log(error)
        return res.status(500).json(responseModel.error(500, `Internal Server Error`))
    }
}


const CreateLaporanAkhir = async (req, res) => {
    try{

        const {judul} = req.body
        const user = req.user[0]
        let idDokumenCatatanHarian = ''

        const cekLaporanAkhirTelahAda = await prisma.LaporanAkhir.findMany({
            where: {
                judulPenelitian: judul
            }
        })

        // return console.log(cekLaporanAkhirTelahAda.length)

        if (cekLaporanAkhirTelahAda.length !== 0) {
            return res.status(404).json(responseModel.error(404, `Laporan Akhir Telah DImasukan`))
        }

        const options = {
            judulPenelitian: judul,
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
                folder: "P3MPolimdo/PDF/laporanAkhir"
            }

            const UploadPDF = await uploadCloudinary(req.file.path, optionsCloudinary)

            const {public_id,secure_url} = UploadPDF

            const options = {
                name: "Laporan Akhir",
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

        const dataCreateLaporanAkhir = await prisma.LaporanAkhir.create({
            data: options
        })

        return res.status(200).json(responseModel.success(200, dataCreateLaporanAkhir))

    }catch(error){
        console.log(error)
        return res.status(500).json(responseModel.error(500, `Internal Server Error`))
    }
}


const UpdateByIdLaporanAkhir = async (req, res) => {
    try{

        const {judul} = req.body
        const user = req.user[0]
        const {id} = req.params

        const option = {
            judulPenelitian: judul,
        } 

        const cekPenelitian = await prisma.LaporanAkhir.findUnique({
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
                folder: "P3MPolimdo/PDF/laporanAkhir"
            }

            const UploadPDF = await uploadCloudinary(req.file.path, optionsCloudinary)

            const {public_id,secure_url} = UploadPDF

            const options = {
                name: "Laporan Akhir",
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

        const dataCreateLaporanAkhir = await prisma.LaporanAkhir.update({
            where:  {
                id: Number(id)
            },
            data: option
        })

        return res.status(200).json(responseModel.success(200, dataCreateLaporanAkhir))

    }catch(error){
        console.log(error)
        return res.status(500).json(responseModel.error(500, `Internal Server Error`))
    }
}


const DeleteByIdLaporanAkhir = async (req, res) => {
    try{

        const {id} = req.params

        const cekPenelitian = await prisma.LaporanAkhir.findUnique({
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

        const dataDeleteLaporanAkhir = await prisma.LaporanAkhir.delete({
            where: {
                id: Number(id)
            }
        })

        return res.status(200).json(responseModel.success(200, dataDeleteLaporanAkhir))

    }catch(error){
        console.log(error)
        return res.status(500).json(responseModel.error(500, `Internal Server Error`))
    }
}



module.exports = {
    getByAllLaporanAkhir,
    getByIdLaporanAkhir,
    CreateLaporanAkhir,
    UpdateByIdLaporanAkhir,
    DeleteByIdLaporanAkhir
}