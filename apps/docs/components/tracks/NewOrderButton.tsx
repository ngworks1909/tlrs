"use client"
import React from 'react'
import { Button } from '../ui/button'
import { PlusCircle } from 'lucide-react'
import { useRouter } from 'next/navigation'

export default function NewOrderButton({optionId}: Readonly<{optionId: string, serviceId: string}>) {
  const router = useRouter()
  return (

    <Button onClick={(e) => {e.preventDefault(); router.push(`/create-order/${optionId}`)}} className="w-full" variant="default">
          <PlusCircle className="mr-2 h-4 w-4" />
          New Order
    </Button>

  )
}


