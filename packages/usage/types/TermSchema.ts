import { z } from 'zod'
import { JsonSchema } from './utils'

export const TermCreateSchema = z.object({
  term_id: z.string(),
  year: z.number(),
})

export type TermCreate = z.infer<typeof TermCreateSchema>

export const TermUpdateSchema = TermCreateSchema.partial()

export type TermUpdate = z.infer<typeof TermUpdateSchema>
