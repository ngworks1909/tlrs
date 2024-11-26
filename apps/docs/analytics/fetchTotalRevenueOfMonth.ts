import { NEXT_AUTH_CONFIG } from "@/lib/auth";
import prisma from "@repo/db/client";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";

export async function fetTotalRevenueOfMonth(){
  const session = await getServerSession(NEXT_AUTH_CONFIG);
  if(!session || !session.user || !session.user.id){
    redirect('/login')
  }
  const adminId = session.user.id

  const startOfMonth = new Date(new Date().getFullYear(), new Date().getMonth(), 1);

  // Fetch the total revenue for the given admin in the current month
  const totalRevenue = await prisma.order.aggregate({
    _sum: {
      amountPaid: true,
    },
    where: {
      adminId,
      createdOn: {
        gte: startOfMonth,
        lte: new Date(),  // Ensure we only get orders up to the current date
      },
    },
  });

  return totalRevenue._sum.amountPaid ?? 0;
      
}