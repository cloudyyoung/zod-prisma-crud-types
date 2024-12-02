import { z } from 'zod'
import * as utils from './utils'
import * as enums from './enums'

export const SubjectCreateSchema = z.object({
  code: z.string(),
  title: z.string(),
})

export type SubjectCreate = z.infer<typeof SubjectCreateSchema>

export const SubjectUpdateSchema = SubjectCreateSchema.partial()

export type SubjectUpdate = z.infer<typeof SubjectUpdateSchema>
