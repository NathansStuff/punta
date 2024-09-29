import { ObjectId, WithId } from 'mongodb';
import { z } from 'zod';
import { ERaceClass } from './ERaceClass';
import { ETrackCondition } from '@/types/ETrackConditon';

export const Race = z.object({
  name: z.string(),
  date: z.date(),
  locationId: z.string(),
  trackCondition: z.nativeEnum(ETrackCondition),
  horses: z.array(
    z.object({
      horseId: z.string(),
      barrierDraw: z.number().optional(),
      time: z.number().optional(),
      jockeyId: z.string().optional(),
      trainerId: z.string().optional(),
      finalPosition: z.number().optional(),
      weight: z.number().optional(),
    })
  ), // Horses with their performance in the race
  class: z.nativeEnum(ERaceClass),
  length: z.number(), // Length in meters
});

export const RacePartial = Race.partial();

export type Race = z.infer<typeof Race>;
export type RaceWithId = WithId<Race> & {
  _id: ObjectId;
  createdAt: Date;
  updatedAt: Date;
};
export type RacePartial = z.infer<typeof RacePartial>;
