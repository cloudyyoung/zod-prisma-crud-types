import { DMMF } from '@prisma/generator-helper'
import { getEnumNames } from './getEnumNames'

export const getZodEnum = (em: DMMF.DatamodelEnum) => {
  const values = em.values.map((v) => `'${v.name}'`).join(', ')
  const { name, nameEnum } = getEnumNames(em)

  return `
    export const ${nameEnum} = z.enum([${values}]);
    export type ${name} = z.infer<typeof ${nameEnum}>;
  `
}
