"use client";

import React from 'react'
import { Button } from '../ui/button';
import { useRouter } from 'next/navigation';
import { ChevronRight, MoveRightIcon } from 'lucide-react';

export default function NavigateButton({serviceId}: Readonly<{serviceId: string}>) {
    const router = useRouter()
  return (
    <Button
                className="w-full group"
                variant={"default"}
                size="sm"
                onClick={(e) => {
                  e.preventDefault();
                  router.push(`/tracks/${serviceId}`)
                }}
              >
                <span>Explore</span>
                <ChevronRight className="ml-1 h-3 w-3 transition-all group-hover:opacity-0 group-hover:translate-x-1" />
                <MoveRightIcon className="ml-1 h-3 w-3 absolute transition-all opacity-0 group-hover:opacity-100 group-hover:translate-x-6" />
              </Button>
  )
}
