"use client"

import React from 'react'
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '../ui/dialog'
import { Button } from '../ui/button'
import { ArrowRight, Calendar, Clock3, IndianRupee } from 'lucide-react'
import { Badge } from '../ui/badge'
import { OrderType } from './Orders'
import { format } from 'date-fns'
import { Separator } from '../ui/separator'


export default function OrderDetailsDialog({ order, statusColor }: { order: OrderType, statusColor: string }) {
  const isCancelled = order.orderStatus === "cancelled";
  const dueAmount = order.deliveredOn ? 0 : order.option.price - order.amountPaid;

  const orderStatuses = ["pending", "started", "stitched", "delivered"];
  const currentStatusIndex = orderStatuses.indexOf(order.orderStatus);

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="outline" className="w-full">
          Show Details
          <ArrowRight className="w-4 h-4 ml-2" />
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[550px]">
        <DialogHeader>
          <DialogTitle className="text-3xl font-bold text-gray-800">Order Details</DialogTitle>
        </DialogHeader>
        <div className="grid gap-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <input type='image' 
                src={order.service.image} 
                alt={order.service.serviceName} 
                className="w-20 h-20 rounded-lg object-cover shadow-md"
              />
              <input type='image' 
                src={order.option.image} 
                alt={order.option.optionName} 
                className="w-20 h-20 rounded-lg object-cover shadow-md"
              />
              <div>
                <h3 className="font-semibold text-xl text-gray-800">{order.service.serviceName}</h3>
                <p className="text-md text-gray-600 font-medium">{order.option.optionName}</p>
              </div>
            </div>
            <Badge className={`${statusColor} text-sm px-3 py-1`}>
              {order.orderStatus}
            </Badge>
          </div>
          
          <div className="space-y-2">
            <h4 className="font-semibold text-lg text-gray-800">Order Status</h4>
            <div className="flex justify-between items-center">
              {orderStatuses.map((status, index) => (
                <div key={status} className="flex flex-col items-center">
                  <div className={`w-8 h-8 rounded-full flex items-center justify-center ${
                    index <= currentStatusIndex && !isCancelled
                      ? "bg-green-500 text-white"
                      : "bg-gray-200 text-gray-500"
                  }`}>
                    {index + 1}
                  </div>
                  <p className="text-xs mt-1 text-gray-600">{status}</p>
                </div>
              ))}
            </div>
            {isCancelled && (
              <div className="mt-2 p-2 bg-red-100 rounded">
                <p className="text-sm text-red-800"><strong>Cancelled:</strong> {order.reason}</p>
              </div>
            )}
          </div>
          
          <div className="grid grid-cols-2 gap-4">
            <div className="flex items-center space-x-2">
              <Calendar className="w-5 h-5 text-gray-400" />
              <div>
                <p className="text-sm font-medium text-gray-600">Order Date</p>
                <p className="text-md font-semibold text-gray-800">{format(order.createdOn, 'PPP')}</p>
              </div>
            </div>
            <div className="flex items-center space-x-2">
              <Calendar className="w-5 h-5 text-gray-400" />
              <div>
                <p className="text-sm font-medium text-gray-600">Delivery Date</p>
                <p className="text-md font-semibold text-gray-800">
                  {order.deliveredOn ? format(order.deliveredOn, 'PPP') : 'Not yet delivered'}
                </p>
              </div>
            </div>
            <div className="flex items-center space-x-2">
              <Clock3 className="w-5 h-5 text-gray-400" />
              <div>
                <p className="text-sm font-medium text-gray-600">Duration</p>
                <p className="text-md font-semibold text-gray-800">{order.option.duration} days</p>
              </div>
            </div>
            {!isCancelled && (
              <div className="flex items-center space-x-2">
                <IndianRupee className="w-5 h-5 text-gray-400" />
                <div>
                  <p className="text-sm font-medium text-gray-600">Total Price</p>
                  <p className="text-md font-semibold text-gray-800">₹{order.option.price}</p>
                </div>
              </div>
            )}
          </div>
          
          {!isCancelled && (
            <>
              <Separator className="border-dashed" />
              
              <div className="bg-gray-100 p-4 rounded-lg">
                <h4 className="font-semibold text-lg mb-3 text-gray-800">Order Details</h4>
                <ul className="space-y-2">
                <li className="flex justify-between items-center">
                    <span className="text-gray-600">Order ID</span>
                    <span className="text-sm text-gray-800">{order.orderId}</span>
                  </li>
                  <li className="flex justify-between items-center">
                    <span className="text-gray-600">Total Price</span>
                    <span className="text-sm text-gray-800">₹{order.option.price}.00</span>
                  </li>
                  <li className="flex justify-between items-center">
                    <span className="text-gray-600">Amount Paid</span>
                    <span className="text-sm text-gray-800">₹{order.amountPaid}.00</span>
                  </li>
                  {dueAmount > 0 && (
                    <li className="flex justify-between items-center">
                      <span className="text-gray-600">Due Amount</span>
                      <span className="text-sm text-gray-800">₹{dueAmount}.00</span>
                    </li>
                  )}
                </ul>
              </div>
            </>
          )}
        </div>
      </DialogContent>
    </Dialog>
  )
}
