import { Order } from "./Orders";
import { format } from 'date-fns'
import { Check, Edit, DollarSign, Calendar, User, Phone} from 'lucide-react'


import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Dialog, DialogTrigger } from "@/components/ui/dialog"
import { Separator } from "@/components/ui/separator"
import OrderStatusBadge from "./OrderStatusBadge";
import UpdateOrderModal from "./UpdateOrderModal";
import AssignOrderModal from "./AssignOrderModal";

export type Admin = {
  adminId: string;
  adminName: string;
  mobile: string;
};

// eslint-disable-next-line no-unused-vars
export default function OrderCard({ order, onUpdate, onAssign, onAcquire }: Readonly<{ 
  order: Order; 
  // eslint-disable-next-line no-unused-vars
  onUpdate: (updatedOrder: Order) => Promise<void>;
  // eslint-disable-next-line no-unused-vars
  onAssign: (orderId: string, admin: Admin) => Promise<void>;
  // eslint-disable-next-line no-unused-vars
  onAcquire: (orderId: string) => Promise<void>;
}>) {
  const displayMeasurements = () => {
    if (order.service.serviceName === "SHIRT") {
      return ["SHIRT_LENGTH", "CHEST", "SHOULDER", "HANDS", "FRONT_LOOSE"];
    } else if (order.service.serviceName === "PANT") {
      return ["PANT_LENGTH", "WAIST", "HIP", "THIGHS_LOOSE", "BOTTOM"];
    }
    return [
      "SHIRT_LENGTH", "CHEST", "SHOULDER", "HANDS", "FRONT_LOOSE",
      "PANT_LENGTH", "WAIST", "HIP", "THIGHS_LOOSE", "BOTTOM"
    ];
  }

  const isUpdateAllowed = !["delivered", "cancelled"].includes(order.orderStatus);

  return (
    <Card className="w-full h-full flex flex-col">
      <CardHeader className="bg-primary/5">
        <CardTitle className="flex justify-between items-center">
          <span className="text-lg font-bold">Order #{order.orderId}</span>
          <OrderStatusBadge status={order.orderStatus} />
        </CardTitle>
      </CardHeader>
      <CardContent className="p-6 flex-1 overflow-auto">
        <div className="space-y-4">
          <div className="flex items-center space-x-4">
            <div className="relative size-16 rounded-full overflow-hidden bg-muted">
              <input
                type="image"
                src={order.service.image}
                alt={order.service.serviceName}
                className="object-cover w-full h-full"
/>
            </div>
            <div>
              <p className="font-semibold text-lg">{order.service.serviceName}</p>
              <p className="text-sm text-muted-foreground">{order.option.optionName}</p>
            </div>
          </div>
          <Separator />
          <div className="grid grid-cols-2 gap-4">
            <div className="flex items-center space-x-2">
              <DollarSign className="size-4 text-muted-foreground" />
              <div>
                <p className="text-sm text-muted-foreground">Total Price</p>
                <p className="font-semibold">₹{(order.option.price).toFixed(2)}</p>
              </div>
            </div>
            <div className="flex items-center space-x-2">
              <DollarSign className="size-4 text-muted-foreground" />
              <div>
                <p className="text-sm text-muted-foreground">Amount Paid</p>
                <p className="font-semibold">₹{(order.amountPaid).toFixed(2)}</p>
              </div>
            </div>
          </div>
          <Separator />
          <div className="flex items-center space-x-2">
            <Calendar className="size-4 text-muted-foreground" />
            <div>
              <p className="text-sm text-muted-foreground">Created On</p>
              <p className="font-semibold">{format(order.createdOn, 'MMM dd, yyyy')}</p>
            </div>
          </div>
          {order.deliveredOn && (
            <div className="flex items-center space-x-2">
              <Check className="size-4 text-muted-foreground" />
              <div>
                <p className="text-sm text-muted-foreground">Delivered On</p>
                <p className="font-semibold">{format(order.deliveredOn, 'MMM dd, yyyy')}</p>
              </div>
            </div>
          )}
          {order.assignedAdmin ? (
            <div className="space-y-2">
              <div className="flex items-center space-x-2">
                <User className="size-4 text-muted-foreground" />
                <div>
                  <p className="text-sm text-muted-foreground">Assigned To</p>
                  <p className="font-semibold">{order.assignedAdmin.adminName}</p>
                </div>
              </div>
              <div className="flex items-center space-x-2">
                <Phone className="size-4 text-muted-foreground" />
                <div>
                  <p className="text-sm text-muted-foreground">Contact</p>
                  <p className="font-semibold">{order.assignedAdmin.mobile}</p>
                </div>
              </div>
            </div>
          ) : (
            <div className="flex items-center space-x-2">
              <User className="size-4 text-muted-foreground" />
              <div>
                <p className="text-sm text-muted-foreground">Assigned To</p>
                <p className="font-semibold">Me</p>
              </div>
            </div>
          )}
        </div>
      </CardContent>
      <CardFooter className="bg-primary/5 flex flex-col items-stretch p-6 mt-auto">
        <div className="w-full mb-4">
          <h4 className="font-semibold mb-2 text-lg">Measurements:</h4>
          {order.measurements.length <= 5 ? (
            <div className="space-y-2">
              {displayMeasurements().map((measurementType) => {
                const measurement = order.measurements.find(m => m.type === measurementType);
                return measurement ? (
                  <div key={measurement.type} className="flex justify-between">
                    <span className="text-sm text-muted-foreground">{measurement.type}:</span>
                    <span className="font-semibold">{measurement.value.toFixed(1)}</span>
                  </div>
                ) : null;
              })}
            </div>
          ) : (
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                {["SHIRT_LENGTH", "CHEST", "SHOULDER", "HANDS", "FRONT_LOOSE"].map((measurementType) => {
                  const measurement = order.measurements.find(m => m.type === measurementType);
                  return measurement ? (
                    <div key={measurement.type} className="flex justify-between">
                      <span className="text-sm text-muted-foreground">{measurement.type}:</span>
                      <span className="font-semibold">{measurement.value.toFixed(1)}</span>
                    </div>
                  ) : null;
                })}
              </div>
              <div className="space-y-2">
                {["PANT_LENGTH", "WAIST", "HIP", "THIGHS_LOOSE", "BOTTOM"].map((measurementType) => {
                  const measurement = order.measurements.find(m => m.type === measurementType);
                  return measurement ? (
                    <div key={measurement.type} className="flex justify-between">
                      <span className="text-sm text-muted-foreground">{measurement.type}:</span>
                      <span className="font-semibold">{measurement.value.toFixed(1)}</span>
                    </div>
                  ) : null;
                })}
              </div>
            </div>
          )}
        </div>
        <div className="space-y-2">
          {isUpdateAllowed && (
            <Dialog>
              <DialogTrigger asChild>
                <Button className="w-full">
                  <Edit className="size-4 mr-2" />
                  Update Order
                </Button>
              </DialogTrigger>
              <UpdateOrderModal order={order} onUpdate={onUpdate} />
            </Dialog>
          )}
          {order.orderStatus === "pending" && !order.assignedAdmin && (
            <Dialog>
              <DialogTrigger asChild>
                <Button className="w-full" variant="outline">
                  Assign Order
                </Button>
              </DialogTrigger>
              <AssignOrderModal order={order} onAssign={onAssign} />
            </Dialog>
          )}
          {order.orderStatus === "pending" && order.assignedAdmin && (
            <Button className="w-full" variant="outline" onClick={async() => await onAcquire(order.orderId)}>
              Acquire Order
            </Button>
          )}
        </div>
      </CardFooter>
    </Card>
  )
}
