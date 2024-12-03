import { DMMF } from '@prisma/generator-helper'
import { isIgnoredField } from './isIgnoredField'
import { getZodField } from './getZodField'
import { getModelNames } from './getModelNames'

export const getZodSchema = (
  model: DMMF.Model,
  ignoredFieldNames: string[],
) => {
  const fields = model.fields
    .filter((field) => !isIgnoredField(field, ignoredFieldNames))
    .map(getZodField)

  const { nameCreateSchema, nameCreate, nameUpdateSchema, nameUpdate } =
    getModelNames(model)

  const content = `
    export const ${nameCreateSchema} = z.object({
      ${fields}
    });

    export type ${nameCreate} = z.infer<typeof ${nameCreateSchema}>;

    export const ${nameUpdateSchema} = ${nameCreateSchema}.partial();

    export type ${nameUpdate} = z.infer<typeof ${nameUpdateSchema}>;
  `
  return content
}
