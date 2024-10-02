/*
  Warnings:

  - Added the required column `paymentId` to the `Order` table without a default value. This is not possible if the table is not empty.
  - Added the required column `paymentId` to the `OrderProductIngredient` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "Payment" DROP CONSTRAINT "Payment_orderId_fkey";

-- AlterTable
ALTER TABLE "Order" ADD COLUMN     "paymentId" UUID NOT NULL;

-- AlterTable
ALTER TABLE "OrderProductIngredient" ADD COLUMN     "paymentId" UUID NOT NULL;

-- AddForeignKey
ALTER TABLE "OrderProductIngredient" ADD CONSTRAINT "OrderProductIngredient_paymentId_fkey" FOREIGN KEY ("paymentId") REFERENCES "Payment"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
