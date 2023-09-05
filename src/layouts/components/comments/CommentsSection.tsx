'use client'

import CreateComment from './CreateComment'
import PostComment from './PostComment'
import { useQuery } from '@tanstack/react-query'
import axios, { AxiosError } from 'axios'

interface CommentsSectionProps {
  ID: string
  type: string
  userId: string | undefined
  comments: any
}

const CommentsSection = ({ ID, type, userId }: CommentsSectionProps) => {

  // get data from the db
  const { data: comments, isLoading } = useQuery({
    queryKey: ['comments'],
    queryFn: async () => {
      const query = `/api/getComments?ID=${ID}&type=${type}`
      const { data } = await axios.get(query)
      return data
    },
  })
  return (
    <div dir="rtl" className='flex flex-col text-right'>
      <div className="mt-2">
        <CreateComment ID={ID} type={type} />
      </div>
      <div className='flex flex-col gap-y-6 '>
      {comments && comments
          .filter((comment:any) => !comment.replyToId)
          .map((topLevelComment:any) => {
            const topLevelCommentVotesAmt = topLevelComment.votes.reduce(
              (acc:any, vote:any) => {
                if (vote.type === 'LIKE') return acc + 1
                if (vote.type === 'DISLIKE') return acc - 1
                return acc
              },
              0
            )

            const topLevelCommentVote = topLevelComment.votes.find(
              (vote:any) => vote.userId === userId
            )

            return (
              <div key={topLevelComment.id} className='flex flex-col'>
                <div className='mb-2'>
                  <PostComment
                    comment={topLevelComment}
                    currentVote={topLevelCommentVote}
                    votesAmt={topLevelCommentVotesAmt}
                    type={type}
                    ID={ID}
                  />
                </div>

                
                {topLevelComment.replies
                    .sort((a:any, b:any) => b.votes.length - a.votes.length) // Sort replies by most liked
                    .map((reply:any) => {
                      const replyVotesAmt = reply.votes.reduce((acc:any, vote:any) => {
                        if (vote.type === 'LIKE') return acc + 1
                        if (vote.type === 'DISLIKE') return acc - 1
                        return acc
                      }, 0)
  
                      const replyVote = reply.votes.find(
                        (vote:any) => vote.userId === userId
                      )
  
                      return (
                        <div
                          key={reply.id}
                          className='mr-2 py-2 pr-4 border-r-2 border-zinc-200 dark:border-zinc-600'>
                          <PostComment
                            comment={reply}
                            currentVote={replyVote}
                            votesAmt={replyVotesAmt}
                            type={type}
                            ID={ID}
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