import { useState } from "react";
import { Order } from "./Orders";
import { DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Button } from "../ui/button";

// eslint-disable-next-line no-unused-vars
export default function UpdateOrderModal({ order, onUpdate }: Readonly<{ order: Order; onUpdate: (newOrder: Order) => Promise<void> }>) {
    const [updatedOrder, setUpdatedOrder] = useState(order);
  
  
    const handleMeasurementChange = (type: string, value: string) => {
      setUpdatedOrder(prev => ({
        ...prev,
        measurements: prev.measurements.map(m => 
          m.type === type ? { ...m, value: parseFloat(value) } : m
        )
      }));
    };
  
    return (
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Update Order #{order.orderId}</DialogTitle>
        </DialogHeader>
        <form className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="amountPaid">Amount Paid (in rupees)</Label>
            <Input
              id="amountPaid"
              type="number"
              value={updatedOrder.amountPaid}
              onChange={(e) => setUpdatedOrder(prev => ({ ...prev, amountPaid: parseInt(e.target.value, 10) }))}
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="orderStatus">Order Status</Label>
            <Select
              value={updatedOrder.orderStatus}
              onValueChange={(value: Order['orderStatus']) => setUpdatedOrder(prev => ({ ...prev, orderStatus: value }))}
            >
              <SelectTrigger>
                <SelectValue placeholder="Select status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="pending">Pending</SelectItem>
                <SelectItem value="started">Started</SelectItem>
                <SelectItem value="stitched">Stitched</SelectItem>
                <SelectItem value="delivered">Delivered</SelectItem>
                <SelectItem value="cancelled">Cancelled</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div className="space-y-2">
            <Label>Measurements</Label>
            {updatedOrder.measurements.map((measurement) => (
              <div key={measurement.type} className="flex items-center space-x-2">
                <Label htmlFor={measurement.type} className="w-1/2">{measurement.type}</Label>
                <Input
                  id={measurement.type}
                  type="number"
                  step="0.5"
                  value={measurement.value}
                  onChange={(e) => handleMeasurementChange(measurement.type, e.target.value)}
                  className="w-1/2"
                />
              </div>
            ))}
          </div>
          <Button type="submit" onClick={async(e) => {e.preventDefault(); await onUpdate(updatedOrder)}}>Update Order</Button>
        </form>
      </DialogContent>
    );
  }