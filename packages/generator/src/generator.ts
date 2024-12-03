import { generatorHandler, GeneratorOptions } from '@prisma/generator-helper'
import { logger } from '@prisma/sdk'
import { GENERATOR_NAME } from './constants'
import { Config, getPrismaConfigArrayValue } from './utils'
import {
  generateEnums,
  generateIndex,
  generateSchemas,
  generateUtils,
} from './generators'

const { version } = require('../package.json')

generatorHandler({
  onManifest() {
    logger.info(`${GENERATOR_NAME}:Registered`)
    return {
      version,
      defaultOutput: '../generated',
      prettyName: GENERATOR_NAME,
    }
  },
  onGenerate: async (options: GeneratorOptions) => {
    const config = options.generator.config
    const cleanConfig: Config = {
      outputFolder: options.generator.output?.value!,
      ignoredFieldNames: getPrismaConfigArrayValue(config, 'ignoredFieldNames'),
    }

    const models = options.dmmf.datamodel.models
    const enums = options.dmmf.datamodel.enums

    await Promise.all([
      generateSchemas(models, cleanConfig),
      generateEnums(enums, cleanConfig),
      generateUtils(cleanConfig),
      generateIndex(cleanConfig),
    ])
  },
})
