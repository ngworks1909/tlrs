

import React from 'react'
import { fetchOrders } from '@/actions/fetchOrders'
import NoOrders from './NoOrders'
import OrderCard from './OrderCard';

export type OrderType = {
  userId: string;
  orderId: string;
  serviceId: string;
  optionId: string;
  createdOn: Date;
  deliveredOn: Date | null;
  orderStatus: "pending" | "started" | "stitched" | "delivered" | "cancelled";
  reason: string | null;
  amountPaid: number;
  service: {
    image: string;
    serviceName: "SHIRT" | "PANT" | "DRESS" | "KURTA" | "SAFARI";
  },
  option: {
    image: string;
    optionName: "NITRO" | "EXPRESS" | "SWIFT" | "RABBIT";
    duration: number;
    price: number;
  };
};


export default async function Orders() {
  const orders = await fetchOrders()
  return (
    <>
      {orders.length === 0 ? (
        <NoOrders />
      ) : (
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {orders.map((order) => (
            <OrderCard key={order.orderId} order={order} />
          ))}
        </div>
      )}
    </>
  )
}


