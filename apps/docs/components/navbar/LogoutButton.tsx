'use client'

import React from 'react'
import { DropdownMenuItem } from '../ui/dropdown-menu'
import { LogOut } from 'lucide-react'
import { signOut } from 'next-auth/react'

export default function LogoutButton() {
  return (
    <DropdownMenuItem onClick={async() => {await signOut()}}>
      <LogOut className="mr-2 h-4 w-4" />
      <span>Log out</span>
    </DropdownMenuItem>
  )
}
