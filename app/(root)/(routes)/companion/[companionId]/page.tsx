import React from 'react'
import prismadb from '@/lib/prismadb';
import CreateCompanionForm from './components/page';

interface CompanionIdPageProps {
    params: {
        companionId: string;
    }
}

const CompanionIdPage:React.FC<CompanionIdPageProps> = async ({ params }) => {

    const companion = await prismadb.companion.findUnique({
        where: {
            id: params.companionId,
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
