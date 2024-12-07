import { DMMF } from '@prisma/generator-helper'

export const getModelNames = (model: DMMF.Model) => {
  const nameSchema = `${model.name}Schema`
  const name = model.name
  const nameCreateSchema = `${model.name}CreateSchema`
  const nameCreate = `${model.name}Create`
  const nameUpdateSchema = `${model.name}UpdateSchema`
  const nameUpdate = `${model.name}Update`
  const nameReadSchema = `${model.name}ReadSchema`
  const nameRead = `${model.name}Read`
  const nameDeleteSchema = `${model.name}DeleteSchema`
  const nameDelete = `${model.name}Delete`

  return {
    nameSchema,
    name,
    nameCreateSchema,
    nameCreate,
    nameUpdateSchema,
    nameUpdate,
    nameReadSchema,
    nameRead,
    nameDeleteSchema,
    nameDelete,
  }
}
