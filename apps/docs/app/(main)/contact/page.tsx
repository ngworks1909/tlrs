import Contact from '@/components/contact/Contact'
import Footer from '@/components/footer/Footer'
import React from 'react'

export default function page() {
  return (
      <>
      <main className='mx-auto px-4 py-8'>
        <Contact/>
      </main>
      <Footer/>
      </>
  )
}
