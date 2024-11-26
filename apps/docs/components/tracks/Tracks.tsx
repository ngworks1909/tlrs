import { fetchTracks } from '@/actions/fetchTracks'
import React from 'react'
import PriceItem from './PriceItem';

export type Option = {
  optionId: string;
  optionName: string;
  image: string;
  serviceId: string;
  duration: number;
  price: number;
  priority: number;
  remaining: number;
  service: {
      serviceName: string;
  };
}

export default async function Tracks({trackId}: Readonly<{trackId: string}>) {
  const tracks = await fetchTracks(trackId)
  return (
    <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 auto-rows-fr">
      {tracks && tracks.map((element : Option) => {
          return <PriceItem key={element.optionId} option = {element} />
          })}
    </div>
  )
}
