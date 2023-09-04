import { getAuthSession } from '@/lib/auth'
import { db } from '@/lib/db'
import { Comment, Vote, User } from '@prisma/client'
import CreateComment from './CreateComment'
import PostComment from './PostComment'

type ExtendedComment = Comment & {
  votes: Vote[]
  author: User
  replies: ReplyComment[]
}

type ReplyComment = Comment & {
  votes: Vote[]
  author: User
}

interface CommentsSectionProps {
  problemId: number
  comments: ExtendedComment[]
}

const CommentsSection = async ({ problemId }: CommentsSectionProps) => {
  const session = await getAuthSession()

  const comments = await db.comment.findMany({
    where: {
      problemId: problemId,
      replyToId: null, // only fetch top-level comments
    },
    include: {
      author: true,
      votes: true,
      replies: {
        // first level replies
        include: {
          author: true,
          votes: true,
        },
      },
    },
  })

  // console.log(comments)

  return (
    <div dir="rtl" className='flex flex-col text-right'>
      <div className="mt-2">
        <CreateComment problemId={problemId} />
      </div>
      <div className='flex flex-col gap-y-6 '>
        {comments
          .filter((comment) => !comment.replyToId)
          .map((topLevelComment) => {
            const topLevelCommentVotesAmt = topLevelComment.votes.reduce(
              (acc, vote) => {
                if (vote.type === 'LIKE') return acc + 1
                if (vote.type === 'DISLIKE') return acc - 1
                return acc
              },
              0
            )

            const topLevelCommentVote = topLevelComment.votes.find(
              (vote) => vote.userId === session?.user.id
            )

            return (
              <div key={topLevelComment.id} className='flex flex-col'>
                <div className='mb-2'>
                  <PostComment
                    comment={topLevelComment}
                    currentVote={topLevelCommentVote}
                    votesAmt={topLevelCommentVotesAmt}
                    problemId={problemId}
                  />
                </div>

                {/* Render replies */}
                {topLevelComment.replies
                  .sort((a, b) => b.votes.length - a.votes.length) // Sort replies by most liked
                  .map((reply) => {
                    const replyVotesAmt = reply.votes.reduce((acc, vote) => {
                      if (vote.type === 'LIKE') return acc + 1
                      if (vote.type === 'DISLIKE') return acc - 1
                      return acc
                    }, 0)

                    const replyVote = reply.votes.find(
                      (vote) => vote.userId === session?.user.id
                    )

                    return (
                      <div
                        key={reply.id}
                        className='mr-2 py-2 pr-4 border-r-2 border-zinc-200 dark:border-zinc-600'>
                        <PostComment
                          comment={reply}
                          currentVote={replyVote}
                          votesAmt={replyVotesAmt}
                          problemId={problemId}
                        />
                      </div>
                    )
                  })}
              </div>
            )
          })}
      </div>
    </div>
  )
}

export default CommentsSection
