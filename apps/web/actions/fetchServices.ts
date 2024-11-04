import prisma from "@repo/db/client";

export async function fetchServices(){
    const services = await prisma.service.findMany();
    return services
}