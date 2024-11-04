"use client"

import React from 'react'
import { Sheet } from "@/components/ui/sheet"
import { useRecoilValue, useSetRecoilState } from 'recoil';
import { NavOpenState } from '@/atoms/NavOpenState';


export default function NavSheet({children}: {children: React.ReactNode}): JSX.Element {
    const isOpen = useRecoilValue(NavOpenState);
    const setIsOpen = useSetRecoilState(NavOpenState)
  return (
    <Sheet open={isOpen} onOpenChange={setIsOpen}>
        {children}
    </Sheet>
  );
}
