'use client'

import { Button } from '@/components/ui/Button2'
import { toast } from '@/hooks/use-toast'
import { CommentRequest } from '@/lib/validators/comment'

import { useCustomToasts } from '@/hooks/use-custom-toast'
import { useMutation } from '@tanstack/react-query'
import axios, { AxiosError } from 'axios'
import { FC, useContext, useState } from 'react'
import { TextArea } from '@/components/ui/TextArea'
import { QueryContext } from "@/partials/ChildrenProviders";

interface CreateCommentProps {
  ID: string
  type: string
  replyToId?: string
}

const CreateComment: FC<CreateCommentProps> = ({ ID, type, replyToId }) => {
  const [input, setInput] = useState<string>('')
  const { loginToast } = useCustomToasts()
  const queryClient = useContext(QueryContext);

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
      queryClient.invalidateQueries({ queryKey: ["comments"] });
      queryClient.invalidateQueries({ queryKey: ["solution"] });
      setInput('')
    },
  })

  return (
    <div className='grid w-full gap-1.5'>
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
