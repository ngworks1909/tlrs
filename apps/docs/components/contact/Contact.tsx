import React from 'react'
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { MapPin, Phone, Mail, Clock } from 'lucide-react'
import NavigationButton from '../buttons/NavigationButton'

export default function Contact() {
  return (
    <>
      <h1 className="text-4xl font-bold mb-8 text-center">Contact Us</h1>
      
      <div className="max-w-3xl mx-auto mb-20">
        <Card className="mb-8">
          <CardHeader>
            <CardTitle className="text-2xl">Get in Touch</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-gray-700 mb-4">
              We're here to help with all your tailoring needs. Feel free to reach out to us using the information below.
            </p>
          </CardContent>
        </Card>

        <div className="grid gap-6 md:grid-cols-2 mb-8">
          <Card>
            <CardHeader>
              <CardTitle className="text-xl flex items-center">
                <MapPin className="w-6 h-6 mr-2" />
                Location
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-gray-700">Beside Lumbini School,</p>
              <p className="text-gray-700">Teachers Colony,</p>
              <p className="text-gray-700">Mahabubnagar.</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="text-xl flex items-center">
                <Phone className="w-6 h-6 mr-2" />
                Phone
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-gray-700">+91 9948512104</p>
              <p className="text-sm text-gray-500 mt-2">Available Mon-Sat, 9am-8pm</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="text-xl flex items-center">
                <Mail className="w-6 h-6 mr-2" />
                Email
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-gray-700">nithin.kanduru1908@gmail.com</p>
              <p className="text-sm text-gray-500 mt-2">We'll respond within 24 hours</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="text-xl flex items-center">
                <Clock className="w-6 h-6 mr-2" />
                Business Hours
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-gray-700">Monday - Saturday: 9:30am - 8pm</p>
              <p className="text-gray-700">Lunch: 1pm - 2:30pm</p>
              <p className="text-gray-700">Sunday: Closed</p>
            </CardContent>
          </Card>
        </div>

        <Card>
          <CardContent className="flex flex-col items-center justify-center py-6">
            <h3 className="text-2xl font-bold mb-4">Need Help?</h3>
            <NavigationButton message='Contact Support' route='/help' />
          </CardContent>
        </Card>
      </div>
    </>
  )
}