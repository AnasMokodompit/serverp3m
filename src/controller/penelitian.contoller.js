const responseModel = require('../utility/responModel')
const { PrismaClient } = require('@prisma/client')
const cloudinary = require('../utility/cloudinary')
const uploadCloudinary = async (path, opts) => await cloudinary.CloudinaryUpload(path,opts)


const prisma = new PrismaClient()


const getByAllPenelitianForCatatanHarian = async (req, res) => {
    try{
        const {name, roleId} = req.user[0]
        const {statusPenelitian} = req.query
        const judulPenelitian = []

        const options = {
            where: {},
        }

        if (roleId === 1) {
            const getAllPenelitianByDibiayai = await prisma.penelitian.findMany({
                where: {
                    statusPenelitian: Number(statusPenelitian)
                }
            })

            console.log(getAllPenelitianByDibiayai)

            return res.status(200).json(responseModel.success(200, getAllPenelitianByDibiayai))

        }


        if (statusPenelitian == 3) {
            options.where.statusPenelitian = Number(statusPenelitian)
        }

        const getAllPenelitianByDibiayai = await prisma.penelitian.findMany(options)

        getAllPenelitianByDibiayai.map(data => {
            judulPenelitian.push(data.judul)
        })

        const getPartisipasiPeneltianByUsulanDibiayai = await prisma.partisipasiPenelitian.findMany({
            where: {    
                nameUser: {
                    contains: name
                },
                judulPenelitian: {in: judulPenelitian}
            },
            // include: {
            //     user: true,
            //     penelitian: true
            // }
        })

        return res.status(200).json(responseModel.success(200, getPartisipasiPeneltianByUsulanDibiayai))

    }catch(error){
        console.log(error)
        return res.status(500).json(responseModel.error(500, `Internal Server Error`))
    }
}


const getByAllPenelitianForLaporan = async (req, res) => {
    try{

        const {name, roleId} = req.user[0]
        const {statusPenelitian} = req.query
        const judulPenelitian = []

        const options = {
            where: {},
            // include:{
                // user: true,
                // partisipasiPenelitian: true
            // }
        }

        if (roleId === 1) {
            const getAllPenelitianByDibiayai = await prisma.penelitian.findMany({
                where: {
                    statusPenelitian: Number(statusPenelitian)
                }
            })

            console.log(getAllPenelitianByDibiayai)

            return res.status(200).json(responseModel.success(200, getAllPenelitianByDibiayai))

        }


        if (statusPenelitian == 3) {
            options.where.statusPenelitian = Number(statusPenelitian)
        }

        const getAllPenelitianByDibiayai = await prisma.penelitian.findMany(options)

        getAllPenelitianByDibiayai.map(data => {
            judulPenelitian.push(data.judul)
        })

        const getPartisipasiPeneltianByUsulanDibiayai = await prisma.partisipasiPenelitian.findMany({
            where: {    
                nameUser: {
                    contains: name
                },
                jabatan: "Ketua Pengusul",
                judulPenelitian: {in: judulPenelitian}
            },
            // include: {
            //     user: true,
            //     penelitian: true
            // }
        })

        return res.status(200).json(responseModel.success(200, getPartisipasiPeneltianByUsulanDibiayai))

    }catch(error){
        console.log(error)
        return res.status(500).json(responseModel.error(500, `Internal Server Error`))
    }
}

const getStatisticByUser = async (req,res) => {
    try{

        const {name} = req.user[0]

        const year = ["2022", "2023", "2024", "2025"]

        const getAllPenelitianByTahun = await prisma.PartisipasiPenelitian.findMany({
            where: {
                nameUser: {
                    contains: name
                }
            },
        })

        let jumlah = [0,0,0,0]
        
        getAllPenelitianByTahun.filter((data) => {
            year.filter((key, i) => {
                if (key === String(data.createdAt.getFullYear())) {
                    return jumlah[i] += 1
                } 
            })
        })

        console.log(jumlah)

        return res.status(200).json(responseModel.success(200, jumlah))

    }catch(error){
        console.log(error)
        return res.status(500).json(responseModel.error(500, `Internal Server Error`))
    }
}

const getAllDiajukanPenelitian = async (req, res) => {
    try{

        const getAllPenelitian = await prisma.penelitian.findMany({
            where: {
                statusPenelitian: 1
            },
            include:{
                reviewPenelitian: {
                    include: {
                        user: true
                    }
                },
                partisipasiPenelitian: {
                    include: {
                        user: true
                    }
                },
                dokumenPenelitian: true
            }
        })

        return res.status(200).json(responseModel.success(200, getAllPenelitian))


    }catch(error){
        console.log(error)
        return res.status(500).json(responseModel.error(500, `Internal Server Error`))
    }
}

const getAllPengusulPenelitian = async (req, res) => {
    try{

        const {name} = req.user[0]

        const options = {
            where: {
                nameUser: {
                    contains: name
                },
                jabatan: "Ketua Pengusul"
            },
            include:{
                user: true,
                penelitian: {
                    include: {
                        reviewPenelitian: true,
                        partisipasiPenelitian: true,
                        dokumenPenelitian: true,
                        nilaiPenelitian: true
                    }
                }
            }
        }

        if (req.query?.statusRevisi === 'true') {
            options.where.statusRevisi = true
        }


        const getAllPenelitian = await prisma.partisipasiPenelitian.findMany(options)

        return res.status(200).json(responseModel.success(200, getAllPenelitian))

    }catch(error){
        console.log(error)
        return res.status(500).json(responseModel.error(500, `Internal Server Error`))
    }
}

const getAllKeangotaanPenelitian = async (req, res) => {
    try{
        const {name} = req.user[0]
        const judulPenelitian = []

        const getAllPenelitian = await prisma.PartisipasiPenelitian.findMany({
            where: {
                NOT: {
                    jabatan: "Ketua Pengusul"
                },
                nameUser: {
                    contains: name
                }
            },
            include:{
                user: true,
                penelitian: true
            }
        })

        getAllPenelitian.map((data) => {
            judulPenelitian.push(data.judulPenelitian)
        })



        const getKetuaPenelitian = await prisma.partisipasiPenelitian.findMany({
            where: {
                judulPenelitian: {
                    in: judulPenelitian,  
                },
                jabatan : "Ketua Pengusul"
            },
            include: {
                user: true,
                penelitian: true
            }
        })
        
        const pushKetuaPenelitianInPenelitian = []

        getAllPenelitian.map((data, index) => {
            getAllPenelitian[index].DataKetuaPenelitian = getKetuaPenelitian[index]
        })
        

        return res.status(200).json(responseModel.success(200, getAllPenelitian))

    }catch(error){
        console.log(error)
        return res.status(500).json(responseModel.error(500, `Internal Server Error`))
    }
}


const UpdateStatusPartisiPasiPenelitian = async (req, res) => {
    try{
        const {id} = req.params
        const {statusPartisipasi, judul} = req.body

        
        if (statusPartisipasi === 2) {
            const getDeleteStatusPartisiPenelitianUser = await prisma.partisipasiPenelitian.delete({
                where: {
                    id: Number(id)
                }
            })

            return res.status(200).json(responseModel.success(200, getDeleteStatusPartisiPenelitianUser))
        }


        const getAllPenelitian = await prisma.PartisipasiPenelitian.findMany({
            where: {
                judulPenelitian:  judul,
                statusPartisipasi: 0
            },
        })


        const getEditStatusPartisipasiPenelitianUser =await prisma.partisipasiPenelitian.update({
            where: {
                id: Number(id)
            },
            data: {
                statusPartisipasi: Number(statusPartisipasi)
            }
        })

        return res.status(200).json(responseModel.success(200, getEditStatusPartisipasiPenelitianUser))


    }catch(error){
        console.log(error)
        return res.status(500).json(responseModel.error(500, `Internal Server Error`))
    }
}


const getByAllPenelitian = async (req, res, next) => {
    try{
        const {name} = req.user[0]

        if (req.user[0].roleId === 1) {
            const getAllPenelitian = await prisma.penelitian.findMany({
                // where: {
                //     nameUser: {
                //         contains: name
                //     }
                // },
                include:{
                    partisipasiPenelitian: {
                        include: {
                            user: true
                        }
                    },
                    reviewPenelitian: true,
                    nilaiPenelitian: true
                }
            })
    
            return res.status(200).json(responseModel.success(200, getAllPenelitian))
            
        }


        const getAllPenelitian = await prisma.PartisipasiPenelitian.findMany({
            where: {
                nameUser: {
                    contains: name
                }
            },
            include:{
                user: true,
                penelitian: {
                    include: {
                        reviewPenelitian: true,
                        nilaiPenelitian: true
                    }
                }
            }
        })

        return res.status(200).json(responseModel.success(200, getAllPenelitian))


    }catch(error){
        console.log(error)
        return res.status(500).json(responseModel.error(500, `Internal Server Error`))
    }
}

const getByIdPenelitian = async (req, res, next) => {
    try{

        const idPenelitian = req.params.id

        const getByIdPenelitian = await prisma.Penelitian.findUnique({
            where: {
                id: Number(idPenelitian)
            },
            include: {
                partisipasiPenelitian: {
                    include: {
                        user: true,
                    }
                },
                dokumenPenelitian: true
            }
        })

        return res.status(200).json(responseModel.success(200, getByIdPenelitian))

    }catch(error){
        console.log(error)
        return res.status(500).json(responseModel.error(500, `Internal Server Error`))
    }
}

const createPenelitian = async (req, res, next) => {
    try{
        const {judul, tema, abstraksi, jenisTKT, jenisTargetTKT, biayaLuaran, bidangFokus, lamaKegiatan, DataAnggotaDosen, DataAnggotaMahasiswa} = req.body
        const user = req.user[0]
        const nemeMhasiswa = []

        DataAnggotaDosen.map((data, i) => {
            data.statusAkun = Number(data.statusAkun)
            data.statusPartisipasi = Number(data.statusPartisipasi)
        })


        DataAnggotaMahasiswa.map(async (data) => {
            if (data.nameUser) {
                nemeMhasiswa.push(data.nameUser)
            }
        })

        
        // Cek User Jika Mahasiswa Jika Sudah Terdaftar
        const cekUserMahasiswa = await prisma.user.findMany({
            where: {
                name: {
                    in : nemeMhasiswa
                } 
            }
        })

        const valuesIsYes = []

        cekUserMahasiswa.map((name) => {
            valuesIsYes.push(name.name)
        })
        
        const dataNot = []

        let newDataNotDaftar = DataAnggotaMahasiswa.filter((data) => {
            const redy = valuesIsYes.includes(data.nameUser)
            if (redy === false) {
                return dataNot.push(data)
            }
        })

        
        if (newDataNotDaftar.length > 0) {
            
            const updateNewDataNotDaftar = newDataNotDaftar.map((data) => ({nim: data.nim, name: data.nameUser, username: `${data.nameUser}_test`, roleId: 4, password: "mahasiswatest"}))
            
            
            await prisma.User.createMany({
                data: updateNewDataNotDaftar
            })
        }
            
        DataAnggotaDosen.map((Tes) => {
            return Tes.judulPenelitian = judul
        })
        
        DataAnggotaMahasiswa.map((Tes) => {
            return Tes.judulPenelitian = judul
        })
        
        DataAnggotaDosen.map((tes) => {
            delete tes.nidn
        })
                
        const dataPenelitian = {
            judul: judul,
            tema: tema,
            abstraksi: abstraksi,
            jenisTKT: jenisTKT, 
            jenisTargetTKT: jenisTargetTKT,
            biayaLuaran: biayaLuaran,
            bidangFokus: bidangFokus,
            lamaKegiatan: lamaKegiatan,
            statusPenelitian: 0,
            statusRevisi: false
        }
        
        
        const penelitian = await prisma.Penelitian.create({
            data: dataPenelitian
        })

        
        if (req.file !== undefined) {

            const optionsCloudinary =  {
                folder: "P3MPolimdo/PDF/usulanPenelitian"
            }

            const UploadPDF = await uploadCloudinary(req.file.path, optionsCloudinary)

            const {public_id,secure_url} = UploadPDF

            const options = {
                name: "Usulan Proposal",
                nameUser: user.name,
                idPenelitian: penelitian.id,
                urlPdf: secure_url,
                pdf_id: public_id,
                namePdf: req.file.originalname

            }

            await prisma.dokumenPenelitian.create({
                data: options
            })

        }

        await prisma.PartisipasiPenelitian.createMany({
            data: DataAnggotaDosen
        })

        
        const newDataPartisipasiMahasiswa = DataAnggotaMahasiswa.map((data) => ({
            nameUser: data.nameUser,
            judulPenelitian: data.judulPenelitian,
            jabatan: "Mahasiswa",
            tugasdlmPenlitian: data.tugasdlmPenlitian,
            statusAkun: 0,
            statusPartisipasi: 1
        }))


        await prisma.PartisipasiPenelitian.createMany({
            data: newDataPartisipasiMahasiswa
        })

        return res.status(201).json(responseModel.success(201, penelitian))
        
        
    }catch(error){
        console.log(error)
        return res.status(500).json(responseModel.error(500, `Internal Server Error`))
    }
}

const updatePenelitian = async (req, res, next) => {
    try{


        const {id} = req.params
        const {judul, tema, abstraksi, jenisTKT, jenisTargetTKT, biayaLuaran, bidangFokus, lamaKegiatan, statusPenelitian, DataAnggotaDosen, statusDibiayai} = req.body
        const user = req.user[0]

        if (statusDibiayai == true) {
            const idDobiayai = []
            const judulUpdate = []
            
            const cekRevisi = await prisma.reviewPenelitian.findMany({
                where: {
                    revisi: null
                }
            })
            
            cekRevisi.map((data, i) => {
                idDobiayai.push(data.id)
            })

            
            const cekStatusPenelitianDIbiayai = await prisma.nilaiPenelitian.groupBy({
                where: {
                    idReviewPenelitian: {in: idDobiayai}
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
                having: {
                    nilai: {
                      _avg: {
                        gt: 75,
                      },
                    },
                  },
            })

            cekStatusPenelitianDIbiayai.map((data) => {
                judulUpdate.push(data.judulPenelitian)
            })

            
            const updateStatusPenelitianDibiayai = await prisma.penelitian.updateMany({
                where: {
                    judul: {in: judulUpdate}
                },
                data: {
                    statusPenelitian: 3
                }
            })


            const updateStatusPenelitianGagalDibiayai = await prisma.penelitian.updateMany({
                where: {
                    judul: {notIn: judulUpdate}
                },
                data: {
                    statusPenelitian: 2
                }
            })

            console.log(updateStatusPenelitianDibiayai, updateStatusPenelitianGagalDibiayai)
            return res.status(201).json(responseModel.success(201, cekStatusPenelitianDIbiayai))

        }else{
            const getStatusPenelitianDiajuakn = await prisma.penelitian.findUnique({
                where: {
                    id: Number(id)
                }
            })

            // Validasi Edit Status Penelitian DI ajikan >>>
            if (user.roleId === 3) {        
                if (getStatusPenelitianDiajuakn.statusPenelitian !== 0 && getStatusPenelitianDiajuakn.statusRevisi === false) {
                    return res.status(404).json(responseModel.error(404, "Penelitian Telah Diajukan Dan Sedang Tidak Direvisi"))
                }
            }
            
    
            if (statusPenelitian === 1) {
    
                const cekPartisiPenelitianBelumSetuju = await prisma.partisipasiPenelitian.findMany({
                    where: {
                        judulPenelitian: getStatusPenelitianDiajuakn.judul,
                        statusPartisipasi: 0,
                        statusAkun: 1
                    }
                })
    
                if (cekPartisiPenelitianBelumSetuju.length > 0) {
    
                    let nama = ""
                    let jabatan = ""
    
                    cekPartisiPenelitianBelumSetuju.map((data) => {
                        nama = data.nameUser
                        jabatan = data.jabatan 
                    })
    
    
                    return res.status(404).json(responseModel.error(404, `${nama} ${jabatan} Belum Menyetujui`))
                }
    
                const penelitianUpdateStatus = await prisma.Penelitian.update({
                    where: {
                        id: Number(id)
                    },
                    data: {
                        statusPenelitian: statusPenelitian
                    }
                })
    
    
                return res.status(201).json(responseModel.success(201, penelitianUpdateStatus))
                
            }
    
            if (statusDibiayai == true) {
    
                const cekRevisi = await prisma.reviewPenelitian.findMany({
                    where: {
                        revisi: null,
                    }
                })

            }
            
            const dataPenelitian = {
                judul: judul,
                tema: tema,
                abstraksi: abstraksi,
                jenisTKT: jenisTKT, 
                jenisTargetTKT: jenisTargetTKT,
                biayaLuaran: biayaLuaran,
                bidangFokus: bidangFokus,
                lamaKegiatan: lamaKegiatan,
            }
    
    
            if (req.file !== undefined) {
    
                const optionsCloudinary =  {
                    folder: "P3MPolimdo/PDF/usulanPenelitian"
                }
    
                const UploadPDF = await uploadCloudinary(req.file.path, optionsCloudinary)
    
                const {public_id,secure_url} = UploadPDF
    
                const options = {
                    name: "Usulan Proposal",
                    nameUser: user.name,
                    idPenelitian: Number(id),
                    urlPdf: secure_url,
                    pdf_id: public_id,
                    namePdf: req.file.originalname
                }
    
                const cekDataDokumenPenelitian = await prisma.dokumenPenelitian.findMany({
                    where: {
                        name: options.name,
                        nameUser: user.name,
                        idPenelitian: Number(id),
                    }
                })
    
                if (cekDataDokumenPenelitian.length !== 0) {
                    await prisma.dokumenPenelitian.update({
                        where: {
                            id: cekDataDokumenPenelitian[0]?.id
                        },
                        data: options
                    })
                }else{
                    await prisma.dokumenPenelitian.create({
                        data: options
                    })
                }
    
    
            }
            
            console.log(getStatusPenelitianDiajuakn)
            
            const penelitian = await prisma.Penelitian.update({
                where: {
                    id: Number(id)
                },
                data: dataPenelitian
            })

    
            return res.status(201).json(responseModel.success(201, penelitian))
        }

    }catch(error){
        console.log(error)
        return res.status(500).json(responseModel.error(500, `Internal Server Error`))
    }
}

const deletePenelitian = async (req, res, next) => {
    try{

        const {id} = req.params
        const user = req.user[0]


        const getpenelitianindelete = await prisma.Penelitian.findUnique({
            where: {
                id: Number(id)
            },
            include : {
                partisipasiPenelitian: true,
                dokumenPenelitian: true,
                reviewPenelitian: true
            }
        })

        if (getpenelitianindelete.statusPenelitian === 1 && user.roleId !== 1) {
            return res.status(404).json(responseModel.error(404, "Penelitian Telah Diajukan"))
        }
        
        const name = getpenelitianindelete.judul
        
        if (getpenelitianindelete?.dokumenPenelitian?.length !== 0) {
    
    
            await prisma.dokumenPenelitian.delete({
                where: {
                    id: getpenelitianindelete.dokumenPenelitian[0].id
                }
            })
        }
        
        if (getpenelitianindelete?.partisipasiPenelitian.length !== 0 ) {     
            await prisma.PartisipasiPenelitian.deleteMany({
                where: {
                    judulPenelitian: name
                },
            })
        }
        
        if (getpenelitianindelete?.reviewPenelitian.length !== 0) {
            
            await prisma.reviewPenelitian.deleteMany({
                where: {
                    judulPenelitian: name
                },
            })
        }



        const deletePenelitian = await prisma.Penelitian.delete({
            where: {
                id: Number(id)
            }
        })

        return res.status(200).json(responseModel.success(200, deletePenelitian))

    }catch(error){
        console.log(error)
        return res.status(500).json(responseModel.error(500, `Internal Server Error`))
    }
}


module.exports = {
    getByAllPenelitianForCatatanHarian,
    getByAllPenelitianForLaporan,
    getStatisticByUser,
    getAllDiajukanPenelitian,
    getAllPengusulPenelitian,
    getAllKeangotaanPenelitian,
    UpdateStatusPartisiPasiPenelitian,
    getByAllPenelitian,
    getByIdPenelitian,
    createPenelitian,
    updatePenelitian,
    deletePenelitian
}