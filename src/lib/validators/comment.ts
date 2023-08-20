import { z } from 'zod'

export const CommentValidator = z.object({
  problemId: z.number(),
  text: z.string(),
  replyToId: z.string().optional()
})

export type CommentRequest = z.infer<typeof CommentValidator>
