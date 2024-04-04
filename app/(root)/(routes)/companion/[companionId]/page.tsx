import React from 'react'
import prismadb from '@/lib/prismadb';
import CreateCompanionForm from './components/page';
import { auth, redirectToSignIn } from '@clerk/nextjs';

interface CompanionIdPageProps {
    params: {
        companionId: string;
    }
}

const CompanionIdPage:React.FC<CompanionIdPageProps> = async ({ params }) => {

    const { userId } = auth();

    if(!userId) return redirectToSignIn();

    const companion = await prismadb.companion.findUnique({
        where: {
            id: params.companionId,
            userId
        }
    });

    const categories = await prismadb.category.findMany();

    return (
    <div>
      <CreateCompanionForm initialData={companion} categories={categories} />
    </div>
  )
}

export default CompanionIdPage
