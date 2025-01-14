import Navbar from '@/components/navbar/Navbar';
import React from 'react'

export default function layoutayout({
    children,
  }: Readonly<{
    children: React.ReactNode;
  }>) {
    return (
        <div className="min-h-screen min-w-screen bg-background">
        <Navbar/>
        {children}
      </div>
    );
  }
