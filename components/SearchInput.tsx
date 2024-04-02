"use client";
import React, { ChangeEventHandler, useState, useEffect } from 'react'
import { Search } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { useRouter, useSearchParams } from 'next/navigation';
import { useDebounce } from '@/hooks/useDebounce';
import qs from 'query-string';

const SearchInput = () => {

    const router = useRouter();
    const searchParams = useSearchParams();

    const categoryId = searchParams.get('categoryId');
    const name = searchParams.get('name');

    const [value, setValue] = useState(name || '');

    /* Created a custom hook, because we don't want to query the database after each keystroke. 
    Only after waiting a second after user finishes typing do we query the database*/
    const debouncedValue = useDebounce(value, 500);

    // const onChange: ChangeEventHandler<HTMLInputElement> = (e) => {
    //     setValue(e.target.value);
    // }

    useEffect(() => {

        const query = {
            name: debouncedValue,
            categoryId: categoryId,
        };

        const url = qs.stringifyUrl({
            url: window.location.href,
            query,
        }, {skipEmptyString: true, skipNull: true}); //removes from URL if query is "" or null

        router.push(url);

    }, [debouncedValue, router, categoryId]);

  return (
    <div className='relative'>
        <Search className='absolute h-4 w-4 top-3 left-4 text-muted-foreground' />
        <Input
            onChange={(e) => setValue(e.target.value)}
            value={value}
            placeholder='Search...'
            className='pl-10 bg-primary/10'
        />
    </div>
  )
}

export default SearchInput

