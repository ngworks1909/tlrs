import React from 'react'
import Tracks from '@/components/tracks/Tracks';

export default async function page({params}: {params: {trackId: string}}) {
  const {trackId} = params;
  return (
      <main className='mx-auto px-4 py-8'>
        <Tracks trackId={trackId}/>
      </main>
  )
}
