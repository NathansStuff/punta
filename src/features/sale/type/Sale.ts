import { z } from 'zod';
import { ObjectId, WithId } from 'mongodb';

export const Sale = z.object({
  horseId: z.string(), // Reference to the horse being sold
  saleDate: z.date(), // Date of the sale
  price: z.number(), // Sale price
  buyerId: z.string().optional(), // Reference to the buyer (could be a user or external entity)
  sellerId: z.string().optional(), // Reference to the seller (could be a user or external entity)
  locationId: z.string().optional(), // Where the sale took place
});

export const SalePartial = Sale.partial();

export type Sale = z.infer<typeof Sale>;
export type SaleWithId = WithId<Sale> & {
  _id: ObjectId;
  createdAt: Date;
  updatedAt: Date;
};
export type SalePartial = z.infer<typeof SalePartial>;
