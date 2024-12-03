import { DMMF } from '@prisma/generator-helper'
import { getZodFieldType } from './getZodType'
import { getZodOptional } from './getZodOptional'

export const getZodField = (field: DMMF.Field) => {
  return `${field.name}: ${getZodFieldType(field)}${getZodOptional(field)}`
}
