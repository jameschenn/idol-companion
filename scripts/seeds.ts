const { PrismaClient } = require('@Prisma/client'); //require for node file, not a react file

const db = new PrismaClient();

async function main() {
    try {
        await db.category.createMany({
            data: [
                {name: "TWICE"},
                {name: "LE SSERAFIM"},
            ]
        })
    } catch(error) {
        console.error('Error seeding default categories' ,error)
    } finally {
        await db.$disconnect();
    }
}

main();