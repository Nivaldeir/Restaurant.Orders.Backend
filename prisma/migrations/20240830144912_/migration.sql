/*
  Warnings:

  - You are about to drop the column `orderId` on the `Order` table. All the data in the column will be lost.
  - You are about to drop the column `paymentId` on the `Order` table. All the data in the column will be lost.
  - You are about to drop the column `productId` on the `Order` table. All the data in the column will be lost.
  - You are about to drop the `OrderProductIngredient` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `ProductIngredient` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `TableOrder` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `startTimestamp` to the `Order` table without a default value. This is not possible if the table is not empty.
  - Added the required column `tableId` to the `Order` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "Order" DROP CONSTRAINT "Order_orderId_fkey";

-- DropForeignKey
ALTER TABLE "Order" DROP CONSTRAINT "Order_paymentId_fkey";

-- DropForeignKey
ALTER TABLE "Order" DROP CONSTRAINT "Order_productId_fkey";

-- DropForeignKey
ALTER TABLE "OrderProductIngredient" DROP CONSTRAINT "OrderProductIngredient_ingredientId_fkey";

-- DropForeignKey
ALTER TABLE "OrderProductIngredient" DROP CONSTRAINT "OrderProductIngredient_orderProductId_fkey";

-- DropForeignKey
ALTER TABLE "OrderProductIngredient" DROP CONSTRAINT "OrderProductIngredient_paymentId_fkey";

-- DropForeignKey
ALTER TABLE "ProductIngredient" DROP CONSTRAINT "ProductIngredient_ingredientId_fkey";

-- DropForeignKey
ALTER TABLE "ProductIngredient" DROP CONSTRAINT "ProductIngredient_productId_fkey";

-- DropForeignKey
ALTER TABLE "TableOrder" DROP CONSTRAINT "TableOrder_paymentId_fkey";

-- DropForeignKey
ALTER TABLE "TableOrder" DROP CONSTRAINT "TableOrder_tableId_fkey";

-- AlterTable
ALTER TABLE "Order" DROP COLUMN "orderId",
DROP COLUMN "paymentId",
DROP COLUMN "productId",
ADD COLUMN     "endTimestamp" TIMESTAMP(3),
ADD COLUMN     "startTimestamp" TIMESTAMP(3) NOT NULL,
ADD COLUMN     "tableId" UUID NOT NULL,
ALTER COLUMN "status" SET DATA TYPE TEXT;

-- AlterTable
ALTER TABLE "Payment" ALTER COLUMN "method" SET DATA TYPE TEXT;

-- DropTable
DROP TABLE "OrderProductIngredient";

-- DropTable
DROP TABLE "ProductIngredient";

-- DropTable
DROP TABLE "TableOrder";

-- CreateTable
CREATE TABLE "SaleProduct" (
    "id" UUID NOT NULL,
    "quantity" INTEGER NOT NULL,
    "amount" DOUBLE PRECISION NOT NULL,
    "productId" UUID NOT NULL,
    "orderId" UUID,

    CONSTRAINT "SaleProduct_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "SaleProduct" ADD CONSTRAINT "SaleProduct_productId_fkey" FOREIGN KEY ("productId") REFERENCES "Product"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "SaleProduct" ADD CONSTRAINT "SaleProduct_orderId_fkey" FOREIGN KEY ("orderId") REFERENCES "Order"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Order" ADD CONSTRAINT "Order_tableId_fkey" FOREIGN KEY ("tableId") REFERENCES "Table"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Payment" ADD CONSTRAINT "Payment_orderId_fkey" FOREIGN KEY ("orderId") REFERENCES "Order"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
