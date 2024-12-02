import { z } from 'zod'
import * as utils from './utils'
import * as enums from './enums'

export const CourseCreateSchema = z.object({
  cid: z.string(),
  code: z.string(),
  course_number: z.string(),
  subject_code: z.string(),
  description: z.string(),
  name: z.string(),
  long_name: z.string(),
  notes: z.string().nullish().optional(),
  version: z.number(),
  units: z.number(),
  aka: z.string().nullish().optional(),
  prereq: z.string().nullish().optional(),
  prereq_json: utils.JsonSchema.optional(),
  coreq: z.string().nullish().optional(),
  coreq_json: utils.JsonSchema.optional(),
  antireq: z.string().nullish().optional(),
  antireq_json: utils.JsonSchema.optional(),
  is_active: z.boolean(),
  is_multi_term: z.boolean(),
  is_nogpa: z.boolean(),
  is_repeatable: z.boolean(),
  components: z.array(enums.CourseComponentEnum),
  course_group_id: z.string(),
  coursedog_id: z.string(),
  course_created_at: z.date(),
  course_effective_start_date: z.date(),
  course_last_updated_at: z.date(),
  career: enums.CareerEnum,
  grade_mode: enums.GradeModeEnum,
})

export type CourseCreate = z.infer<typeof CourseCreateSchema>

export const CourseUpdateSchema = CourseCreateSchema.partial()

export type CourseUpdate = z.infer<typeof CourseUpdateSchema>
