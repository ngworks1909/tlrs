"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Skeleton } from "@/components/ui/skeleton"
import { Search } from 'lucide-react'
import { Admin } from "./OrderCard"
import { Order } from "./Orders"
import { useAdmins } from "@/hooks/useAdmins"


// eslint-disable-next-line no-unused-vars
export default function AssignOrderModal({ order, onAssign }: Readonly<{ order: Order; onAssign: (orderId: string, admin: Admin) => Promise<void> }>) {
  const [searchQuery, setSearchQuery] = useState("")

  const {admins, loading} = useAdmins()

  const filteredAdmins = admins.filter(
    (admin) =>
      admin.adminName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      admin.mobile.includes(searchQuery)
  )

  return (
    <DialogContent className="sm:max-w-[425px] h-[80vh] flex flex-col">
      <DialogHeader>
        <DialogTitle>Assign Order #{order.orderId}</DialogTitle>
      </DialogHeader>
      <div className="flex-grow flex flex-col overflow-hidden">
        <div className="relative mb-4">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
          <Input
            type="text"
            placeholder="Search by name or mobile"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-10 pr-4 py-2 w-full text-sm"
          />
        </div>
        <div className="flex-grow overflow-y-auto pr-4">
          {loading ? (
            <>
              <AdminSkeleton />
              <AdminSkeleton />
              <AdminSkeleton />
              <AdminSkeleton />
            </>
          ) : (
            <>
              {filteredAdmins.length > 0 ? (
                filteredAdmins.map((admin) => (
                  <div key={admin.adminId} className="flex items-center justify-between bg-secondary/10 rounded-lg mb-2">
                    <div>
                      <p className="font-semibold">{admin.adminName}</p>
                      <p className="text-sm text-muted-foreground">{admin.mobile}</p>
                    </div>
                    <Button onClick={async() => await onAssign(order.orderId, admin)}>Assign</Button>
                  </div>
                ))
              ) : (
                <div className="text-center py-8">
                  <p className="text-xl font-semibold text-gray-500">No admins found</p>
                  <p className="text-sm text-gray-400 mt-2">Try adjusting your search criteria</p>
                </div>
              )}
            </>
          )}
        </div>
      </div>
    </DialogContent>
  )
}

function AdminSkeleton() {
  return (
    <div className="flex items-center justify-between p-4 bg-secondary/10 rounded-lg mb-2">
      <div className="space-y-2">
        <Skeleton className="h-4 w-[150px]" />
        <Skeleton className="h-3 w-[100px]" />
      </div>
      <Skeleton className="h-9 w-[70px]" />
    </div>
  )
}