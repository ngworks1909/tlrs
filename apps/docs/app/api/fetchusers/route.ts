import { NEXT_AUTH_CONFIG } from "@/lib/auth";
import prisma from "@repo/db/client";
import { getServerSession } from "next-auth";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest){
    try {
        const session = await getServerSession(NEXT_AUTH_CONFIG)
        if(!session?.user?.id){
            return NextResponse.json({error: "Unauthorized"}, {status: 401})
        }
        const { searchParams } = new URL(req.url);
        const page = parseInt(searchParams.get('page') ?? '1');
        const pageSize = parseInt(searchParams.get('pageSize') ?? '20');
        const skip = (page - 1) * pageSize;
    
        const users = await prisma.user.findMany({
            skip,
            take: pageSize,
            select: {
                username: true,
                userId: true, 
                email: true,
                mobile: true,
                image: true,
                _count: {
                    select: {
                        orders: true
                    }
                }
            }
        });

        return NextResponse.json({success: true, users}, {status: 200})
    } catch (error) {
        return NextResponse.json({success: false, error: "Internal server error"}, {status: 500})
    }

}