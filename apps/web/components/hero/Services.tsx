"use client"
import React from 'react'
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '../ui/card'
import { useRouter } from 'next/navigation'
import { ChevronRight, MoveRightIcon } from 'lucide-react'
import { Button } from '../ui/button'

type ServiceType = {
    content: string;
    image: string;
    serviceId: string;
    serviceName: string;
}

export default function Services({services}: {services: ServiceType[]}) {
  const router = useRouter()
  return (
     <div className="container mx-auto px-4 py-8">
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
        {services.map((card, index) => (
          <Card key={index} className="flex flex-col overflow-hidden hover:shadow-lg transition-shadow duration-300">
            <CardHeader className="p-0">
              <div className="aspect-[6/3] sm:aspect-[4/3] relative overflow-hidden">
                <input
                  type="image"
                  src={card.image}
                  alt={card.serviceName}
                  className="absolute inset-0 w-full h-full object-cover transition-transform duration-300 hover:scale-105"
                />
              </div>
            </CardHeader>
            <CardContent className="flex-grow p-4">
              <CardTitle className="text-lg font-semibold mb-2">{card.serviceName}</CardTitle>
              <p className="text-muted-foreground text-sm min-h-[2.5rem] line-clamp-2">{card.content}</p>
            </CardContent>
            <CardFooter className="p-4 pt-0">
              <Button
                className="w-full group"
                variant={"default"}
                size="sm"
                onClick={(e) => {
                  e.preventDefault();
                  router.push(`/tracks/${card.serviceId}`)
                }}
              >
                <span>Explore</span>
                <ChevronRight className="ml-1 h-3 w-3 transition-all group-hover:opacity-0 group-hover:translate-x-1" />
                <MoveRightIcon className="ml-1 h-3 w-3 absolute transition-all opacity-0 group-hover:opacity-100 group-hover:translate-x-6" />
              </Button>
            </CardFooter>
          </Card>
        ))}
      </div>
    </div>
  )
}
