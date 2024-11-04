import prisma from "@repo/db/client";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest){
    const body = await req.json();
    const {serviceId} = body;
    await prisma.option.createMany({
        data: [
            {
                optionName: "NITRO",
                image: "https://firebasestorage.googleapis.com/v0/b/tlrs-893dc.appspot.com/o/nitro.jpeg?alt=media&token=fcdd7b67-06fe-4cf5-b928-30665e534de5",
                duration: 1,
                price: 1449,
                priority: 1,
                remaining: 0,
                serviceId
            },
            {
                optionName: "EXPRESS",
                image: "https://firebasestorage.googleapis.com/v0/b/tlrs-893dc.appspot.com/o/bus.jpeg?alt=media&token=2c798494-c7c0-4c7b-99a7-1e5bb348faf0",
                duration: 1,
                price: 1349,
                priority: 1,
                remaining: 0,
                serviceId
            },
            {
                optionName: "SWIFT",
                image: "https://firebasestorage.googleapis.com/v0/b/tlrs-893dc.appspot.com/o/swift.jpeg?alt=media&token=bb02c971-cdd0-496a-a31b-60e7d01c2a7e",
                duration: 1,
                price: 1149,
                priority: 1,
                remaining: 0,
                serviceId
            },
            {
                optionName: "RABBIT",
                image: "https://firebasestorage.googleapis.com/v0/b/tlrs-893dc.appspot.com/o/rabbit.jpeg?alt=media&token=cb33244f-6eff-4b65-a6b3-7c754c8ec774",
                duration: 1,
                price: 949,
                priority: 1,
                remaining: 0,
                serviceId
            },
            
            // Add more options here as needed
        ]
    });
    return NextResponse.json({success: true, message: 'Push successful'})
}