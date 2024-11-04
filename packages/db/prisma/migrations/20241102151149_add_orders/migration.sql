-- CreateEnum
CREATE TYPE "OrderStatus" AS ENUM ('pending', 'started', 'stitched', 'delivered', 'cancelled');

-- CreateTable
CREATE TABLE "Order" (
    "orderId" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "serviceId" TEXT NOT NULL,
    "optionId" TEXT NOT NULL,
    "createdOn" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "deliveredOn" TIMESTAMP(3),
    "orderStatus" "OrderStatus" NOT NULL DEFAULT 'pending',
    "reason" TEXT,
    "amountPaid" DOUBLE PRECISION NOT NULL DEFAULT 0,

    CONSTRAINT "Order_pkey" PRIMARY KEY ("orderId")
);

-- AddForeignKey
ALTER TABLE "Order" ADD CONSTRAINT "Order_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("userId") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Order" ADD CONSTRAINT "Order_serviceId_fkey" FOREIGN KEY ("serviceId") REFERENCES "Service"("serviceId") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Order" ADD CONSTRAINT "Order_optionId_fkey" FOREIGN KEY ("optionId") REFERENCES "Option"("optionId") ON DELETE RESTRICT ON UPDATE CASCADE;
