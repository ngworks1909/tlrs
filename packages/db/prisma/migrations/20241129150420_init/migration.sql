-- CreateTable
CREATE TABLE "Authenticator" (
    "verificationId" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "oobCode" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "expiresAt" TIMESTAMP(3) NOT NULL,
    "verified" BOOLEAN NOT NULL DEFAULT false,

    CONSTRAINT "Authenticator_pkey" PRIMARY KEY ("verificationId")
);

-- CreateIndex
CREATE UNIQUE INDEX "Authenticator_oobCode_key" ON "Authenticator"("oobCode");
