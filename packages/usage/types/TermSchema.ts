import { z } from 'zod'
import * as utils from './utils'
import * as enums from './enums'

export const TermCreateSchema = z.object({
  term_id: z.string(),
  year: z.number(),
  name: enums.TermNameEnum,
})

export type TermCreate = z.infer<typeof TermCreateSchema>

export const TermUpdateSchema = TermCreateSchema.partial()

export type TermUpdate = z.infer<typeof TermUpdateSchema>
