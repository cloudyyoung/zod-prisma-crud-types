import { DMMF } from '@prisma/generator-helper'

export const getEnumNames = (model: DMMF.DatamodelEnum) => {
    const nameEnum = `${model.name}Enum`
  const name = model.name
  return { nameEnum, name }
}
