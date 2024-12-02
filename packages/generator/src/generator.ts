import {
  DMMF,
  generatorHandler,
  GeneratorOptions,
} from '@prisma/generator-helper'
import { logger } from '@prisma/sdk'
import path from 'path'
import { GENERATOR_NAME } from './constants'
import { writeFileSafely } from './utils/writeFileSafely'

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
    const ignoredFieldNamesString = config.ignoredFieldNames || ''
    const ignoredFieldNames = ignoredFieldNamesString
      .split(',')
      .map((name) => name.trim())

    const promises = options.dmmf.datamodel.models.map((model) => {
      const schemaLocation = path.join(
        options.generator.output?.value!,
        `${model.name}Schema.ts`,
      )
      const content = getZodSchema(model, ignoredFieldNames)
      return writeFileSafely(schemaLocation, content)
    })

    await Promise.all(promises)

    const indexLocation = path.join(
      options.generator.output?.value!,
      `index.ts`,
    )
    const indexContent = getIndexContent(options.dmmf.datamodel.models)
    await writeFileSafely(indexLocation, indexContent)

    const utilsLocation = path.join(
      options.generator.output?.value!,
      `utils.ts`,
    )
    const utilsContent = getUtilsContent()
    await writeFileSafely(utilsLocation, utilsContent)
  },
})

const getZodFieldType = (field: DMMF.Field) => {
  const getType = (type: string) => {
    switch (type) {
      case 'BigInt':
        return 'z.string()'
      case 'Boolean':
        return 'z.boolean()'
      case 'Bytes':
        return 'z.string()'
      case 'DateTime':
        return 'z.date()'
      case 'Decimal':
        return 'z.number()'
      case 'Float':
        return 'z.number()'
      case 'Int':
        return 'z.number()'
      case 'Json':
        return 'JsonSchema'
      case 'String':
        return 'z.string()'
      default:
        return 'z.unknown()'
    }
  }

  if (field.isList) {
    return `z.array(${getType(field.type)})`
  }
  return getType(field.type)
}

const getZodOptional = (field: DMMF.Field) => {
  return field.isRequired ? '' : '.nullish().optional()'
}

const isIgnoredField = (field: DMMF.Field, ignoredFieldNames: string[]) => {
  return (
    ignoredFieldNames.includes(field.name) ||
    field.kind !== 'scalar' ||
    field.isReadOnly ||
    field.isId
  )
}

const getZodField = (field: DMMF.Field) => {
  console.log(field)
  return `${field.name}: ${getZodFieldType(field)}${getZodOptional(field)}`
}

const getZodSchema = (model: DMMF.Model, ignoredFieldNames: string[]) => {
  const fields = model.fields
    .filter((field) => !isIgnoredField(field, ignoredFieldNames))
    .map(getZodField)

  return `
  import { z } from 'zod';
  import { JsonSchema } from './utils';

  export const ${model.name}CreateSchema = z.object({
    ${fields}
  });

  export type ${model.name}Create = z.infer<typeof ${model.name}CreateSchema>;

  export const ${model.name}UpdateSchema = ${model.name}CreateSchema.partial();

  export type ${model.name}Update = z.infer<typeof ${model.name}UpdateSchema>;
  `
}

const getIndexContent = (models: DMMF.Model[]) => {
  return (
    models
      .map((model) => {
        return `export * from './${model.name}Schema'`
      })
      .join('\n') +
    `
    export * from './utils'
    `
  )
}

const getUtilsContent = () => {
  return `
    import { z } from 'zod';

    export type Json = { [key: string]: Json } | Json[]
    export const JsonSchema: z.ZodType<Json> = z.lazy(() =>
      z.union([z.array(JsonSchema), z.record(JsonSchema)]),
    ).transform((val) => {
      return val ? JSON.parse(JSON.stringify(val)) : val
    })

  `
}
