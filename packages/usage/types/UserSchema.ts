import { z } from 'zod'
import * as utils from './utils'
import * as enums from './enums'

export const UserCreateSchema = z.object({
  email: z.string(),
  name: z.string().nullish().optional(),
  notification_type: enums.NotificationTypeEnum,
})

export type UserCreate = z.infer<typeof UserCreateSchema>

export const UserUpdateSchema = UserCreateSchema.partial()

export type UserUpdate = z.infer<typeof UserUpdateSchema>
