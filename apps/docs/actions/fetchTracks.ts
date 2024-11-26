import prisma from "@repo/db/client";
import redis from "@/lib/redis";  // Import your Redis singleton connection
import { Option } from "@/components/tracks/Tracks";

export async function fetchTracks(trackId: string) {
    const cacheKey = `tracks:${trackId}`;

    // Check if tracks are cached in Redis for this trackId
    const cachedTracks = await redis.get(cacheKey);
    if (cachedTracks) {
        // Parse and return the cached tracks if available
        return JSON.parse(cachedTracks);
    }

    // If not cached, fetch tracks from the database
    const tracks = await prisma.option.findMany({
        where: {
            serviceId: trackId
        },
        select: {
            image: true,
            serviceId: true,
            optionId: true,
            optionName: true,
            duration: true,
            price: true,
            priority: true,
            remaining: true,
            service: {
                select: {
                    serviceName: true
                }
            }
        }
    });


    // Cache the tracks in Redis with a TTL (e.g., 1 hour)
    await redis.set(cacheKey, JSON.stringify(tracks), 'EX', 3600);

    return tracks;
}
