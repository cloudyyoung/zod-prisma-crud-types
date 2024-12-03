import { DMMF } from '@prisma/generator-helper'
import { getZodSchema, writeFileSafely } from '../utils'
import path from 'path'
import { Config } from '../utils'

export const generateSchemas = async (models: DMMF.Model[], config: Config) => {
  const schemas = models.map((model) => {
    const schema = getZodSchema(model, config.ignoredFieldNames)
    return `
      /**
       *
       * ${model.name}
       * 
       */
      ${schema}
    `
  })
  const content = `
    import { z } from 'zod';
    import * as utils from './utils';
    import * as enums from './enums';

    ${schemas.join('\n\n')}
  `

  const filePath = path.join(config.outputFolder, `schemas.ts`)
  await writeFileSafely(filePath, content)
}
