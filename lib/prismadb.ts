import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

declare global {
    var prisma: PrismaClient | undefined;
}

//prevents Next 13 hot-reloading from causing problems initalizing Prisma client 
const prismadb = globalThis.prisma || prisma;
if(process.env.NODE_ENV !== 'production') globalThis.prisma = prismadb;

export default prismadb;