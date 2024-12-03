import { DMMF } from '@prisma/generator-helper'
import { Config, writeFileSafely } from '../utils'
import path from 'path'

export const generateIndex = async (config: Config) => {
  const content = `
      export * from './schemas'
      export * from './enums'
      export * from './utils'
    `

  const filePath = path.join(config.outputFolder, `index.ts`)
  await writeFileSafely(filePath, content)
}
