import About from '@/components/about/About'
import Footer from '@/components/footer/Footer'
import React from 'react'

export default function page() {
  return (
      <>
      <main className='mx-auto px-4 py-8'>
        <About/>
      </main>
      <Footer/>
      </>
  )
}
