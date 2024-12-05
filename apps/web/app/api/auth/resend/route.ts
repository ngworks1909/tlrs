import publisher from "@/lib/publisher";
import rateLimitter from "@/lib/ratelimit";
import prisma from "@repo/db/client";
import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";

export async function POST(req: NextRequest) {
    try {
        const data = await req.json();
        const emailVerify = z.object({email: z.string().email()}).safeParse(data);
        if(!emailVerify.success){
            return NextResponse.json({success: false, message: 'Invalid credentials'}, {status: 400})
        }
        const {email} = emailVerify.data;
        const ipAddress = ` ${req.ip ?? 'unknown'}`;
        if(!await rateLimitter.hasResendLimit(ipAddress, email)){
            return NextResponse.json({
                success: false,
                message: 'Too many requests, please try again after 30 minutes.',
            }, { status: 429 });
        }
        const normalizedEmail = email.toLocaleLowerCase()
        const existingUser = await prisma.user.findUnique({
            where: {
                email: normalizedEmail
            },
            select: {
                userId: true
            }
        });
        if(existingUser){
            return NextResponse.json({success: false, message: 'User with this email already exists'}, {status: 400})
        }
        const message = JSON.stringify({email: normalizedEmail})
        publisher.publish('send-mail', message);
        return NextResponse.json({success: true, message: 'We have sent a new OTP to your mail'})
    } catch (error) {
        return NextResponse.json({success: false, message: 'Internal server error'}, {status: 500})
    }

}