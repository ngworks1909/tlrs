import { validateUpdateOrder } from "@/zod/validateOrder"
import prisma from "@repo/db/client"
import { NextRequest, NextResponse } from "next/server"

export async function POST(req: NextRequest){
    try {
        const body = await req.json()
        const validatedData = validateUpdateOrder.safeParse(body)
        if(!validatedData.success) return NextResponse.json({error: validatedData.error.errors}, {status: 400})
        const {orderId, amountPaid, orderStatus, measurements} = validatedData.data;
        const order = await prisma.order.findUnique({
            where: {orderId},
            select: {
                option: {
                    select: {
                        price: true
                    }
                }
            }
        })
        if(!order) return NextResponse.json({error: "Order not found"}, {status: 401});
        if(amountPaid > order.option.price) return NextResponse.json({error: "Amount paid is greater than the price of the option"}, {status: 401});
        if(amountPaid < order.option.price && orderStatus === 'delivered') return NextResponse.json({error: "Order cannot be delivered without full payment"}, {status: 401});
        await prisma.order.update({
            where: {orderId},
            data: {
                amountPaid,
                orderStatus,
                measurements:{
                    updateMany: measurements.map((measurement) => ({
                        where: {orderId},
                        data: {
                            type: measurement.type,
                            value: measurement.value
                        }
                    }))
                }
            }
        })
        return NextResponse.json({success: true, message: "Order updated successfully"}, {status: 200})
    } catch (error) {
        return NextResponse.json({success: false, error: "Internal server error"}, {status: 500})
    }
}