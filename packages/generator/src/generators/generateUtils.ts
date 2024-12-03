import path from 'path'
import { Config, writeFileSafely } from '../utils'

export const generateUtils = async (config: Config) => {
  const content = `
    import { z } from "zod"

    export const LiteralSchema = z.union([z.string(), z.number(), z.boolean(), z.null()])
    export type Literal = z.infer<typeof LiteralSchema>
    export const JsonSchema: z.ZodType = z.lazy(() => z.union([LiteralSchema, z.array(JsonSchema), z.record(JsonSchema)]))
    export type Json = z.infer<typeof JsonSchema>
  `

  const filePath = path.join(config.outputFolder, `utils.ts`)
  await writeFileSafely(filePath, content)
}
