import { z } from 'zod';
import { ObjectId, WithId } from 'mongodb';
import { ELivingStatus } from './ELivingStatus';
import { ESex } from './ESex';
import { EDistanceTag } from './EDistanceTag';

// Horse Schema
// Horses don't know about races, sales, or performances. They are just horses.
export const Horse = z.object({
  name: z.string(),
  color: z.string().optional(),
  height: z.number().optional(),
  sex: z.nativeEnum(ESex),
  age: z.number(),
  dateOfBirth: z.date().optional(),
  status: z.nativeEnum(ELivingStatus),
  wins: z.number().default(0),
  distanceTag: z.nativeEnum(EDistanceTag).optional(), // Stamina, speed etc.
  speedFigures: z.number().array().optional(), // todo:@stacey ??? Timeform ratings etc.
  pedigree: z.string().optional(), // Pedigree relationship
  trainerId: z.string().optional(), // Trainer relationship
  jockeyId: z.string().optional(), // Jockey relationship
});

export const HorsePartial = Horse.partial();

export type Horse = z.infer<typeof Horse>;
export type HorseWithId = WithId<Horse> & {
  _id: ObjectId;
  createdAt: Date;
  updatedAt: Date;
};
export type HorsePartial = z.infer<typeof HorsePartial>;
