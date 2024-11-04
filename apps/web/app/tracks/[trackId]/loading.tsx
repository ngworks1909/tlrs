import React from 'react'
import { Card, CardContent, CardHeader } from "@/components/ui/card"
import { Skeleton } from "@/components/ui/skeleton"
import { Clock, Users } from "lucide-react"
import NavSkeleton from '@/components/skeleton/NavSkeleton'

export default function Loading() {
  return (
    <div className="min-h-screen bg-background">
      <NavSkeleton/>
      <main className='mx-auto px-4 py-8'>
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 auto-rows-fr">
          {[...Array(10)].map((_, index) => (
            <Card key={index} className="overflow-hidden transition-all hover:shadow-lg group">
              <CardHeader className="p-0">
                <div className="aspect-[4/3] relative overflow-hidden">
                  <Skeleton className="absolute inset-0 w-full h-full" />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent pointer-events-none" />
                  <Skeleton className="absolute bottom-2 right-2 h-6 w-16" />
                </div>
              </CardHeader>
              <CardContent className="p-4">
                <Skeleton className="h-6 w-3/4 mb-2" />
                <div className="flex items-center justify-between text-sm text-muted-foreground">
                  <div className="flex items-center">
                    <Clock className="mr-1 h-4 w-4" />
                    <Skeleton className="h-4 w-16" />
                  </div>
                  <div className="flex items-center">
                    <Users className="mr-1 h-4 w-4" />
                    <Skeleton className="h-4 w-16" />
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </main>
    </div>
  )
}