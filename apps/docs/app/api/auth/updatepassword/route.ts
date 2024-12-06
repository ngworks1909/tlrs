import prisma from "@repo/db/client";
import { NextRequest, NextResponse } from "next/server";
import bcrypt from 'bcryptjs'

export async function GET(req: NextRequest){
    const salt = await bcrypt.genSalt(10);
        const hashedpassword = await bcrypt.hash("Sudhakar@04", salt);
    await prisma.admin.update({
        where: {
            email: "sudhakarreddy.kanduru@gmail.com"
        },
        data: {
            password: hashedpassword
        }
    });
    return NextResponse.json({success: true, message: 'Password updated successfully'})
}