import { NEXT_AUTH_CONFIG } from "@/lib/auth"
import prisma from "@repo/db/client"
import { getServerSession } from "next-auth"
import { NextResponse } from "next/server"
import redis from "@/lib/redis"

export async function GET() {
    try {
        const session = await getServerSession(NEXT_AUTH_CONFIG)
        if (!session?.user?.id) {
            return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
        }
        let cachedAdmins = await redis.get(`admins`)
        if(cachedAdmins){
            return NextResponse.json({success: true, admins: JSON.parse(cachedAdmins)}, {status: 200})
        }
        const admins = await prisma.admin.findMany({
            where: {
                adminId: {
                    not: session.user.id
                }
            }
        });
        await redis.set(`admins`, JSON.stringify(admins), 'EX', 86400)
        return NextResponse.json({success: true, admins}, {status: 200})
    } catch (error) {
        return NextResponse.json({success: false, error: "Internal Server Error"}, {status: 500})
    }
}