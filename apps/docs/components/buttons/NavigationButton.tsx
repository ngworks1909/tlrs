"use client"

import React from 'react'
import { Button } from '../ui/button'
import { useRouter } from 'next/navigation'

export default function NavigationButton({route, message}: {route: string, message: string}) {
  const router = useRouter()
  return (
    <Button onClick={() => router.push(route)} size="lg" className="bg-blue-600 hover:bg-blue-700 text-white">
        {message}
    </Button>
  )
}
