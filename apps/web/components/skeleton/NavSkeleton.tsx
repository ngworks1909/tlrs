import React from 'react'
import { Skeleton } from '../ui/skeleton'

export default function NavSkeleton() {
  return (
    <nav className="sticky top-0 z-50 w-full bg-white bg-opacity-80 backdrop-blur-[5px] border-b shadow-sm">
      <div className="mx-auto px-4">
        <div className="flex h-16 items-center justify-between">
          <div className="flex items-center space-x-8">
            <div className="flex items-center space-x-2">
              <Skeleton className="h-6 w-6 rounded-full" />
              <Skeleton className="h-6 w-16" />
            </div>
            <div className="hidden mid:flex mid:items-center mid:space-x-4">
              {[...Array(5)].map((_, i) => (
                <Skeleton key={i} className="h-8 w-20 rounded-md" />
              ))}
            </div>
          </div>
          <div className="flex items-center space-x-4">
            <div className="hidden lvsm:inline-flex">
              <Skeleton className="h-9 w-24 rounded-md" />
            </div>
            <div className="hidden sm:inline-flex">
              <Skeleton className="h-9 w-24 rounded-md" />
            </div>
            <Skeleton className="h-8 w-8 rounded-full" />
          </div>
        </div>
      </div>
    </nav>
  )
}
