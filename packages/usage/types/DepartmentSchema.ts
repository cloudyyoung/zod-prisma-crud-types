import { z } from 'zod'
import { JsonSchema } from './utils'

export const DepartmentCreateSchema = z.object({
  name: z.string(),
  display_name: z.string(),
  code: z.string(),
  is_active: z.boolean(),
})

export type DepartmentCreate = z.infer<typeof DepartmentCreateSchema>

export const DepartmentUpdateSchema = DepartmentCreateSchema.partial()

export type DepartmentUpdate = z.infer<typeof DepartmentUpdateSchema>
