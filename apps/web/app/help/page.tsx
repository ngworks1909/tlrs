import React from 'react'
import construction from '../../public/construction.svg'
import Image from 'next/image'
import Navbar from '@/components/navbar/Navbar'

export default function page() {
  return (
    <div className="min-h-screen bg-background flex flex-col">
      <Navbar />
      <main className='flex-grow flex items-center justify-center px-4 py-8'>
        <div className='flex flex-col items-center justify-center gap-10 text-center'>
          <Image 
            src={construction} 
            className='h-[200px] sm:h-[300px] w-auto transition-all ease-linear' 
            alt="Under Development" 
          />
          <span className='text-xl font-medium'>We're sorry! Page is under development</span>
        </div>
      </main>
    </div>
  )
}