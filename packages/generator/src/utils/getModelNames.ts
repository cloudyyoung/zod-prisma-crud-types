import { DMMF } from '@prisma/generator-helper'

export const getModelNames = (model: DMMF.Model) => {
  const nameSchema = `${model.name}Schema`
  const name = model.name
  const nameCreateSchema = `${model.name}CreateSchema`
  const nameCreate = `${model.name}Create`
  const nameUpdateSchema = `${model.name}UpdateSchema`
  const nameUpdate = `${model.name}Update`

  return {
    nameSchema,
    name,
    nameCreateSchema,
    nameCreate,
    nameUpdateSchema,
    nameUpdate,
  }
}
