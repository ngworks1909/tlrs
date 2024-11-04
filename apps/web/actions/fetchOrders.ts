import { OrderType } from "@/components/orders/Orders";
import { NEXT_AUTH_CONFIG } from "@/lib/auth";
import prisma from "@repo/db/client";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation"; 

export async function fetchOrders() {
    const session = await getServerSession(NEXT_AUTH_CONFIG);
    const userId = session?.user?.id;

    if (!userId) {
        redirect("/login");
    }

    const orders: OrderType[] = await prisma.order.findMany({
        where: {
            userId
        },
        orderBy: {
            createdOn: "desc"
        },
        include: {
            service: {
                select: {
                    image: true,
                    serviceName: true
                }
            },
            option: {
                select: {
                    image: true,
                    optionName: true,
                    duration: true,
                    price: true,
                }
            }
        }
        
    });

    

    return orders;
}


