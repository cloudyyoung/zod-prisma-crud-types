import { z } from 'zod'

export type Json = { [key: string]: Json } | Json[]
export const JsonSchema: z.ZodType<Json> = z
  .lazy(() => z.union([z.array(JsonSchema), z.record(JsonSchema)]))
  .transform((val) => {
    return val ? JSON.parse(JSON.stringify(val)) : val
  })
