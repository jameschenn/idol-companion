import React from 'react'
import SearchInput from '@/components/SearchInput';
import Categories from '@/components/Categories';
import Companions from '@/components/Companions';
import prismadb from '@/lib/prismadb';

interface RootPageProps {
  //searchParams comes from next.js server component
  searchParams: {
    categoryId: string,
    name: string,
  }
}

const RootPage:React.FC<RootPageProps> = async ({ searchParams}) => {

  const data = await prismadb.companion.findMany({
    where: {
      categoryId: searchParams.categoryId,
    },
    orderBy: {
      createdAt: 'desc',
    },
    include: {
      _count: {
        select: {
          messages: true
        }
      }
    }
  })

  //TODO: NEED TO FIGURE OUT FULL-TEXT SEARCH. TRY USING RAW SQL?
  // const result = await prismadb.$queryRaw`SELECT * FROM "Companion" WHERE to_tsvector('english', "Blog"."content") @@ to_tsquery('english', ${term});`

  const categories = await prismadb.category.findMany();

  return (
    <div className='h-full p-4 space-y-2'>
      <SearchInput />
      <Categories data={categories} />
      <Companions data={data} />
    </div>
  )
}

export default RootPage
