import { Check, Package, Scissors, Shirt, X } from "lucide-react"
import { Order } from "./Orders"
import { Badge } from "../ui/badge"

export default function OrderStatusBadge({ status }: { status: Order['orderStatus'] }) {
    const statusConfig = {
      pending: { color: "bg-yellow-500", icon: Package },
      started: { color: "bg-blue-500", icon: Scissors },
      stitched: { color: "bg-purple-500", icon: Shirt },
      cancelled: { color: "bg-red-500", icon: X },
      delivered: { color: "bg-green-500", icon: Check },
    }
  
    const { color, icon: Icon } = statusConfig[status]
  
    return (
      <Badge className={`${color} text-white`}>
        <Icon className="size-4 mr-1" />
        {status.charAt(0).toUpperCase() + status.slice(1)}
      </Badge>
    )
  }