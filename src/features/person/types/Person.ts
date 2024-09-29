import { ELivingStatus } from '@/types/ELivingStatus';
import { ObjectId, WithId } from 'mongodb';
import { z } from 'zod';
import { EPersonType } from './EPersonType';

export const Person = z.object({
  firstName: z.string(),
  lastName: z.string(),
  role: z.nativeEnum(EPersonType),
  dateOfBirth: z.date().optional(),
  status: z.nativeEnum(ELivingStatus),
  photoUrl: z.string().url().optional(),
  stats: z
    .object({
      wins: z.number().default(0),
      races: z.number().default(0),
    })
    .optional(),
  horsesInStable: z.array(z.string()).default([]), // Horse IDs
  location: z.string().optional(),
});

export const PersonPartial = Person.partial();

export type Person = z.infer<typeof Person>;
export type PersonWithId = WithId<Person> & {
  _id: ObjectId;
  createdAt: Date;
  updatedAt: Date;
};
export type PersonPartial = z.infer<typeof PersonPartial>;
