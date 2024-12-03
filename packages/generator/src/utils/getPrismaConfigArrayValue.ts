import { Dictionary } from '@prisma/sdk'

export const getPrismaConfigArrayValue = (
  config: Dictionary<string>,
  key: string,
) => {
  const values = config[key]

  if (!values) {
    return []
  }

  return values.split(',').map((value: string) => value.trim())
}
