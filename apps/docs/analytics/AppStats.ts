import prisma from "@repo/db/client";

export async function fetchAppStats(){
  const currentYear = new Date().getFullYear();
  // Fetch the count of orders per month for the current year
  const monthlyOrders = await prisma.order.groupBy({
    by: ['createdOn'],
    _count: {
      orderId: true,
    },
    where: {
      createdOn: {
        gte: new Date(currentYear, 0, 1),  // Start of the year
        lt: new Date(currentYear + 1, 0, 1),  // End of the year
      },
    },
    orderBy: {
      createdOn: 'asc',  // Ensure months are ordered from January to December
    },
  });

  // Calculate growth rates month-to-month
  const growthRates = [];
  for (let i = 1; i < monthlyOrders.length; i++) {
    const prevMonthCount = monthlyOrders[i - 1]._count.orderId;
    const currentMonthCount = monthlyOrders[i]._count.orderId;
    const growthRate = prevMonthCount === 0 ? 0 : ((currentMonthCount - prevMonthCount) / prevMonthCount) * 100;
    growthRates.push({
      month: monthlyOrders[i].createdOn.getMonth() + 1,
      growthRate,
    });
  }

  return growthRates;

}