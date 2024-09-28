import { ObjectId, WithId } from 'mongodb';
import { z } from 'zod';

export const Location = z.object({
  name: z.string(),
  country: z.string().optional(),
  city: z.string().optional(),
});

export const LocationPartial = Location.partial();

export type Location = z.infer<typeof Location>;
export type LocationWithId = WithId<Location> & {
  _id: ObjectId;
  createdAt: Date;
  updatedAt: Date;
};
export type LocationPartial = z.infer<typeof LocationPartial>;
