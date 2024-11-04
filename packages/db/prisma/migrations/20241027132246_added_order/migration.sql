-- CreateEnum
CREATE TYPE "ServiceType" AS ENUM ('SHIRT', 'PANT', 'DRESS', 'KURTA', 'SAFARI');

-- CreateEnum
CREATE TYPE "OptionType" AS ENUM ('NITRO', 'EXPRESS', 'SWIFT', 'RABBIT');

-- CreateTable
CREATE TABLE "Service" (
    "serviceId" TEXT NOT NULL,
    "serviceName" "ServiceType" NOT NULL,
    "content" TEXT NOT NULL,
    "image" TEXT NOT NULL,

    CONSTRAINT "Service_pkey" PRIMARY KEY ("serviceId")
);

-- CreateTable
CREATE TABLE "Option" (
    "optionId" TEXT NOT NULL,
    "optionName" "OptionType" NOT NULL,
    "image" TEXT NOT NULL,
    "serviceId" TEXT NOT NULL,
    "duration" INTEGER NOT NULL,
    "price" DOUBLE PRECISION NOT NULL,
    "priority" INTEGER NOT NULL,
    "remaining" INTEGER NOT NULL,

    CONSTRAINT "Option_pkey" PRIMARY KEY ("optionId")
);

-- AddForeignKey
ALTER TABLE "Option" ADD CONSTRAINT "Option_serviceId_fkey" FOREIGN KEY ("serviceId") REFERENCES "Service"("serviceId") ON DELETE RESTRICT ON UPDATE CASCADE;
