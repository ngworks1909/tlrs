import { UserType } from '@/hooks/useUsers'
import React from 'react'
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Mail, Phone, ShoppingBag } from "lucide-react"

export default function UserCard({user}: {user: UserType}) {
  return (
    <Card key={user.userId} className="overflow-hidden transition-all duration-300 hover:shadow-lg">
      <CardHeader className="pb-2">
        <div className="flex items-center space-x-4">
          <Avatar className="h-16 w-16 border-4 border-purple-200">
            <AvatarImage src={user.image} alt={user.username} />
            <AvatarFallback>{user.username[0].toUpperCase()}</AvatarFallback>
          </Avatar>
          <div>
            <CardTitle className="text-xl font-semibold text-purple-700">{user.username}</CardTitle>
            <div className="flex items-center mt-1 text-sm text-gray-600">
              <ShoppingBag className="mr-1 h-4 w-4" />
              <span>{user._count.orders} orders</span>
            </div>
          </div>
        </div>
      </CardHeader>
      <CardContent className="pt-2">
        <div className="space-y-1">
          <div className="flex items-center text-sm bg-gray-50 rounded-md py-1 px-2">
            <Mail className="mr-2 h-4 w-4 text-purple-500" />
            <span className="font-medium">{user.email}</span>
          </div>
          <div className="flex items-center text-sm bg-gray-50 rounded-md py-1 px-2">
            <Phone className="mr-2 h-4 w-4 text-purple-500" />
            <span className="font-medium">{user.mobile}</span>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
