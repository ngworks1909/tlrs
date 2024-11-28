import prisma from "@repo/db/client";
import { signupInput } from "@/zod/validateUser";
import { NextRequest, NextResponse } from "next/server";
import bcrypt from 'bcryptjs'

export async function POST(req: NextRequest){
    const body = await req.json();
    const signupSuccess = signupInput.safeParse(body);
    if(!signupSuccess){
        return NextResponse.json({success: false, error: "Invalid inputs"})
    }
    const {username, email, password, mobile} = body;
    try {
        const existingUser = await prisma.user.findFirst({
            where: {
                email
            },
            select: {
                userId: true
            }
        });
        if(existingUser) {
            return NextResponse.json({success: false, message: 'User already exists'}, {status: 400});
        }
        const existingMobile = await prisma.user.findFirst({
            where: {
                mobile
            }
        });
        if(existingMobile) {
            return NextResponse.json({success: false, message: 'Mobile number already exists'}, {status: 400});
        }
        const salt = await bcrypt.genSalt(10);
        const hashedpassword = await bcrypt.hash(password, salt);
        await prisma.user.create({
            data: {
                username,
                email,
                password: hashedpassword,
                mobile
            },
            select: {
                userId: true
            }
        });
        return NextResponse.json({success: true, message: "Signup successful"});
    } catch (error) {
        return NextResponse.json({success: false, message: 'Internal server error'}, {status: 500});
    }
}