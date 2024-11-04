import Navbar from '@/components/navbar/Navbar'
import PrivacyPolicy from '@/components/privacy/PrivacyPolicy'
import React from 'react'

export default function page() {
  return (
    <div className="min-h-screen bg-background">
      <Navbar/>
      <main className='mx-auto container px-4 py-10'>
        <PrivacyPolicy/>
      </main>
    </div>
  )
}
