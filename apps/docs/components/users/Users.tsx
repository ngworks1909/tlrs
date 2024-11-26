"use client"

import { Search } from "lucide-react"
import UserGrid from './UserGrid'
import AddUser from './AddUser'
import UserSearch from './UserSearch'

export default function UserPage() {

  return (
    <div className="container mx-auto py-8 px-4">
      <div className="bg-gradient-to-r from-purple-500 to-indigo-600 text-white p-8 rounded-lg shadow-lg mb-8">
        <h1 className="text-4xl font-bold mb-2">User Management</h1>
        <p className="text-xl opacity-80">Manage and view all users in your system</p>
      </div>
      
      <div className="flex flex-col sm:flex-row justify-between items-center mb-6 space-y-4 sm:space-y-0">
        <div className="relative w-full sm:w-96">
          <UserSearch/>
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
        </div>
        <AddUser/>
      </div>

      <UserGrid/>
    </div>
  )
}