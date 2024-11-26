-- CreateEnum
CREATE TYPE "MeasurementType" AS ENUM ('LENGTH', 'CHEST', 'SHOULDER', 'HANDS', 'FRONT_LOOSE', 'WAIST', 'HIP', 'THIGHS_LOOSE', 'BOTTOM');

-- CreateTable
CREATE TABLE "Measurement" (
    "id" TEXT NOT NULL,
    "orderId" TEXT NOT NULL,
    "type" "MeasurementType" NOT NULL,
    "value" DOUBLE PRECISION NOT NULL,

    CONSTRAINT "Measurement_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Measurement" ADD CONSTRAINT "Measurement_orderId_fkey" FOREIGN KEY ("orderId") REFERENCES "Order"("orderId") ON DELETE RESTRICT ON UPDATE CASCADE;
