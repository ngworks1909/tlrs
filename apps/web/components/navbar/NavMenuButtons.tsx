"use client"
import { useRouter } from 'next/navigation';
import React from 'react'
import { Button } from '../ui/button';
import { LogIn, UserPlus } from 'lucide-react';
import { useSetRecoilState } from 'recoil';
import { NavOpenState } from '@/atoms/NavOpenState';

export default function NavMenuButtons() {
  const router = useRouter()
  const setIsOpen = useSetRecoilState(NavOpenState)
  return (
    <>
    <Button variant="outline" onClick={() => { router.push('/login'); setIsOpen(false); }} className="w-full">
        <LogIn className="mr-2 h-4 w-4" />
            Log In
    </Button>
    <Button onClick={() => { router.push('/signup'); setIsOpen(false); }} className="w-full">
      <UserPlus className="mr-2 h-4 w-4" />
      Sign Up
    </Button>
    </>
  )
}
