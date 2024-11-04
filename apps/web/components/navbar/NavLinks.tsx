"use client"
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import React from 'react'
import { navItems } from './Navbar';


export default function NavLinks() {
  const pathname = usePathname()
  
  return (
    <>
    {navItems.map((item) => {
        return <Link
          key={item.href}
          href={item.href}
          className={`flex items-center space-x-1 rounded-md px-3 py-2 text-sm font-medium transition-colors hover:bg-gray-100 ${
             pathname === item.href ? "bg-gray-100 text-gray-900" : "text-gray-600"
          }`}
        >
          <item.icon className="h-4 w-4" />
          <span>{item.label}</span>
        </Link>
   })}
      
    </>
  )
}
