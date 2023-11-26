'use client'

import { Button } from '@/components/ui/Button2'
import { toast } from '@/hooks/use-toast'
import { CommentRequest } from '@/lib/validators/comment'

import { useCustomToasts } from '@/hooks/use-custom-toast'
import { useMutation } from '@tanstack/react-query'
import axios, { AxiosError } from 'axios'
import { useRouter } from 'next/navigation'
import { FC, useState } from 'react'
import { Label } from '@/components/ui/Label'
import { TextArea } from '@/components/ui/TextArea'

interface CreateCommentProps {
  ID: string
  type: string
  replyToId?: string
}

const CreateComment: FC<CreateCommentProps> = ({ ID, type, replyToId }) => {
  const [input, setInput] = useState<string>('')
  const router = useRouter()
  const { loginToast } = useCustomToasts()

  const { mutate: comment, isLoading } = useMutation({
    mutationFn: async ({ ID, text, type, replyToId }: CommentRequest) => {
      const payload: CommentRequest = { ID, type, text, replyToId }

      const { data } = await axios.patch(
        `/api/comment/problem/`,
        payload
      )
      return data
    },

    onError: (err) => {
      if (err instanceof AxiosError) {
        if (err.response?.status === 401) {
          return loginToast()
        }
      }

      return toast({
        title: 'שגיאה',
        description: "נסה שוב מאוחר יותר",
        variant: 'destructive',
      })
    },
    onSuccess: () => {
      router.refresh()
      setInput('')
    },
  })

  return (
    <div className='grid w-full gap-1.5'>
      {/* <Label htmlFor='comment'>התגובה שלך</Label> */}
      <div>
        <TextArea
          id='comment'
          value={input}
          onChange={(e) => setInput(e.target.value)}
          rows={1}
          placeholder='כתוב פה  את התגובה שלך'
        />

        <div className='mt-2 flex justify-end'>
          <Button
            isLoading={isLoading}
            disabled={input.length === 0}
            onClick={() => comment({ ID, type: type, text: input, replyToId })}>
            שליחה
          </Button>
        </div>
      </div>
    </div>
  )
}

export default CreateComment
