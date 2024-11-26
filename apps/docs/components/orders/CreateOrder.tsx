"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { IndianRupee, ArrowLeft } from 'lucide-react'

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card } from "@/components/ui/card"
import { useToast } from '@/hooks/use-toast'
export type Measurement = {
  type: string
  value: number
}

export default function CreateOrder() {
  const router = useRouter()
  const {toast} = useToast()
  const orderDetails = localStorage.getItem('orderDetails');
  
  const [measurements, setMeasurements] = useState<Measurement[]>([])
  const [amountPaid, setAmountPaid] = useState<string>("0")
  const [mobileNumber, setMobileNumber] = useState<string>("")
  if(!orderDetails){
    router.back()
  }
  const {serviceId, serviceName, optionId, optionName, price} = JSON.parse(orderDetails as string);

  const getMeasurementFields = () => {
    switch (serviceName) {
      case "SHIRT":
        return ["SHIRT_LENGTH", "CHEST", "SHOULDER", "HANDS", "FRONT_LOOSE"]
      case "PANT":
        return ["PANT_LENGTH", "WAIST", "HIP", "THIGHS_LOOSE", "BOTTOM"]
      default:
        return ["SHIRT_LENGTH", "CHEST", "SHOULDER", "HANDS", "FRONT_LOOSE", "PANT_LENGTH", "WAIST", "HIP", "THIGHS_LOOSE", "BOTTOM"]
    }
  }

  const handleMeasurementChange = (type: string, value: string) => {
    const numValue = parseFloat(value)
    if (!isNaN(numValue)) {
      setMeasurements(prev => {
        const existing = prev.find(m => m.type === type)
        if (existing) {
          return prev.map(m => m.type === type ? { ...m, value: numValue } : m)
        }
        return [...prev, { type, value: numValue }]
      })
    }
  }

  const handleAmountPaidChange = (value: string) => {
    if(value === ""){
      setAmountPaid("0")
    }else if(amountPaid === "0"){
      setAmountPaid(value[1])
    }
    else{
      setAmountPaid(value)
    }
  }

  const handleSubmit = async() => {
    try {
      console.log(measurements)
      const response = await fetch("/api/create-order", {
        method: "POST",
        body: JSON.stringify({ serviceId, optionId, measurements, amountPaid, mobile: mobileNumber })
      })
      const data = await response.json()
      if(data.success){
        toast({
          title: "Order created successfully",
          description: "Your order has been created successfully",
          className: "bg-green-500 text-white"
        })
        localStorage.removeItem('orderDetails')
        router.push('/orders') 
      }else{
        toast({
          title: "Order creation failed",
          description: data.message,
          variant: "destructive"
        })
      }
    } catch (error) {
      toast({
        title: "Order creation failed",
        description: "An error occurred while creating the order",
        variant: "destructive"
      })
    }
  }

  return (
    <div className="container mx-auto p-4 max-w-2xl">
      <Button
        variant="ghost"
        onClick={() => router.back()}
        className="mb-4"
      >
        <ArrowLeft className="mr-2 h-4 w-4" /> Back to Orders
      </Button>
      <h1 className="text-2xl font-bold mb-6">Create New Order</h1>
      <form className="space-y-6">
        <Card className="p-4 bg-muted/50">
          <div className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="service">Service</Label>
              <Input id="service" value={serviceName} disabled />
            </div>
            <div className="space-y-2">
              <Label htmlFor="option">Option</Label>
              <Input id="option" value={optionName} disabled />
            </div>
            <div className="space-y-2">
              <Label htmlFor="mobileNumber">Mobile</Label>
              <Input
                  id="mobileNumber"
                  type="tel"
                  placeholder="Enter mobile number"
                  value={mobileNumber}
                  onChange={(e) => setMobileNumber(e.target.value)}
                />
            </div>
            <div className="flex justify-between">
              <Label>Price</Label>
              <span className="font-medium">₹{price.toString()}</span>
            </div>
          </div>
        </Card>

        <div className="space-y-4">
          <Label>Measurements</Label>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {getMeasurementFields().map((type) => (
              <div key={type} className="space-y-2">
                <Label htmlFor={type}>{type}</Label>
                <Input
                  id={type}
                  type="number"
                  step="0.1"
                  placeholder="0.0"
                  onChange={(e) => handleMeasurementChange(type, e.target.value)}
                  className="w-full"
                />
              </div>
            ))}
          </div>
        </div>

        <div className="space-y-2">
          <Label htmlFor="amountPaid">Amount Paid</Label>
          <div className="relative">
            <IndianRupee className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              id="amountPaid"
              type="number"
              value={amountPaid}
              onChange={(e) => handleAmountPaidChange(e.target.value)}
              className="pl-9"
            />
          </div>
            <p className="text-sm text-muted-foreground">
              ₹{amountPaid}
            </p>
        </div>

        <Button type="submit" onClick={async(e) => {e.preventDefault(); await handleSubmit()}} className="w-full">
                Create Order
        </Button>
      </form>
    </div>

  )
}