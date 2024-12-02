import { z } from 'zod'

export const UserCreateSchema = z.object({
  email: z.string(),
  name: z.string().optional(),
  notification_type: z.unknown(),
})

export type UserCreate = z.infer<typeof UserCreateSchema>

export const UserUpdateSchema = UserCreateSchema.partial()

export type UserUpdate = z.infer<typeof UserUpdateSchema>
