import { Search } from 'lucide-react'
import OrderGrid from './OrderGrid'
import OrderSearch from './OrderSearch'

export type Order = {
  orderId: string;
  userId: string;
  serviceId: string;
  service: {
    image: string;
    serviceName: "SHIRT" | "PANT" | "KURTA" | "SAFARI" | "DRESS";
  };
  optionId: string;
  option: {
    image: string;
    optionName: string;
    price: number;
    priority: number;
  };
  adminId: string;
  assignedTo: string | null;
  assignedAdmin: {
    adminId: string;
    adminName: string;
    mobile: string;
  } | null;
  createdOn: Date;
  deliveredOn: Date | null;
  orderStatus: "pending" | "started" | "stitched" | "cancelled" | "delivered";
  reason: string | null;
  amountPaid: number;
  measurements: {
    type: string;
    value: number;
  }[];
};


export default function Orders() {
  return (
    <div className="container mx-auto p-4">
      <div className="mb-6">
        <div className="w-full md:w-1/2 lg:w-1/3 mx-auto mb-6">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
            <OrderSearch />
          </div>
        </div>
      </div>
      <OrderGrid />
    </div>
  )
}