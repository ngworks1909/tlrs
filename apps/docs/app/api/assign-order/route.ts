import { NEXT_AUTH_CONFIG } from "@/lib/auth"
import { validateAssign } from "@/zod/validateAssign"
import prisma from "@repo/db/client"
import { getServerSession } from "next-auth"
import { NextRequest, NextResponse } from "next/server"

export async function POST(req: NextRequest){
    try {
        const session = await getServerSession(NEXT_AUTH_CONFIG)
    if(!session?.user?.id) return NextResponse.json({error: "Unauthorized"}, {status: 401})

    const {orderId, adminId} = await req.json()
    const assignValidation = validateAssign.safeParse({orderId, adminId})
    if(!assignValidation.success) return NextResponse.json({success: false, message: "Invalid request"}, {status: 400})
    const order = await prisma.order.findUnique({
        where: {
            orderId
        },
        select: {
            orderId: true,
        }
    })
    if(!order) return NextResponse.json({success: false, message: "Order not found"}, {status: 403});
    const admin = await prisma.admin.findUnique({
        where: {
            adminId
        },
        select: {
            adminId: true,
        }
    })
    if(!admin) return NextResponse.json({success: false, message: "Admin not found"}, {status: 403});
    await prisma.order.update({
        where: {
            orderId
        },
        data: {
            assignedTo: admin.adminId
        }
        })
        return NextResponse.json({success: true, message: "Order assigned"}, {status: 200})
    } catch (error) {
        return NextResponse.json({success: false, message: "Internal server error"}, {status: 500})
    }
}