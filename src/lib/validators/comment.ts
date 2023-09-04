import { z } from 'zod'

export const CommentValidator = z.object({
  ID: z.string(),
  type: z.string(),
  text: z.string(),
  replyToId: z.string().optional()
})

export type CommentRequest = z.infer<typeof CommentValidator>
