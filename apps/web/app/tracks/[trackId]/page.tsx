import React from 'react'
import Navbar from '@/components/navbar/Navbar';
import Tracks from '@/components/tracks/Tracks';

export default async function page({params}: {params: {trackId: string}}) {
  const {trackId} = params;
  return (
    <div className="min-h-screen bg-background">
      <Navbar/>
      <main className='mx-auto px-4 py-8'>
        <Tracks trackId={trackId}/>
      </main>
    </div>
  )
}
