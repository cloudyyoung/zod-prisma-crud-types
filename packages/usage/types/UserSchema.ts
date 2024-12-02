import { z } from 'zod'
import { JsonSchema } from './utils'

export const UserCreateSchema = z.object({
  email: z.string(),
  name: z.string().nullish().optional(),
})

export type UserCreate = z.infer<typeof UserCreateSchema>

export const UserUpdateSchema = UserCreateSchema.partial()

export type UserUpdate = z.infer<typeof UserUpdateSchema>
