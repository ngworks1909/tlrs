import Footer from '@/components/footer/Footer'
import TermsAndConditions from '@/components/terms/TermsandConditions'
import React from 'react'

export default function page() {
  return (
      <>
      <main className='mx-auto container px-4 py-10'>
        <TermsAndConditions/>
      </main>
      <Footer/>
      </>
  )
}
