import { NextRequest, NextResponse } from "next/server"
import prisma from "@repo/db/client"
import { getServerSession } from "next-auth"
import { NEXT_AUTH_CONFIG } from "@/lib/auth"

export async function PUT(req: NextRequest, {params}: {params: {orderId: string}}){
    try {
        const session = await getServerSession(NEXT_AUTH_CONFIG)
        if(!session?.user?.id) return NextResponse.json({error: "Unauthorized"}, {status: 401})
        const orderId = params.orderId
        if(!orderId) return NextResponse.json({success: false, message: "Order ID is required"}, {status: 400})

        const order = await prisma.order.findUnique({
            where: {orderId}
        })
        if(!order) return NextResponse.json({success: false, message: "Order not found"}, {status: 404})
        if(order.adminId === session.user.id) return NextResponse.json({success: false, message: "You are not authorized to acquire this order"}, {status: 403})

        await prisma.order.update({
            where: {orderId},
            data: {assignedTo: null}
        })
        return NextResponse.json({success: true, message: "Order acquired successfully"}, {status: 200})
    } catch (error) {
        return NextResponse.json({success: false, message: "Internal server error"}, {status: 500})
    }
}