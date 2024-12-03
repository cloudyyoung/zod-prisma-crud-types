import { DMMF } from "@prisma/generator-helper"

export const isIgnoredField = (
  field: DMMF.Field,
  ignoredFieldNames: string[],
) => {
  return (
    ignoredFieldNames.includes(field.name) ||
    (field.kind !== 'scalar' && field.kind !== 'enum') ||
    field.isId
  )
}
