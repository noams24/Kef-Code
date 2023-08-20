import { z } from 'zod'

export const PostVoteValidator = z.object({
  problemId: z.number(),
  voteType: z.enum(['LIKE', 'DISLIKE']),
})

export type PostVoteRequest = z.infer<typeof PostVoteValidator>

export const CommentVoteValidator = z.object({
  commentId: z.string(),
  voteType: z.enum(['LIKE', 'DISLIKE']),
})

export type CommentVoteRequest = z.infer<typeof CommentVoteValidator>
