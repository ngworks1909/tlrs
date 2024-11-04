import prisma from "@repo/db/client";
import redis from "@repo/db/redis";// Import your Redis singleton connection

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
        }
    });

    // Cache the tracks in Redis with a TTL (e.g., 1 hour)
    await redis.set(cacheKey, JSON.stringify(tracks), 'EX', 3600);

    return tracks;
}
