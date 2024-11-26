import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "../ui/card";
import { Clock, Users } from "lucide-react";
import { Badge } from "../ui/badge";
import NewOrderButton from "./NewOrderButton";
import { Option } from "./Tracks";

export default function PriceItem({option}: Readonly<{option: Option}>) {
  return (
<Card className="overflow-hidden transition-all hover:shadow-lg group flex flex-col h-full">
      <CardHeader className="p-0">
        <div className="aspect-[4/3] relative overflow-hidden">
          <input
            type="image"
            src={option.image}
            alt={option.optionName}
            className="absolute inset-0 w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent pointer-events-none" />
          <Badge className="absolute bottom-2 right-2 text-lg font-semibold bg-primary text-primary-foreground">
            ₹{option.price}
          </Badge>
        </div>
      </CardHeader>
      <CardContent className="p-4 flex-grow">
        <CardTitle className="mb-2 text-xl">{option.optionName}</CardTitle>
        <div className="flex items-center justify-between text-sm text-muted-foreground">
          <div className="flex items-center">
            <Clock className="mr-1 h-4 w-4" />
            <span>
              {option.duration} {Number(option.duration) > 1 ? "days" : "day"}
            </span>
          </div>
          <div className="flex items-center">
            <Users className="mr-1 h-4 w-4" />
            <span>{option.remaining} slots</span>
          </div>
        </div>
      </CardContent>
      <CardFooter className="p-4 pt-0">
        <NewOrderButton optionId = {option.optionId} optionName = {option.optionName} serviceId = {option.serviceId} serviceName = {option.service.serviceName} price = {option.price} />
      </CardFooter>
    </Card>

  )
}
