"use client"

import React from 'react'
import { Button } from '../ui/button'
import { Plus } from 'lucide-react'
import { useToast } from '@/hooks/use-toast'

export default function AddUser() {
    const { toast } = useToast()
    const handleAddUser = () => {
        // Implement add user functionality
        toast({
          title: "Add User",
          description: "Add user functionality not implemented yet.",
          className: "bg-gradient-to-r from-purple-500 to-indigo-600 text-white"
        })
      }
  return (
    <Button className="bg-indigo-600 hover:bg-indigo-700 text-white" onClick={handleAddUser}>
        <Plus className="mr-2 h-4 w-4" />
        Add User
    </Button>
  )
}
