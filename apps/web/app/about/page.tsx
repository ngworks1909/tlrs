import About from '@/components/about/About'
import Navbar from '@/components/navbar/Navbar'
import React from 'react'

export default function page() {
  return (
    <div className="min-h-screen bg-background">
      <Navbar/>
      <main className='mx-auto px-4 py-8'>
        <About/>
      </main>
    </div>
  )
}
