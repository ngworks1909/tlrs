import { NEXT_AUTH_CONFIG } from "@/lib/auth";
import { updateInput, UpdateInput } from "@/zod/validateUser";
import prisma from "@repo/db/client";
import { getServerSession } from "next-auth";
import { NextRequest, NextResponse } from "next/server";

export async function PUT(req: NextRequest) {
  try {
    const session = await getServerSession(NEXT_AUTH_CONFIG);
    const adminId = session?.user?.id;

    if(!adminId){
      return NextResponse.json({ success: false, error: "Unauthorized" });
    }

    const data = await req.json();
    const validUpdate = updateInput.safeParse(data);
    if (!validUpdate.success) {
      return NextResponse.json({ success: false, error: "Bad credentials" });
    }
    const { url, name, mobile }: UpdateInput = data;
    await prisma.admin.update({
      where: {
        adminId,
      },
      data: {
        image: url,
        adminName: name,
        mobile,
      },
    });
    return NextResponse.json({ success: true, message: "User updated successfully" });
  } catch (error) {
    return NextResponse.json({ success: false, error: "Internal server error" });
  }
}
