// actions/fetchOrders.ts
import prisma from "@repo/db/client";

export async function fetchOrders(page: number = 1, pageSize: number = 20) {
  const skip = (page - 1) * pageSize;

  // Step 1: Fetch all orders from the database
  const orders = await prisma.order.findMany({
    skip,
    take: pageSize,
    include: {
      service: {
        select: {
          image: true,
          serviceName: true,
        },
      },
      option: {
        select: {
          image: true,
          optionName: true,
          price: true,
          priority: true, // Option details
        },
      },
      assignedAdmin: {
        select: {
          adminName: true,
          mobile: true,
        },
      },
      measurements: {
        select: {
          type: true,
          value: true, // Measurement details for the order
        },
      },
    },
  });

  // Step 2: Separate orders by status
  const pendingOrders = orders.filter(order => 
    order.orderStatus === "pending" || order.orderStatus === "started"
  );

  const completedOrders = orders.filter(order => 
    order.orderStatus === "stitched" || 
    order.orderStatus === "cancelled" || 
    order.orderStatus === "delivered"
  );

  // Step 3: Sort pending orders by priority (ascending) and createdOn (ascending)
  pendingOrders.sort((a, b) => 
    a.option.priority - b.option.priority || a.createdOn.getTime() - b.createdOn.getTime()
  );

  // Step 4: Sort completed orders by createdOn (descending)
  completedOrders.sort((a, b) => 
    b.createdOn.getTime() - a.createdOn.getTime()
  );

  // Step 5: Combine pending and completed orders
  const sortedOrders = [...pendingOrders, ...completedOrders];

  return sortedOrders;
}
