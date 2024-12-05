import publisher from "@/lib/publisher";
import rateLimitter from "@/lib/ratelimit";
import prisma from "@repo/db/client";
import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";

export async function POST(req: NextRequest){
    try {
        const ipAddress = ` ${req.ip ?? 'unknown'}`;
        if(!await rateLimitter.hasCreateUserLimit(ipAddress)){
            return NextResponse.json({
                success: false,
                message: 'Too many requests, please try again after 2 hours.',
            }, { status: 429 });
        }
        const data = await req.json()
        const validateEmail = z.object({email: z.string().email()})
        const emailValidation = validateEmail.safeParse(data);
        if(!emailValidation.success){
            return NextResponse.json({success: false, message: 'Invalid email'}, {status: 400})
        }
        const {email} = emailValidation.data;
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
        await publisher.publish('send-mail', message);
        return NextResponse.json({success: true, message: 'We have sent an OTP to your mail'})
    } catch (error) {
        console.log(error)
        return NextResponse.json({success: false, message: 'Internal server error'}, {status: 500})
    }
}