import { DMMF } from '@prisma/generator-helper'

export const getZodOptional = (field: DMMF.Field) => {
  if (!field.isRequired && field.type === 'Json') {
    return '.optional()'
  }

  return field.isRequired ? '' : '.nullish().optional()'
}
