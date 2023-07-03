const { PrismaClient } = require('@prisma/client')
const prisma = new PrismaClient()


const desaOrKelurahan = require('./data/DesaOrKelurahan.json')
const kecamatan = require('./data/Kecamatan.json')
const kabupatenOrKota = require('./data/KabupatenOrKota.json')
const provinsi = require('./data/Provinsi.json')
const role = require('./data/Role.json')
const prodi = require('./data/Prodi.json')
const jurusan = require('./data/Jurusan.json')
const user = require('./data/User.json')
const jnsKelamin = require('./data/JenisKelamin')




async function main() {

    // Role
    await Promise.all(
        role.map(async (dataRole) => {
            await prisma.role.create({
                data: dataRole
            })
        })
    )

    // Jenis Kelamin
    await Promise.all(
        jnsKelamin.map(async (datajnsKelamin) => {
            await prisma.JenisKelamin.create({
                data: datajnsKelamin
            })
        })
        // jnsKelamin.map(async (datajnsKelamin) => {
        //     await prisma.JenisKelamin.create({
        //         data: datajnsKelamin
        //     })
        // })
    )

    // Jurusan
    await Promise.all(
        jurusan.map(async (dataJurusan) => {
            await prisma.Jurusan.create({
                data: dataJurusan
            })
        })
    )

     // Prodi
     await Promise.all(
        prodi.map(async (dataProdi) =>
            await prisma.prodi.create({
                data:dataProdi 
            })
        )
    )
    
    // Provinsi
    await Promise.all(
        provinsi.map(async (dataProvinsi) => {
           await prisma.provinsi.create({
               data: dataProvinsi
           })
       })
    )


    // User
    await Promise.all(
        user.map(async(dataUser) => {
            // console.log(dataUser)
            await prisma.user.create({
                data: dataUser
            })
        })
    )
    
    // // Kecamatan Atau Kabupaten
    await Promise.all(
        kabupatenOrKota.map(async (dataKabupatenOrKota) => {
            await prisma.kotaOrKabupaten.create({
                data: dataKabupatenOrKota
            })
        })
    ) 

    // // Kecamatan
    await Promise.all(
        kecamatan.map(async (dataKecamatan) => {
            await prisma.kecamatan.create({
                data: dataKecamatan
            })
        })
    )

    // // Desa Atau Kelurahan
    // await Promise.all(
    //     desaOrKelurahan.map(async (dataDesaOrKelurahan) => {
    //         await prisma.desaOrKelurahan.create({
    //             data: dataDesaOrKelurahan
    //         })
    //     })
    // )

    
   


    
}

main()
    .catch((e) => {
        console.error(`Error : ${e}`);
        process.exit(1)
    })
    .finally(async () => {
        console.log(`Berhasil Sedding Database`);
        prisma.$disconnect();
    })