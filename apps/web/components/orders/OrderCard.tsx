import React from 'react'
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '../ui/card'
import { OrderType } from './Orders'
import { Badge } from '../ui/badge'
import { CheckCircle, Clock, XCircle } from 'lucide-react';
import { format } from 'date-fns'
import OrderDetailsDialog from './OrderDetailsDialog';

export const statusConfig = {
    pending: { icon: Clock, color: "bg-yellow-100 text-yellow-800 hover:bg-yellow-100" },
    started: { icon: Clock, color: "bg-blue-100 text-blue-800 hover:bg-blue-100" },
    stitched: { icon: Clock, color: "bg-indigo-100 text-indigo-800 hover:bg-indigo-100" },
    delivered: { icon: CheckCircle, color: "bg-green-100 text-green-800 hover:bg-green-100" },
    cancelled: { icon: XCircle, color: "bg-red-100 text-red-800 hover:bg-red-100" }
};

export default function OrderCard({ order }: { order: OrderType }) {
  const isCancelled = order.orderStatus === "cancelled";
  const StatusIcon = statusConfig[order.orderStatus].icon;
  return (
    <Card className="overflow-hidden transition-all duration-300 hover:shadow-lg">
      <CardHeader className="p-0">
        <div className="relative h-40 bg-gradient-to-r from-blue-500 to-purple-500">
          <input type='image' 
            src={order.service.image} 
            alt={order.service.serviceName} 
            className="w-full h-full object-cover opacity-50"
          />
          <div className="absolute inset-0 flex items-center justify-center">
            <input type='image' 
              src={order.option.image} 
              alt={order.option.optionName} 
              className="w-20 h-20 rounded-full border-4 border-white shadow-lg"
            />
          </div>
        </div>
      </CardHeader>
      <CardContent className="pt-4">
        <div className="flex justify-between items-center mb-2">
          <CardTitle className="text-lg font-bold text-gray-800 line-clamp-1 text-ellipsis max-w-32 w-full">Order #{order.orderId}</CardTitle>
          <Badge className={statusConfig[order.orderStatus].color}>
            <StatusIcon className="w-4 h-4 mr-1" />
            {order.orderStatus}
          </Badge>
        </div>
        <div className="space-y-2 text-sm">
          <p className="font-semibold text-gray-700">{order.service.serviceName} - {order.option.optionName}</p>
          <p className="text-gray-600">Created: <span className="font-medium text-gray-800">{format(order.createdOn, 'PPP')}</span></p>
          {!isCancelled ? (
            <p className="font-bold text-gray-800">Amount: ₹{order.option.price}</p>
          ):
          (
            <p className="font-bold text-red-600">Order Cancelled</p>
          )}
        </div>
      </CardContent>
      <CardFooter>
        <OrderDetailsDialog order={order} statusColor={statusConfig[order.orderStatus].color} />
      </CardFooter>
    </Card>
  )
}
