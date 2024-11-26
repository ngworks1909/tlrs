import { NextResponse } from "next/server"

import { NEXT_AUTH_CONFIG } from "@/lib/auth"
import { getServerSession } from "next-auth"
import { validateOrder } from "@/zod/validateOrder";
import prisma from "@repo/db/client";
import { Measurement } from "@/components/orders/CreateOrder";
import crypto from 'crypto';

function generateRandomString(length = 8) {
    const characters = '123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ';
    const charactersLength = characters.length;
  
    // Generate random bytes using crypto
    const randomValues = crypto.getRandomValues(new Uint8Array(length));
  
    // Map random bytes to characters
    return Array.from(randomValues, (value) => characters[value % charactersLength]).join('');
  }
  

export async function POST(request: Request) {
    const body = await request.json()
    try {
        const session = await getServerSession(NEXT_AUTH_CONFIG);
        const adminId = session?.user?.id
        if(!adminId) {
            return NextResponse.json({ success: false, message: "Unauthorized" }, { status: 401 })
        }
        const orderValidation = validateOrder.safeParse(body)
        if(orderValidation.success){
            return NextResponse.json({ success: false, message: "Invalid order data" }, { status: 400 })
        }
        const {serviceId, optionId, measurements, amountPaid, mobile} = body;
        const user = await prisma.user.findUnique({
            where:{
                mobile
            }
        })
        if(!user){
            return NextResponse.json({ success: false, message: "User not found" }, { status: 403 })
        }
        const service = await prisma.service.findUnique({
            where: {
                serviceId
            },
            select: {
                serviceId: true
            }
        })
        if(!service){
            return NextResponse.json({ success: false, message: "Service not found" }, { status: 403 })
        }
        const option = await prisma.option.findUnique({
            where: {
                optionId
            },
            select:{
                optionId: true,
                price: true
            }
        })
        if(!option){
            return NextResponse.json({ success: false, message: "Option not found" }, { status: 403 })
        }
        const paidAmount = parseFloat(amountPaid)

        if(paidAmount > option.price){
            return NextResponse.json({ success: false, message: "Paid amount is greater than the option price" }, { status: 403 })
        }

        const orderId = generateRandomString()
        const order = await prisma.order.create({
            data:{
                orderId,
                adminId,
                userId: user.userId,
                serviceId,
                optionId,
                amountPaid: paidAmount,
                measurements: {
                    create: measurements.map((measurement: Measurement) => ({
                      type: measurement.type,
                      value: measurement.value,
                    })),
                },
                
            }
        })
        return NextResponse.json({ success: true, message: "Order created successfully", order }, { status: 200 })
    } catch (error) {
        return NextResponse.json({ success: false, message: "Internal server error" }, { status: 500 })
    }
}