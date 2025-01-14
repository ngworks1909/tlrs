import prisma from "@repo/db/client";
import redis from "@/lib/redis";  // Import your Redis singleton connection
import { fetchOption } from "./fetchOption";
import { Option } from "@/components/tracks/Tracks";



export async function fetchTracks(trackId: string) {
    const cacheKey = `tracks:${trackId}`;

    // Check if tracks are cached in Redis for this trackId
    const cachedTrackIds = await redis.get(cacheKey);
    if (cachedTrackIds) {
        const tracks:Option[] = []
        const trackIds:string[] = JSON.parse(cachedTrackIds);
        for(let i = 0; i < trackIds.length; i++){
            const track = await fetchOption(trackIds[i]);
            if(track){
                tracks.push(track)
            }
        }

        return tracks;

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

    const trackIds: string[] = []


    for(let i = 0; i < tracks.length; i++){
        const optionId = tracks[i].optionId;
        await redis.set(`option-${optionId}`, JSON.stringify(tracks[i]))
        trackIds.push(optionId)
    }
    await redis.set(cacheKey, JSON.stringify(trackIds), 'EX', 3600);

    return tracks;
}
