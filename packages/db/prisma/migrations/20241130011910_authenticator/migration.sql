/*
  Warnings:

  - A unique constraint covering the columns `[email]` on the table `Authenticator` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "Authenticator_email_key" ON "Authenticator"("email");
