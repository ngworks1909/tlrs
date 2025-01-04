import prisma from "@repo/db/client";
import { signupInput } from "@/zod/validateUser";
import { NextRequest, NextResponse } from "next/server";
import bcrypt from 'bcryptjs'
import rateLimitter from "@/lib/ratelimit";




export async function POST(req: NextRequest){
    
    try {
        const ipAddress = ` ${req.ip ?? 'unknown'}`;
        if(!await rateLimitter.hasRegisterLimit(ipAddress)){
            return NextResponse.json({
                success: false,
                message: 'Too many requests, please try again after 5 minutes.',
            }, { status: 429 });
        }

        const body = await req.json();
        const signupSuccess = signupInput.safeParse(body);
        if(!signupSuccess.success){
            return NextResponse.json({success: false, message: "Invalid inputs"})
        }
        const {username, authId, password, mobile} = signupSuccess.data;
        const authUser = await prisma.authenticator.findUnique({
            where: {
                authId
            },
            select: {
                email: true
            }
        });
        if(!authUser){
            return NextResponse.json({success: false, message: 'Something went wrong. Please try again.'})
        }
        const normalizedEmail = authUser.email.toLocaleLowerCase();
        const existingUser = await prisma.user.findFirst({
            where: {
                OR: [{ email: normalizedEmail }, { mobile }]
            },
            select: {
                email: true,
                mobile: true
            }
        });
        
        if (existingUser) {
            const message = existingUser.email === normalizedEmail
                ? 'User with this email already exists'
                : 'User with this mobile number already exists';
            return NextResponse.json({ success: false, message }, { status: 400 });
        }
        const salt = await bcrypt.genSalt(10);
        const hashedpassword = await bcrypt.hash(password, salt);
        //
        await prisma.$transaction(async(tx) => {
            await tx.user.create({
                data: {
                    username,
                    email: normalizedEmail,
                    password: hashedpassword,
                    mobile
                }
            });
            await tx.authenticator.delete({
                where: {
                    authId
                }
            })
        })
        
        return NextResponse.json({success: true, message: "Signup successful"});
    } catch (error) {
        return NextResponse.json({success: false, message: 'Internal server error'}, {status: 500});
    }
}