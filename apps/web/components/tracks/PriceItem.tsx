import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import { Clock, Users } from "lucide-react";
import { Badge } from "../ui/badge";

export default function PriceItem({duration, service, price, remaining, image}: {duration: number, service: string, price: number, remaining: number, image: string}) {
  return (
    <Card className="overflow-hidden transition-all hover:shadow-lg group">
    <CardHeader className="p-0">
      <div className="aspect-[4/3] relative overflow-hidden">
        <input
          type="image"
          src={image}
          alt={service}
          className="absolute inset-0 w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent pointer-events-none" />
        <Badge className="absolute bottom-2 right-2 text-lg font-semibold bg-primary text-primary-foreground">
          ₹{price}
        </Badge>
      </div>
    </CardHeader>
    <CardContent className="p-4">
      <CardTitle className="mb-2 text-xl">{service}</CardTitle>
      <div className="flex items-center justify-between text-sm text-muted-foreground">
        <div className="flex items-center">
          <Clock className="mr-1 h-4 w-4" />
          <span>
            {duration} {Number(duration) > 1 ? "days" : "day"}
          </span>
        </div>
        <div className="flex items-center">
          <Users className="mr-1 h-4 w-4" />
          <span>{remaining} slots</span>
        </div>
      </div>
    </CardContent>
  </Card>
  )
}
