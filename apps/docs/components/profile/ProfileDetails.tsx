import React from 'react'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'

export default function ProfileDetails({user}: Readonly<{user: {
    name: string;
    email: string;
    mobile: string;
    avatar: string;
}}>) {
  return (
      <div className="sticky top-16 z-40 flex items-center gap-4 bg-background py-6">
      <Avatar className="w-24 h-24">
        <AvatarImage src={user.avatar} alt={user.name} />
        <AvatarFallback>NK</AvatarFallback>
      </Avatar>
      <div className='flex flex-col overflow-hidden'>
        <h1 className="text-2xl font-bold truncate max-w-[200px] sm:max-w-[300px] md:max-w-full">{user.name}</h1>
        <p className="text-muted-foreground truncate max-w-[200px] sm:max-w-[300px] md:max-w-full">{user.email}</p>
        <p className="text-muted-foreground">{user.mobile}</p>
      </div>
    </div>

    
  )
}
