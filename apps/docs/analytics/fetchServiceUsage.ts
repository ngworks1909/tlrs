import { startOfMonth } from 'date-fns';
import prisma from '@repo/db/client';  // Adjust import based on your setup

export async function fetchServiceUsage() {
  // Get the start of the current month and today's date
  const startDate = startOfMonth(new Date());
  const currentDate = new Date(); // Today's date

  // Group orders by serviceId and get the count of orders
  const serviceUsageCounts = await prisma.order.groupBy({
    by: ['serviceId'],
    _count: {
      orderId: true,
    },
    where: {
      createdOn: {
        gte: startDate, // Start of the current month
        lte: currentDate, // Today's date
      },
    },
    orderBy: {
      _count: {
        orderId: 'desc',
      },
    },
  });

  // Fetch the service names based on serviceId and enrich the data
  const enrichedServiceCounts = await Promise.all(
    serviceUsageCounts.map(async (item) => {
      const service = await prisma.service.findUnique({
        where: { serviceId: item.serviceId },
        select: { serviceName: true },
      });

      return {
        serviceName: service?.serviceName,  // Service name
        orderCount: item._count.orderId,    // Order count
      };
    })
  );

  return enrichedServiceCounts;  // Return the enriched service counts
}

