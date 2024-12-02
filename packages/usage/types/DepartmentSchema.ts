import { z } from 'zod'
import * as utils from './utils'
import * as enums from './enums'

export const DepartmentCreateSchema = z.object({
  name: z.string(),
  display_name: z.string(),
  code: z.string(),
  is_active: z.boolean(),
})

export type DepartmentCreate = z.infer<typeof DepartmentCreateSchema>

export const DepartmentUpdateSchema = DepartmentCreateSchema.partial()

export type DepartmentUpdate = z.infer<typeof DepartmentUpdateSchema>
