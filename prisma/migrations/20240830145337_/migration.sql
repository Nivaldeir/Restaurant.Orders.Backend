-- AlterTable
ALTER TABLE "Ingredient" ADD COLUMN     "saleProductId" UUID;

-- AddForeignKey
ALTER TABLE "Ingredient" ADD CONSTRAINT "Ingredient_saleProductId_fkey" FOREIGN KEY ("saleProductId") REFERENCES "SaleProduct"("id") ON DELETE SET NULL ON UPDATE CASCADE;
