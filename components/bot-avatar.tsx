import React from 'react'
import { Avatar, AvatarImage } from '@/components/ui/avatar'

interface BotAvatarProps {
  src: string;
}


const BotAvatar: React.FC<BotAvatarProps> = ({ src }) => {
 
  return (
    <Avatar className='h-12 w-12'>
      <AvatarImage src={src} className='object-cover' />
    </Avatar>
  )
}

export default BotAvatar
