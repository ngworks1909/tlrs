import React from 'react'
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Scissors, Clock, Star, Users, Ruler } from 'lucide-react'
import NavigationButton from '../buttons/NavigationButton'

const services = [
    {
      title: "Custom Tailoring",
      description: "Get perfectly fitted clothes tailored to your measurements and style preferences.",
      icon: Scissors
    },
    {
      title: "Alterations",
      description: "Quick and professional alterations to make your existing clothes fit better.",
      icon: Clock
    },
    {
      title: "Style Consultation",
      description: "Expert advice on styles, fabrics, and designs that suit you best.",
      icon: Star
    },
    {
      title: "Repair Services",
      description: "Extend the life of your favorite garments with our repair services.",
      icon: Scissors
    }
  ]
  
  const features = [
    {
      title: "Master Tailor",
      description: "Our expert tailor brings years of experience and skill to every garment.",
      icon: Ruler
    },
    {
      title: "Quick Turnaround",
      description: "Get your custom-made clothes or alterations done in record time.",
      icon: Clock
    },
    {
      title: "Quality Assured",
      description: "We maintain high standards for all our tailoring services.",
      icon: Star
    }
  ]

export default function About() {
  return (
    <>
      <h1 className="text-4xl font-bold mb-8 text-center">About Our Tailor Service</h1>
      
      <div className="max-w-3xl mx-auto">
        <Card className="mb-8">
          <CardHeader>
            <CardTitle className="text-2xl">Welcome to TLRS</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-gray-700 mb-4">
              TLRS is your personal tailoring solution. We provide a seamless experience for managing your custom clothing orders, all crafted by our expert tailor.
            </p>
            <p className="text-gray-700 mb-4">
              Our mission is to make custom-tailored clothing accessible, affordable, and hassle-free for everyone. Whether you need a suit for a special occasion or want to refresh your wardrobe with perfectly fitted clothes, we've got you covered.
            </p>
          </CardContent>
        </Card>

        <h2 className="text-2xl font-semibold mb-4">Our Services</h2>
        <div className="grid gap-6 md:grid-cols-2 mb-8">
          {services.map((service, index) => (
            <Card key={index}>
              <CardHeader>
                <CardTitle className="text-xl flex items-center">
                  <service.icon className="w-6 h-6 mr-2" />
                  {service.title}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-700">{service.description}</p>
              </CardContent>
            </Card>
          ))}
        </div>

        <h2 className="text-2xl font-semibold mb-4">Why Choose Us?</h2>
        <div className="grid gap-6 md:grid-cols-3 mb-8">
          {features.map((feature, index) => (
            <Card key={index}>
              <CardHeader>
                <CardTitle className="text-lg flex items-center justify-center">
                  <feature.icon className="w-6 h-6 mr-2" />
                  {feature.title}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-700 text-center">{feature.description}</p>
              </CardContent>
            </Card>
          ))}
        </div>

        <Card className="mb-8">
          <CardContent className="flex items-center justify-center py-6">
            <Users className="w-8 h-8 mr-4 text-blue-600" />
            <div>
              <h3 className="text-2xl font-bold">2,500+</h3>
              <p className="text-gray-600">Orders Delivered</p>
            </div>
          </CardContent>
        </Card>

        <div className="text-center">
          <h2 className="text-2xl font-semibold mb-4">Ready to get started?</h2>
           <NavigationButton route='/orders' message='View Your Orders' />
        </div>
      </div>
    </>
  )
}


