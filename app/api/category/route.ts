import { NextResponse } from 'next/server';
import { currentUser } from '@clerk/nextjs'
import prismadb from '@/lib/prismadb';


export async function POST(req: Request) {
    try {
        const body = await req.json();
        const user = await currentUser();

        if(!user || !user.id || !user.firstName) {
            return new NextResponse('Unauthorized', { status: 401 });
        }

        const category = await prismadb.category.create({
            data: body,
        })

        return NextResponse.json(category);

    } catch (error) {
        console.log('[CATEGORY_POST]', error);
        return new NextResponse("Internal Error", { status: 500 })
    }
}
