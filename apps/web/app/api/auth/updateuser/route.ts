import { NEXT_AUTH_CONFIG } from "@/lib/auth";
import { updateInput, UpdateInput } from "@/zod/validateUser";
import prisma from "@repo/db/client";
import { getServerSession } from "next-auth";
import { NextRequest, NextResponse } from "next/server";

export async function PUT(req: NextRequest) {
  try {
    const session = await getServerSession(NEXT_AUTH_CONFIG);
    const userId = session.user.id;

    const data = await req.json();
    const validUpdate = updateInput.safeParse(data);
    if (!validUpdate.success) {
      return NextResponse.json({ success: false, error: "Bad credentials" });
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
    return NextResponse.json({ success: false, error: "Internal server error" });
  }
}
