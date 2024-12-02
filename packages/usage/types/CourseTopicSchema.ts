import { z } from 'zod'
import { JsonSchema } from './utils'

export const CourseTopicCreateSchema = z.object({
  number: z.string(),
  name: z.string(),
  long_name: z.string(),
  description: z.string(),
  is_repeatable: z.boolean(),
  units: z.number(),
  link: z.string(),
  course_id: z.string(),
})

export type CourseTopicCreate = z.infer<typeof CourseTopicCreateSchema>

export const CourseTopicUpdateSchema = CourseTopicCreateSchema.partial()

export type CourseTopicUpdate = z.infer<typeof CourseTopicUpdateSchema>
