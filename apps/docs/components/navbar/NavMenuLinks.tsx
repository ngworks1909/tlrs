"use client"
import React from 'react'
import { usePathname } from 'next/navigation'
import Link from 'next/link'
import { useSetRecoilState } from 'recoil';
import { NavOpenState } from '@/atoms/NavOpenState';
import { navItems } from './Navbar';


export default function NavMenuLinks() {

  const pathname = usePathname();
  const setIsOpen = useSetRecoilState(NavOpenState)
  return (
    <>
    {navItems.map((item) => {
        return <Link
        key={item.href}
        href={item.href}
        className={`flex items-center space-x-2 ${
          pathname === item.href ? "text-gray-900 font-semibold" : "text-gray-600"
        }`}
        onClick={() => setIsOpen(false)}
      >
        <item.icon className="h-5 w-5" />
        <span>{item.label}</span>
      </Link>
    })}
      
    </>
  )
}
