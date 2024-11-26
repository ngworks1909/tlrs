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
      <div>
        <h1 className="text-2xl font-bold">{user.name}</h1>
        <p className="text-muted-foreground">{user.email}</p>
        <p className="text-muted-foreground">{user.mobile}</p>
      </div>
    </div>

    
  )
}
