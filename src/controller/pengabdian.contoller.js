const responseModel = require('../utility/responModel')
const { PrismaClient } = require('@prisma/client')

const prisma = new PrismaClient()

const getByAllPengabdian = async (req, res, next) => {
    try{

        const getAllPengabdian = await prisma.Pengabdian.findMany({
            include:{
                partisipasiPengabdian: true
            }
        })

        return res.status(200).json(responseModel.success(200, getAllPengabdian))

    }catch(error){
        console.log(error)
        return res.status(500).json(responseModel.error(500, `Internal Server Error`))
    }
}

const getByIdPengabdian = async (req, res, next) => {
    try{

        const idPengabdian = req.params.id

        const getByIdPengabdian = await prisma.Pengabdian.findUnique({
            where: {
                id: Number(idPengabdian)
            },
            include: {
                partisipasiPengabdian: {
                    include: {
                        user: true,
                    }
                }
            }
        })

        return res.status(200).json(responseModel.success(200, getByIdPengabdian))

    }catch(error){
        console.log(error)
        return res.status(500).json(responseModel.error(500, `Internal Server Error`))
    }
}

const createPengabdiann = async (req, res, next) => {
    try{ 

        const {judul, tema, abstraksi, jenisPublikasi, hki, ttg, KesiapanTek, namaBerkas, DataAnggotaDosen} = req.body
        const user = req.user[0]

        DataAnggotaDosen.map((Tes) => {
            return Tes.judulPengabdian = judul
        })

        // return console.log(new Date())
        
        const dataPengabdian = {
            judul: judul,
            tema: tema,
            abstraksi: abstraksi,
            pubInter: "TES",
            pubNasion: "TES",
            keterangan: "TES",
            waktu: new Date(),
            // kesiapanTek: KesiapanTek,
            namaBerkas: "TES"
        }

        
        jenisPublikasi === "Publikasi Nasional" ? dataPengabdian.pubNasion = jenisPublikasi : dataPengabdian.pubInter = jenisPublikasi
        
        const pengabdian = await prisma.Pengabdian.create({
            data: dataPengabdian
        })
        
        await prisma.PartisipasiPengabdian.create({
            data: {
                nameUser: user.name,
                judulPengabdian: judul,
                jabatan: "Ketua Pengusul"
            }
        })

        await prisma.PartisipasiPengabdian.createMany({
            data: DataAnggotaDosen
        })


        return res.status(201).json(responseModel.success(201, pengabdian))

    }catch(error){
        console.log(error)
        return res.status(500).json(responseModel.error(500, `Internal Server Error`))
    }
}

const updatePengabdian = async (req, res, next) => {
    try{

        const {id} = req.params
        const {judul, tema, abstraksi, jenisPublikasi, hki, ttg, KesiapanTek, namaBerkas, DataAnggotaDosen} = req.body
        const user = req.user[0]
        
        const dataPengabdian = {
            judul: judul,
            tema: tema,
            abstraksi: abstraksi,
            pubInter: "TES",
            pubNasion: "TES",
            keterangan: "TES",
            waktu: new Date(),
            // kesiapanTek: KesiapanTek,
            namaBerkas: "TES"
        }

        jenisPublikasi === "Publikasi Nasional" ? dataPengabdian.pubNasion = jenisPublikasi : dataPengabdian.pubInter = jenisPublikasi
        
        const pengabdian = await prisma.Pengabdian.update({
            where: {
                id: Number(id)
            },
            data: dataPengabdian
        })

        return res.status(201).json(responseModel.success(201, pengabdian))

    }catch(error){
        console.log(error)
        return res.status(500).json(responseModel.error(500, `Internal Server Error`))
    }
}

const deletePengabdian = async (req, res, next) => {
    try{

        const {id} = req.params

        const getpengabdiandelete = await prisma.Pengabdian.findUnique({
            where: {
                id: Number(id)
            },
            include : {
                partisipasiPengabdian: true
            }
        })

        const name = getpengabdiandelete.partisipasiPengabdian[0].judulPengabdian


        const AnggotaPengabdianDosen = await prisma.PartisipasiPengabdian.deleteMany({
            where: {
                judulPengabdian: {
                    contains: name
                } 
            },
        })

        const deletePengabdian = await prisma.Pengabdian.delete({
            where: {
                id: Number(id)
            }
        })

        return res.status(200).json(responseModel.success(200, deletePengabdian))

    }catch(error){
        console.log(error)
        return res.status(500).json(responseModel.error(500, `Internal Server Error`))
    }
}


module.exports = {
    getByAllPengabdian,
    getByIdPengabdian,
    createPengabdiann,
    updatePengabdian,
    deletePengabdian
}