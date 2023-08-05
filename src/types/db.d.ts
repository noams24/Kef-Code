// import type { Post, Subreddit, User, Vote, Comment } from '@prisma/client'

// export type ExtendedPost = Post & {
//   subreddit: Subreddit
//   votes: Vote[]
//   author: User
//   comments: Comment[]
// }
import type { Problem } from "@prisma/client";

export type newProblem = Problem & {
  course: string
  chapter: string
  title: string
  img: string
  difficulty: string
}
