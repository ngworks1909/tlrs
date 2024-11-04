import React from 'react'
import construction from '../../public/construction.svg'
import Image from 'next/image'
import Navbar from '@/components/navbar/Navbar'

// 

export default function page() {
  return (
    <div className="min-h-screen bg-background">
      <Navbar/>
      <main className='mx-auto px-4 py-8'>
        <div className='flex items-center justify-center h-full flex-col gap-10'>
         <Image src={construction} className='h-[200px] sm:h-[300px] transition-all ease-linear' alt="Under Development" />
         <span className='text-xl font-medium text-center'>We're sorry! Page is under development</span>
       </div>
      </main>
    </div>
  )
}