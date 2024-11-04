import Footer from '@/components/footer/Footer'
import Navbar from '@/components/navbar/Navbar'
import Profile from '@/components/profile/Profile'
import React from 'react'

export default function page() {
  return (
    <div className="flex flex-col min-h-screen">
        <Navbar/>
        <main className="flex-grow container mx-auto px-4">
            <Profile/>
        </main>
        <Footer/>
    </div>
  )
}
