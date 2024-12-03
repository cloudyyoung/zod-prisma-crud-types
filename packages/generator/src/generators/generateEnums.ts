import { DMMF } from '@prisma/generator-helper'
import { Config, getZodEnum, writeFileSafely } from '../utils'
import path from 'path'

export const generateEnums = async (
  enums: DMMF.DatamodelEnum[],
  config: Config,
) => {
  const content = `
    import { z } from 'zod'

    ${enums.map(getZodEnum).join('\n')}
  `

  const filePath = path.join(config.outputFolder, `enums.ts`)
  await writeFileSafely(filePath, content)
}
