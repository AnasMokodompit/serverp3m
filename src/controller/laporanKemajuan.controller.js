const responseModel = require('../utility/responModel')
const { PrismaClient } = require('@prisma/client')
const cloudinary = require('../utility/cloudinary')
const uploadCloudinary = async (path, opts) => await cloudinary.CloudinaryUpload(path,opts)

const prisma = new PrismaClient()


const getByAllLaporanKemajuan = async (req, res) => {
    try{
        const user = req.user[0]
        const judulPenelitian = []

        if (user.roleId === 1) {
            const cekDataLaporanPenelitian = await prisma.laporanKemajuan.findMany({
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
    
            // return console.log(cekDataLaporanPenelitian)
    
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

        const cekDataLaporanPenelitian = await prisma.laporanKemajuan.findMany({
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

        // return console.log(cekDataLaporanPenelitian)

        return res.status(200).json(responseModel.success(200, cekDataLaporanPenelitian))

    }catch(error){
        console.log(error)
        return res.status(500).json(responseModel.error(500, `Internal Server Error`))
    }
}


const getByIdLaporanKemajuan = async (req, res) => {
    try{

        const {id} = req.params

        const getDataByIdLaporanKemajuan = await prisma.LaporanKemajuan.findUnique({
            where: {
                id: Number(id)
            },
            include: {
                penelitian: true,
                dokumenPenelitian: true
            }
        })

        return res.status(200).json(responseModel.success(200, getDataByIdLaporanKemajuan))


    }catch(error){
        console.log(error)
        return res.status(500).json(responseModel.error(500, `Internal Server Error`))
    }
}

const CreateLaporanKemajuan = async (req, res) => {
    try{

        const {judul, tahapKemajuan} = req.body
        const user = req.user[0]
        let idDokumenCatatanHarian = ''

        const options = {
            judulPenelitian: judul,
            tahanKemajuan: tahapKemajuan
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


        // return console.log(cekPatisiPenelitian)

        const cekPenelitian = await prisma.penelitian.findUnique({
            where: {
                judul: judul
            }
        })

        if (req.file !== undefined) {

            const optionsCloudinary =  {
                folder: "P3MPolimdo/PDF/laporanKemajuan"
            }

            const UploadPDF = await uploadCloudinary(req.file.path, optionsCloudinary)

            const {public_id,secure_url} = UploadPDF

            const options = {
                name: "Laporan Kemajuan",
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

        const dataCreateLaporanKemajuan = await prisma.LaporanKemajuan.create({
            data: options
        })

        return res.status(200).json(responseModel.success(200, dataCreateLaporanKemajuan))

    }catch(error){
        console.log(error)
        return res.status(500).json(responseModel.error(500, `Internal Server Error`))
    }
}

const UpdateByIdLaporanKemajuan = async (req, res) => {
    try{

        const {judul, tahapKemajuan} = req.body
        const user = req.user[0]
        const {id} = req.params

        const option = {
            judulPenelitian: judul,
            tahanKemajuan: tahapKemajuan
        } 

        const cekPenelitian = await prisma.LaporanKemajuan.findUnique({
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
                folder: "P3MPolimdo/PDF/laporanKemajuan"
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

        const dataCreateLaporanKemajuan = await prisma.LaporanKemajuan.update({
            where:  {
                id: Number(id)
            },
            data: option
        })

        return res.status(200).json(responseModel.success(200, dataCreateLaporanKemajuan))

    }catch(error){
        console.log(error)
        return res.status(500).json(responseModel.error(500, `Internal Server Error`))
    }
}

const DeleteByIdLaporanKemajuan = async (req, res) => {
    try{

        const {id} = req.params

        const cekPenelitian = await prisma.LaporanKemajuan.findUnique({
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


        const dataDeleteLaporanKemajuan = await prisma.LaporanKemajuan.delete({
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
    getByAllLaporanKemajuan,
    getByIdLaporanKemajuan,
    CreateLaporanKemajuan,
    UpdateByIdLaporanKemajuan,
    DeleteByIdLaporanKemajuan
}

