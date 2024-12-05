import { NEXT_AUTH_CONFIG } from "@/lib/auth";
import rateLimitter from "@/lib/ratelimit";
import { updateInput, UpdateInput } from "@/zod/validateUser";
import prisma from "@repo/db/client";
import { getServerSession } from "next-auth";
import { NextRequest, NextResponse } from "next/server";

export async function PUT(req: NextRequest) {
  try {
    const ipAddress = req.ip ?? 'unknown'
    if(!await rateLimitter.hasUpdateUserLimit(ipAddress)){
      return NextResponse.json({
        success: false,
        message: 'Too many requests, please try again after 5 minutes.',
      }, { status: 429 });
    }
    const session = await getServerSession(NEXT_AUTH_CONFIG);
    const userId = session.user.id;

    if(!userId){
      return NextResponse.json({ success: false, message: 'Unauthorized' })
    }
    const data = await req.json();
    const validUpdate = updateInput.safeParse(data);
    if (!validUpdate.success) {
      return NextResponse.json({ success: false, message: "Bad credentials" });
    }
    const { url, name, mobile }: UpdateInput = data;
    await prisma.user.update({
      where: {
        userId,
      },
      data: {
        image: url,
        username: name,
        mobile,
      },
    });
    return NextResponse.json({ success: true, message: "User updated successfully" });
  } catch (error) {
    return NextResponse.json({ success: false, message: "Internal server error" });
  }
}
