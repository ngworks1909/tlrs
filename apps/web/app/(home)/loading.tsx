import NavSkeleton from '@/components/skeleton/NavSkeleton'
import { Card, CardContent, CardFooter, CardHeader } from '@/components/ui/card'
import { Skeleton } from '@/components/ui/skeleton'

export default function Loading() {
  return (
    <div className="min-h-screen bg-background">
        <NavSkeleton/>
    <main>
      {/* Hero Section Skeleton */}
      <section className="bg-gradient-to-r from-blue-500 to-purple-600 text-white py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl mx-auto text-center">
          <Skeleton className="h-12 w-3/4 mx-auto mb-6" />
          <Skeleton className="h-6 w-2/3 mx-auto mb-10" />
          <Skeleton className="h-12 w-48 mx-auto" />
        </div>
      </section>

      {/* Services Section Skeleton */}
      <section className="py-20 bg-muted">
        <div className="container">
          <Skeleton className="h-10 w-64 mx-auto mb-12" />
        </div>
        <div className="container mx-auto px-4 py-8">
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
            {[...Array(8)].map((_, index) => (
              <Card key={index} className="flex flex-col overflow-hidden">
                <CardHeader className="p-0">
                  <div className="aspect-[6/3] sm:aspect-[4/3] relative overflow-hidden">
                    <Skeleton className="absolute inset-0 w-full h-full" />
                  </div>
                </CardHeader>
                <CardContent className="flex-grow p-4">
                  <Skeleton className="h-6 w-3/4 mb-2" />
                  <Skeleton className="h-4 w-full mb-1" />
                  <Skeleton className="h-4 w-2/3" />
                </CardContent>
                <CardFooter className="p-4 pt-0">
                  <Skeleton className="h-8 w-full" />
                </CardFooter>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Footer Skeleton */}
      <footer className="bg-gray-100 py-8">
        <div className="container mx-auto px-4">
          <div className="flex flex-wrap justify-between">
            <div className="w-full md:w-1/3 mb-6 md:mb-0">
              <Skeleton className="h-8 w-32 mb-4" />
              <Skeleton className="h-4 w-full mb-2" />
              <Skeleton className="h-4 w-2/3" />
            </div>
            <div className="w-full md:w-1/3 mb-6 md:mb-0">
              <Skeleton className="h-6 w-24 mb-4" />
              <Skeleton className="h-4 w-full mb-2" />
              <Skeleton className="h-4 w-full mb-2" />
              <Skeleton className="h-4 w-2/3" />
            </div>
            <div className="w-full md:w-1/3">
              <Skeleton className="h-6 w-32 mb-4" />
              <div className="flex space-x-4">
                <Skeleton className="h-8 w-8 rounded-full" />
                <Skeleton className="h-8 w-8 rounded-full" />
                <Skeleton className="h-8 w-8 rounded-full" />
              </div>
            </div>
          </div>
        </div>
      </footer>
    </main>
    </div>
  )
}