import { OrderType } from "@/components/orders/Orders";
import { NEXT_AUTH_CONFIG } from "@/lib/auth";
import prisma from "@repo/db/client";
import redis from "@/lib/redis";  // import your Redis singleton connection
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";

export async function fetchOrders() {
    const session = await getServerSession(NEXT_AUTH_CONFIG);
    const userId = session?.user?.id;

    if (!userId) {
        redirect("/login");
    }

    const cacheKey = `orders:${userId}`;
    
    // Check if orders are cached in Redis
    const cachedOrders = await redis.get(cacheKey);
    if (cachedOrders) {
        // Parse and return the cached orders if available
        return JSON.parse(cachedOrders) as OrderType[];
    }

    // If not cached, fetch orders from the database
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

    // Cache the orders in Redis with a TTL (e.g., 1 hour)
    await redis.set(cacheKey, JSON.stringify(orders), 'EX', 3600);

    return orders;
}
