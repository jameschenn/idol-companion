"use client"
import React from 'react'
import { useUser } from '@clerk/nextjs'
import { Avatar, AvatarImage } from '@/components/ui/avatar'


const UserAvatar = () => {
 
  const { user } = useUser();

  return (
    <Avatar className='h-12 w-12'>
      <AvatarImage src={user?.imageUrl} className='object-cover' />
    </Avatar>
  )
}

export default UserAvatar