"use client"

import React from 'react'
import { Button } from '../ui/button'
import { useRouter } from 'next/navigation'
import { LogIn } from 'lucide-react'

export default function NavButtons() {
  const router = useRouter()
  return (
    <>
    <Button variant="ghost" onClick={() => router.push('/login')} className="hidden lvsm:inline-flex">
        <LogIn className="mr-2 h-4 w-4" />
                  Log In
    </Button>
    </>
  )
}
