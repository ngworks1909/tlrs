import { PackageOpen } from 'lucide-react'
import React from 'react'

export default function NoOrders() {
  return (
    <div className="text-center py-12 bg-gray-50 rounded-lg shadow-inner">
      <div className="max-w-md mx-auto">
        <PackageOpen className="w-24 h-24 mx-auto text-gray-400 mb-4" />
        <h2 className="text-2xl font-semibold mb-2 text-gray-800">No Orders Found</h2>
        <p className="text-gray-600 mb-4">It looks like you don't have any orders yet.</p>
        <p className="text-sm text-gray-500">Check back later to see your order history.</p>
      </div>
    </div>
  )
}
