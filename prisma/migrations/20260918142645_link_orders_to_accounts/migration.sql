-- Link an order to the Neon Auth account that placed it, so order history can
-- be matched on the account rather than on an unverified email address.
-- Nullable: guest checkouts have no account, and every existing order predates
-- this column.
ALTER TABLE "Order" ADD COLUMN     "userId" TEXT;

-- CreateIndex
CREATE INDEX "Order_userId_idx" ON "Order"("userId");
