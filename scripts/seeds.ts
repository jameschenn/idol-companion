const { PrismaClient } = require('@Prisma/client'); //require for node file, not a react file

const db = new PrismaClient();

async function main() {
    try {
        await db.category.createMany({
            data: [
                { name: 'Kpop Idols' },
                { name: 'Actors' },
                { name: 'Anime & Games' },
                { name: 'Animals' },
            ]
        })

        // await db.companion.deleteMany();
    } catch(error) {
        console.error('Error seeding default categories' ,error)
    } finally {
        await db.$disconnect();
    }
}

main();