import Footer from '@/components/footer/Footer'
import Profile from '@/components/profile/Profile'
import React from 'react'

export default function page() {
  return (
    <>
        <main className="flex-grow container mx-auto px-4">
            <Profile/>
        </main>
        <Footer/>
    </>
  )
}
