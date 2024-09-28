import { z } from 'zod';
import { ObjectId, WithId } from 'mongodb';
import { EEntityType } from '@/types/EEntityType';

export const Notification = z.object({
  userId: z.string(), // The user receiving the notification
  entityId: z.string(), // Could be a horse, race, or person (trainer/jockey)
  entityType: z.nativeEnum(EEntityType), // Type of entity triggering the notification
  message: z.string(), // Notification message
  read: z.boolean().default(false), // Whether the notification has been read
});

export const NotificationPartial = Notification.partial();

export type Notification = z.infer<typeof Notification>;
export type NotificationWithId = WithId<Notification> & {
  _id: ObjectId;
  createdAt: Date;
  updatedAt: Date;
};
export type NotificationPartial = z.infer<typeof NotificationPartial>;
