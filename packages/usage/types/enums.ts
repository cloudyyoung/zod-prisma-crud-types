import { z } from 'zod'

export const NotificationTypeEnum = z.enum([
  'newPosts',
  'newComments',
  'newFollowers',
  'reply',
  'heartOnPost',
  'heartOnComment',
  'heartOnReply',
])
export type NotificationType = z.infer<typeof NotificationTypeEnum>

export const LanguageEnum = z.enum([
  'Typescript',
  'Javascript',
  'Rust',
  'Go',
  'Python',
  'Cpp',
])
export type Language = z.infer<typeof LanguageEnum>

export const CourseComponentEnum = z.enum([
  'LAB',
  'LECTURE',
  'SECTION',
  'SEMINAR',
  'SUPERVISED_STUDY',
  'TUTORIAL',
])
export type CourseComponent = z.infer<typeof CourseComponentEnum>

export const CareerEnum = z.enum([
  'UNDERGRADUATE_PROGRAM',
  'GRADUATE_PROGRAM',
  'MEDICINE_PROGRAM',
])
export type Career = z.infer<typeof CareerEnum>

export const GradeModeEnum = z.enum(['CDF', 'CNC', 'CRF', 'ELG', 'GRD', 'MTG'])
export type GradeMode = z.infer<typeof GradeModeEnum>

export const TermNameEnum = z.enum(['WINTER', 'SPRING', 'SUMMER', 'FALL'])
export type TermName = z.infer<typeof TermNameEnum>
