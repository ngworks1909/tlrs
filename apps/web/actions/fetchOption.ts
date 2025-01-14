import prisma from "@repo/db/client";
import { Option } from "@/components/tracks/Tracks";
import redis from "@/lib/redis";

export async function fetchOption(optionId: string){
    const cacheKey = `option-${optionId}`;
    const cachedOption = await redis.get(cacheKey);
    if(cachedOption){
        return JSON.parse(cachedOption) as Option
    }
    const option = await prisma.option.findUnique({
        where: {
            optionId
        }
    }) as Option

    await redis.set(cacheKey, JSON.stringify(option));

}