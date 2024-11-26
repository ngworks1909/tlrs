"use client"
import React from 'react'
import { Button } from '../ui/button'
import { PlusCircle } from 'lucide-react'
import { useRouter } from 'next/navigation'

export default function NewOrderButton({optionId, optionName, serviceId, serviceName, price}: Readonly<{optionId: string, optionName: string, serviceId: string, serviceName: string, price: number}>) {
  const router = useRouter()
  return (

    <Button onClick={(e) => {e.preventDefault(); localStorage.setItem('orderDetails', JSON.stringify({optionId, optionName, serviceId, serviceName, price})); router.push('/create-order')}} className="w-full" variant="default">
          <PlusCircle className="mr-2 h-4 w-4" />
          New Order
    </Button>

  )
}
