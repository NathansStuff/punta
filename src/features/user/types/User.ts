import { ObjectId, WithId } from 'mongodb';
import { z } from 'zod';

import { ETier } from './ETiers';
import { SubscriptionPlan } from './SubscriptionPlan';
import { EEntityType } from '@/types/EEntityType';

export const User = z.object({
  firstName: z.string(),
  lastName: z.string().optional(),
  displayName: z.string(),
  email: z.string().email(),
  imageUrl: z.string().url().optional(),
  stripeCustomerId: z.string().optional(),
  activeSubscription: z.boolean().default(false),
  accountTier: z.nativeEnum(ETier).optional(),
  subscriptionCancelDate: z.string().nullable().optional(),
  stripeSubscriptionId: z.string().optional(),
  isEmailVerified: z.boolean().default(false),
  oneTimePurchases: z.array(z.string()).default([]), // stripe productIds
  currentPlan: SubscriptionPlan.nullable(),
  // Watched entities
  watched: z
    .array(
      z.object({
        entityId: z.string(), // Could be a horse, race, person (trainer/jockey)
        entityType: z.nativeEnum(EEntityType), // Type of entity being watched
      })
    )
    .default([]), // Default to an empty array if no entities are being watched
});

export const UserPartial = User.partial();

export type User = z.infer<typeof User>;
export type UserWithId = WithId<User> & {
  _id: ObjectId;
  createdAt: Date;
  updatedAt: Date;
};
export type UserPartial = z.infer<typeof UserPartial>;
