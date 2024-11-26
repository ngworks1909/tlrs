"use client"

import React, { useEffect, useState } from 'react'
import OrderSkeleton from '../skeletons/OrderSkeleton'
import { Order } from './Orders';
import { useRecoilValue } from 'recoil';
import { useToast } from '@/hooks/use-toast';
import { useOrders } from '@/hooks/useOrders';
import OrderCard from './OrderCard';
import { OrderSearchState } from '@/atoms/OrderSearchState';
import { Button } from '../ui/button';
import { ArrowUp } from 'lucide-react';


export default function OrderGrid() {
    const { toast } = useToast()
    const { orders, loadMoreOrders, hasMore, setOrders, loading, lastOrderElementRef } = useOrders();
    const searchQuery = useRecoilValue(OrderSearchState);
    const [showScrollToTop, setShowScrollToTop] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
          setShowScrollToTop(window.scrollY > 300)
          if ((window.innerHeight + window.scrollY >= document.body.scrollHeight - 100) && hasMore) {
            loadMoreOrders();
          }
        };
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
      }, [loadMoreOrders, hasMore]);

    const handleUpdateOrder = async (updatedOrder: Order) => {
        if(!updatedOrder || !updatedOrder.orderId) return;
        const response = await fetch("/api/update-order", {
          method: "POST",
          body: JSON.stringify(updatedOrder)
        })
        if(response.ok){
          toast({
            title: "Order updated",
            description: "Order updated successfully",
            className: "bg-green-500 text-white"
          })
          setOrders(prevOrders => 
            prevOrders.map(order => 
              order.orderId === updatedOrder.orderId ? updatedOrder : order
            )
          )
        }
        else{
          toast({
            title: "Failed to update order",
            description: "Failed to update order",
            variant: "destructive"
          })
        }
      }
    
      const handleAssignOrder = async (orderId: string, admin: Order['assignedAdmin']) => {
        if(!admin) return;
        const response = await fetch("/api/assign-order", {
          method: "POST",
          body: JSON.stringify({orderId, adminId: admin.adminId})
        })
        if(response.ok){
          setOrders(prevOrders =>
            prevOrders.map(order =>
              order.orderId === orderId ? { ...order, assignedAdmin: admin, assignedTo: admin.adminId } : order
            )
          )
          toast({
            title: "Order assigned",
            description: "Order assigned to " + admin.adminName,
            className: "bg-green-500 text-white"
          })
        }
        else{
          toast({
            title: "Failed to assign order",
            description: "Failed to assign order to " + admin.adminName,
            variant: "destructive"
          })
        }
      }
    
      const handleAcquireOrder = async(orderId: string) => {
        if(!orderId) return;
        const response = await fetch(`/api/acquire-order/${orderId}`, {
          method: "PUT"
        })
        if(response.ok){
          toast({
            title: "Order acquired",
            description: "Order acquired by you",
            className: "bg-green-500 text-white"
          })
          setOrders(prevOrders =>
            prevOrders.map(order =>
            order.orderId === orderId ? { ...order, assignedAdmin: null, assignedTo: null } : order
          )
        )
      }
      else{
        toast({
          title: "Failed to acquire order",
          description: "Failed to acquire order",
          variant: "destructive"
        })
      }
      }

      const scrollToTop = () => {
        window.scrollTo({ top: 0, behavior: 'smooth' })
      }

      const filteredOrders = orders.filter(order =>
        order.orderId.toLowerCase().includes(searchQuery.toLowerCase())
      );
  return (
    <>
    
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {loading ? (
          Array.from({ length: 6 }).map((_, index) => (
            <OrderSkeleton key={index} />
          ))
        ) : (
          filteredOrders.map((order: Order, index: number) => (
            <div
            key={order.orderId}
            ref={index === filteredOrders.length - 1 ? lastOrderElementRef : null}
          >
            <OrderCard
              order={order}
              onUpdate={handleUpdateOrder}
              onAssign={handleAssignOrder}
              onAcquire={handleAcquireOrder}
            />
          </div>
          ))
        )}
      </div>
      {!loading && filteredOrders.length === 0 && (
        <p className="text-center text-gray-500 mt-8">No orders found matching the search criteria.</p>
      )}

     {showScrollToTop && (
        <Button
          className="fixed bottom-4 right-4 rounded-full p-2"
          onClick={scrollToTop}
          aria-label="Scroll to top"
        >
          <ArrowUp className="h-6 w-6" />
        </Button>
      )}
      </>
  )
}
