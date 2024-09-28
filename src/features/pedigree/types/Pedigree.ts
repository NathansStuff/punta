import { z } from 'zod';
import { ObjectId, WithId } from 'mongodb';

export const Pedigree = z.object({
  horseId: z.string(), // Reference to the horse
  fatherId: z.string().optional(), // Horse's father
  motherId: z.string().optional(), // Horse's mother
  children: z.array(z.string()).optional(), // Offspring horse IDs
  siblings: z.array(z.string()).optional(), // Sibling horse IDs
});

export const PedigreePartial = Pedigree.partial();

export type Pedigree = z.infer<typeof Pedigree>;
export type PedigreeWithId = WithId<Pedigree> & {
  _id: ObjectId;
  createdAt: Date;
  updatedAt: Date;
};
export type PedigreePartial = z.infer<typeof PedigreePartial>;
