"use client"
import React from 'react'
import { Button } from '../ui/button'
import { useRouter } from 'next/navigation'

export default function ExploreButton() {
  const router = useRouter()
  return (
    <Button onClick={() => {router.replace('/#services')}} size="lg" className="bg-white text-blue-600 hover:bg-blue-50">
        Explore Our Services
    </Button>
  )
}
