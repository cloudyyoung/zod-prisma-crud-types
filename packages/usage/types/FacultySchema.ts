import { z } from 'zod'
import { JsonSchema } from './utils'

export const FacultyCreateSchema = z.object({
  name: z.string(),
  code: z.string(),
})

export type FacultyCreate = z.infer<typeof FacultyCreateSchema>

export const FacultyUpdateSchema = FacultyCreateSchema.partial()

export type FacultyUpdate = z.infer<typeof FacultyUpdateSchema>
