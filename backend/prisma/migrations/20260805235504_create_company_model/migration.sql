/*
  Warnings:

  - Added the required column `businessType` to the `Company` table without a default value. This is not possible if the table is not empty.
  - Added the required column `updatedAt` to the `Company` table without a default value. This is not possible if the table is not empty.

*/
-- CreateEnum
CREATE TYPE "BusinessType" AS ENUM ('JUNK_REMOVAL', 'HVAC', 'PLUMBING', 'ELECTRICAL', 'LANDSCAPING', 'CLEANING', 'GENERAL_SERVICE', 'OTHER');

-- CreateEnum
CREATE TYPE "CompanyStatus" AS ENUM ('ACTIVE', 'SUSPENDED', 'CANCELLED', 'TRIAL');

-- CreateEnum
CREATE TYPE "SubscriptionPlan" AS ENUM ('TRIAL', 'STARTER', 'PROFESSIONAL', 'ENTERPRISE');

-- AlterTable
ALTER TABLE "Company" ADD COLUMN     "businessType" "BusinessType" NOT NULL,
ADD COLUMN     "email" TEXT,
ADD COLUMN     "phone" TEXT,
ADD COLUMN     "quickbooksRealmId" TEXT,
ADD COLUMN     "status" "CompanyStatus" NOT NULL DEFAULT 'ACTIVE',
ADD COLUMN     "stripeCustomerId" TEXT,
ADD COLUMN     "subscriptionPlan" "SubscriptionPlan" NOT NULL DEFAULT 'TRIAL',
ADD COLUMN     "timezone" TEXT NOT NULL DEFAULT 'America/Denver',
ADD COLUMN     "updatedAt" TIMESTAMP(3) NOT NULL,
ADD COLUMN     "website" TEXT;

-- CreateIndex
CREATE INDEX "Company_businessType_idx" ON "Company"("businessType");

-- CreateIndex
CREATE INDEX "Company_status_idx" ON "Company"("status");
