import prisma from "@repo/db/client";
import redis from "@/lib/redis";  // Import your Redis singleton connection

export async function fetchServices() {
    const cacheKey = 'services';

    // Check if services are cached in Redis
    const cachedServices = await redis.get(cacheKey);
    if (cachedServices) {
        // Parse and return the cached services if available
        return JSON.parse(cachedServices);
    }

    // If not cached, fetch services from the database
    const services = await prisma.service.findMany();

    // Cache the services in Redis with a TTL (e.g., 1 hour)
    await redis.set(cacheKey, JSON.stringify(services), 'EX', 3600);

    return services;
}
