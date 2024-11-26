"use client"
import React from 'react'
import { Button } from '../ui/button'

export default function ExploreButton() {
  const handleExplore = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault()
    const servicesSection = document.getElementById('services')
    if (servicesSection) {
      servicesSection.scrollIntoView({ behavior: 'smooth' })
    }
  }

  return (
    <Button onClick={handleExplore} size="lg" className="bg-white text-blue-600 hover:bg-blue-50">
      Explore Our Services
    </Button>
  )
}