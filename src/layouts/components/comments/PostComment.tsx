'use client'

import { useOnClickOutside } from '@/hooks/use-on-click-outside'
import { formatTimeToNow } from '@/lib/utils'
import { CommentRequest } from '@/lib/validators/comment'
import { Comment, Vote, User } from '@prisma/client'
import { useMutation } from '@tanstack/react-query'
import axios from 'axios'
import { MessageSquare } from 'lucide-react'
import { useRouter } from 'next/navigation'
import { FC, useRef, useState } from 'react'
import CommentVotes from './CommentVotes'
import { UserAvatar } from '../UserAvatar'
import { Button } from '../ui/Button2'
import { Label } from '../ui/Label'
import { TextArea } from '../ui/TextArea'
import { toast } from '@/hooks/use-toast'
import { useSession } from 'next-auth/react'

type ExtendedComment = Comment & {
  votes: Vote[]
  author: User
}

interface PostCommentProps {
  comment: ExtendedComment
  votesAmt: number
  currentVote: Vote | undefined
  problemId: number
}

const PostComment: FC<PostCommentProps> = ({
  comment,
  votesAmt,
  currentVote,
  problemId,
}) => {
  const { data: session } = useSession()
  const [isReplying, setIsReplying] = useState<boolean>(false)
  const commentRef = useRef<HTMLDivElement>(null)
  const [input, setInput] = useState<string>(`@${comment.author.username} `)
  const router = useRouter()
  useOnClickOutside(commentRef, () => {
    setIsReplying(false)
  })

  const { mutate: postComment, isLoading } = useMutation({
    mutationFn: async ({ problemId, text, replyToId }: CommentRequest) => {
      const payload: CommentRequest = { problemId, text, replyToId }

      const { data } = await axios.patch(
        `/api/comment/problem`,
        payload
      )
      return data
    },

    onError: () => {
      return toast({
        title: 'Something went wrong.',
        description: "Comment wasn't created successfully. Please try again.",
        variant: 'destructive',
      })
    },
    onSuccess: () => {
      router.refresh()
      setIsReplying(false)
    },
  })

  return (
    <div ref={commentRef} className='flex flex-col'>
      <div className='flex items-center'>
        <UserAvatar
          user={{
            name: comment.author.name || null,
            image: comment.author.image || null,
          }}
          className='h-6 w-6'
        />
        <div className='mr-2 flex items-center gap-x-2'>
          <p className='text-sm font-medium'>{comment.author.username}</p>

          <p className='max-h-40 truncate text-xs text-zinc-500'>
            {formatTimeToNow(new Date(comment.createdAt))}
          </p>
        </div>
      </div>

      <p className='text-sm mt-2'>{comment.text}</p>

      <div className='flex gap-2 items-center'>
        <CommentVotes
          commentId={comment.id}
          votesAmt={votesAmt}
          currentVote={currentVote}
        />

        <Button
          onClick={() => {
            if (!session) return router.push('/sign-in')
            setIsReplying(true)
          }}
          variant='ghost'
          size='xs'
          >
          <MessageSquare className='h-4 w-4 ml-1.5' />
          תגובה
        </Button>
      </div>

      {isReplying ? (
        <div className='grid w-full gap-1.5'>
          {/* <Label htmlFor='comment'>התגובה שלך</Label> */}
          <div className='mr-2'>
            <TextArea
              onFocus={(e) =>
                e.currentTarget.setSelectionRange(
                  e.currentTarget.value.length,
                  e.currentTarget.value.length
                )
              }
              autoFocus
              id='comment'
              value={input}
              onChange={(e) => setInput(e.target.value)}
              rows={1}
              placeholder='כתוב פה  את התגובה שלך'
            />

            <div className='mt-2 flex justify-end gap-2'>
              <Button
                tabIndex={-1}
                variant='subtle'
                onClick={() => setIsReplying(false)}>
                ביטול
              </Button>
              <Button
                isLoading={isLoading}
                onClick={() => {
                  if (!input) return
                  postComment({
                    problemId,
                    text: input,
                    replyToId: comment.replyToId ?? comment.id, // default to top-level comment
                  })
                }}>
                שליחה
              </Button>
            </div>
          </div>
        </div>
      ) : null}
    </div>
  )
}

export default PostComment
