"use client";
import React from 'react'
import { usePathname, useRouter } from 'next/navigation';
import { Home, Plus, Settings } from 'lucide-react';
import { cn } from '@/lib/utils';

const Sidebar = () => {

    const pathname = usePathname();
    const router = useRouter();
    const onNavigate = (url: string, protectedRoute: boolean) => {
        
        return router.push(url);
    }

    const routes = [
        {
            icon: Home,
            href: '/',
            label: 'Home',
            protectedRoute: false,
        },
        {
            icon: Plus,
            href: '/companion/new',
            label: 'Create',
            protectedRoute: true,
        },
        // {
        //     icon: Settings,
        //     href: '/settings',
        //     label: 'Settings',
        //     protectedRoute: false,
        // }
    ]



  return (
    <div className='space-y-4 flex flex-col h-full text-primary bg-secondary'>
      <div className='p-3 flex flex-1 justify-center'>
        <div className='space-y-2'>
            {routes.map((route) => (
                <div
                    onClick={() => onNavigate(route.href, route.protectedRoute)}
                    key={route.href}
                    className={cn('text-muted-foreground text-xs group flex p-3 w-full justify-start font-medium cursor-pointer hover:text-primary hover:bg-primary/10 rounded-lg transition', pathname === route.href && 'bg-primary/10 text-primary')}
                >
                    <div className='flex flex-col gap-y-2 items-center flex-1'>
                        <route.icon className='h-5 w-5' />
                        {route.label}
                    </div>
                </div>
            ))}
        </div>
      </div>
    </div>
  )
}

export default Sidebar
