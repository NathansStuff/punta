import { z } from 'zod';
import { ObjectId, WithId } from 'mongodb';

export const Statistics = z.object({
  horseId: z.string(), // Reference to the horse
  totalRaces: z.number().default(0), // Total number of races the horse has participated in
  totalWins: z.number().default(0), // Total number of wins
  totalPlaces: z.number().default(0), // Total number of places (e.g., top 3 finish)
  averagePosition: z.number().optional(), // Average finishing position across races
  averageSpeedFigure: z.number().optional(), // Average speed figure (e.g., timeform rating)
  bestRacePerformance: z
    .object({
      raceId: z.string(),
      position: z.number(),
      time: z.number().optional(),
    })
    .optional(), // The best race performance for the horse (optional)
  totalDistanceRun: z.number().optional(), // Total distance run across all races
  lastRaceDate: z.string().optional(), // Date of the horse's last race
});

export const StatisticsPartial = Statistics.partial();

export type Statistics = z.infer<typeof Statistics>;
export type StatisticsWithId = WithId<Statistics> & {
  _id: ObjectId;
  createdAt: Date;
  updatedAt: Date;
};
export type StatisticsPartial = z.infer<typeof StatisticsPartial>;
