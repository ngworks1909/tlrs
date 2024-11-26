import { NextResponse } from 'next/server';
import prisma from '@repo/db/client';
import { getServerSession } from 'next-auth';
import { NEXT_AUTH_CONFIG } from '@/lib/auth';

export async function GET(req: Request) {
  const session = await getServerSession(NEXT_AUTH_CONFIG);
  const adminId = session.user.id;
  if(!adminId){
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }
  const { searchParams } = new URL(req.url);
  const page = parseInt(searchParams.get('page') ?? '1');
  const pageSize = parseInt(searchParams.get('pageSize') ?? '20');

  const skip = (page - 1) * pageSize;

  try {
    // Fetch orders with pagination and include related data
    const orders = await prisma.order.findMany({
      where:{adminId},
      skip,
      take: pageSize,
      include: {
        service: { select: { image: true, serviceName: true } },
        option: { select: { image: true, optionName: true, price: true, priority: true } },
        assignedAdmin: { select: { adminName: true, mobile: true } },
        measurements: { select: { type: true, value: true } },
      },
    });

    // Separate and sort orders by status
    const pendingOrders = orders.filter(order => 
      order.orderStatus === 'pending' || order.orderStatus === 'started'
    ).sort((a, b) => a.option.priority - b.option.priority || a.createdOn.getTime() - b.createdOn.getTime());

    const completedOrders = orders.filter(order =>
      ['stitched', 'cancelled', 'delivered'].includes(order.orderStatus)
    ).sort((a, b) => b.createdOn.getTime() - a.createdOn.getTime());

    const sortedOrders = [...pendingOrders, ...completedOrders];

    return NextResponse.json({orders: sortedOrders});
  } catch (error) {
    return NextResponse.json({ error: 'Failed to fetch orders' }, { status: 500 });
  }
}
