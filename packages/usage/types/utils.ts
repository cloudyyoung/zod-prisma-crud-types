import { z } from 'zod'
import { Prisma } from '@prisma/client'

export const LiteralSchema = z.union([z.string(), z.number(), z.boolean()])
export type Literal = z.infer<typeof LiteralSchema>
export const JsonSchema: z.ZodType<Prisma.InputJsonValue> = z.lazy(() =>
  z.union([LiteralSchema, z.array(JsonSchema), z.record(JsonSchema)]),
)
export type Json = z.infer<typeof JsonSchema>
