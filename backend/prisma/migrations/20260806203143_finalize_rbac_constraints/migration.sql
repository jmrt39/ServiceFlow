/*
  Warnings:

  - You are about to drop the column `businessType` on the `Company` table. All the data in the column will be lost.
  - You are about to drop the column `createdAt` on the `Company` table. All the data in the column will be lost.
  - You are about to drop the column `email` on the `Company` table. All the data in the column will be lost.
  - You are about to drop the column `phone` on the `Company` table. All the data in the column will be lost.
  - You are about to drop the column `quickbooksRealmId` on the `Company` table. All the data in the column will be lost.
  - You are about to drop the column `status` on the `Company` table. All the data in the column will be lost.
  - You are about to drop the column `stripeCustomerId` on the `Company` table. All the data in the column will be lost.
  - You are about to drop the column `subscriptionPlan` on the `Company` table. All the data in the column will be lost.
  - You are about to drop the column `timezone` on the `Company` table. All the data in the column will be lost.
  - You are about to drop the column `updatedAt` on the `Company` table. All the data in the column will be lost.
  - You are about to drop the column `website` on the `Company` table. All the data in the column will be lost.
  - You are about to drop the column `createdAt` on the `Role` table. All the data in the column will be lost.
  - You are about to drop the column `createdAt` on the `RolePermission` table. All the data in the column will be lost.
  - You are about to drop the column `createdAt` on the `UserRole` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[companyId,name]` on the table `Role` will be added. If there are existing duplicate values, this will fail.

*/
-- DropForeignKey
ALTER TABLE "Role" DROP CONSTRAINT "Role_companyId_fkey";

-- DropIndex
DROP INDEX "Company_businessType_idx";

-- DropIndex
DROP INDEX "Company_status_idx";

-- DropIndex
DROP INDEX "Role_companyId_idx";

-- DropIndex
DROP INDEX "Role_name_key";

-- AlterTable
ALTER TABLE "Company" DROP COLUMN "businessType",
DROP COLUMN "createdAt",
DROP COLUMN "email",
DROP COLUMN "phone",
DROP COLUMN "quickbooksRealmId",
DROP COLUMN "status",
DROP COLUMN "stripeCustomerId",
DROP COLUMN "subscriptionPlan",
DROP COLUMN "timezone",
DROP COLUMN "updatedAt",
DROP COLUMN "website";

-- AlterTable
ALTER TABLE "Role" DROP COLUMN "createdAt",
ADD COLUMN     "isSystemRole" BOOLEAN NOT NULL DEFAULT false;

-- AlterTable
ALTER TABLE "RolePermission" DROP COLUMN "createdAt";

-- AlterTable
ALTER TABLE "UserRole" DROP COLUMN "createdAt";

-- CreateIndex
CREATE UNIQUE INDEX "Role_companyId_name_key" ON "Role"("companyId", "name");

-- AddForeignKey
ALTER TABLE "Role" ADD CONSTRAINT "Role_companyId_fkey" FOREIGN KEY ("companyId") REFERENCES "Company"("id") ON DELETE CASCADE ON UPDATE CASCADE;
