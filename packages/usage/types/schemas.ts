import { z } from 'zod'
import * as utils from './utils'
import * as enums from './enums'

/**
 *
 * User
 *
 */

export const UserCreateSchema = z.object({
  email: z.string(),
  name: z.string().nullish().optional(),
  notification_type: enums.NotificationTypeEnum,
})

export type UserCreate = z.infer<typeof UserCreateSchema>

export const UserUpdateSchema = UserCreateSchema.partial()

export type UserUpdate = z.infer<typeof UserUpdateSchema>

/**
 *
 * Course
 *
 */

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

/**
 *
 * CourseTopic
 *
 */

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

/**
 *
 * Faculty
 *
 */

export const FacultyCreateSchema = z.object({
  name: z.string(),
  code: z.string(),
})

export type FacultyCreate = z.infer<typeof FacultyCreateSchema>

export const FacultyUpdateSchema = FacultyCreateSchema.partial()

export type FacultyUpdate = z.infer<typeof FacultyUpdateSchema>

/**
 *
 * Department
 *
 */

export const DepartmentCreateSchema = z.object({
  name: z.string(),
  display_name: z.string(),
  code: z.string(),
  is_active: z.boolean(),
})

export type DepartmentCreate = z.infer<typeof DepartmentCreateSchema>

export const DepartmentUpdateSchema = DepartmentCreateSchema.partial()

export type DepartmentUpdate = z.infer<typeof DepartmentUpdateSchema>

/**
 *
 * Term
 *
 */

export const TermCreateSchema = z.object({
  term_id: z.string(),
  year: z.number(),
  name: enums.TermNameEnum,
})

export type TermCreate = z.infer<typeof TermCreateSchema>

export const TermUpdateSchema = TermCreateSchema.partial()

export type TermUpdate = z.infer<typeof TermUpdateSchema>

/**
 *
 * Subject
 *
 */

export const SubjectCreateSchema = z.object({
  code: z.string(),
  title: z.string(),
})

export type SubjectCreate = z.infer<typeof SubjectCreateSchema>

export const SubjectUpdateSchema = SubjectCreateSchema.partial()

export type SubjectUpdate = z.infer<typeof SubjectUpdateSchema>
