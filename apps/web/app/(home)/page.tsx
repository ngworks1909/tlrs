import Hero from '@/components/hero/Hero'
import Navbar from '@/components/navbar/Navbar'
import React from 'react'

export default function page() {
  
  return (
    <div className="min-h-screen bg-background">
      <Navbar/>
      <Hero/>
    </div>
  )
}
