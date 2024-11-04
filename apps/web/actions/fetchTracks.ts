import prisma from "@repo/db/client";

export async function fetchTracks(trackId: string){
    const tracks = await prisma.option.findMany({
        where: {
            serviceId: trackId
        }
    });
    return tracks;
}