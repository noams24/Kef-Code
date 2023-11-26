"use client"
import Editor from "@/layouts/editor/components/Editor"
import playgroundTemplate from './workSpace/jsonFiles/example.json';
import type { EditorDocument } from '@/types';
import { type EditorState, type SerializedEditorState } from "lexical";
import { zodResolver } from "@hookform/resolvers/zod"
import { useFieldArray, useForm } from "react-hook-form"
import * as z from "zod"
import Split from 'react-split'
import { Button } from "@/components/table/registry/new-york/ui/button"
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/table/registry/new-york/ui/form"
import { Input } from "@/components/table/registry/new-york/ui/input"
import "@uploadthing/react/styles.css";
import { toast } from '@/hooks/use-toast'
import { useMutation } from '@tanstack/react-query'
import axios, { AxiosError } from 'axios'
import { useCustomToasts } from '@/hooks/use-custom-toast'
import { useState } from "react";
import "./workSpace/split.css"

const profileFormSchema = z.object({
  problemId: z.string()
    .min(1, {
      message: "problemId must be at least 1 numbers.",
    })
    .max(20, {
      message: "Title must not be longer than 20 nubmers.",
    }),
    videoUrl: z
    .string()
    .min(1, {
      message: "video url must be at least 1 characters.",
    })
    .max(30, {
      message: "video url must not be longer than 30 characters.",
    }),
  solutionContent: z.any(), //JSON FILE
})

type ProfileFormValues = z.infer<typeof profileFormSchema>

export type EditorContentType = SerializedEditorState | undefined | any;




export function UploadSolution() {

  function onChange(
    state: EditorState,
    setJsonState: React.Dispatch<React.SetStateAction<EditorContentType>>
  ) {
    state.read(() => {
      if (state.isEmpty()) {
        setJsonState(undefined);
        return;
      }
      setJsonState(state.toJSON());
    });
  }

  const document = playgroundTemplate as unknown as EditorDocument;
  const [jsonState, setJsonState] = useState<EditorContentType>(document.data);

  const { loginToast } = useCustomToasts()

  const form = useForm<ProfileFormValues>({
    resolver: zodResolver(profileFormSchema),
    mode: "onChange",
  })

  function onSubmit(data: ProfileFormValues) {
    Submit(data)
  }

  const { mutate: Submit, isLoading } = useMutation({
    mutationFn: async (values: ProfileFormValues) => {
      const payload = {values, jsonState}
      const { data } = await axios.post('/api/uploadSolution', payload)
      return data
    },
    onError: (err) => {
      if (err instanceof AxiosError) {
        if (err.response?.status === 401) {
          return loginToast()
        }
      }
      toast({
        title: 'שגיאה',
        description: 'לא ניתן להעלות תשובה',
        variant: 'destructive',
      })
    },
    onSuccess: () => {
      toast({
        title: 'נשמר',
        description: 'התשובה נשמרה בהצלחה',
        variant: 'destructive',
      })
    },
  })

  return (
    <>
    <Split className="split h-[70vh]" minSize={0} >
    <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">

          <FormField
            control={form.control}
            name="problemId"
            render={({ field }) => (
              <FormItem>
                <FormLabel>problem ID</FormLabel>
                <FormControl>
                  <Input placeholder="" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="videoUrl"
            render={({ field }) => (
              <FormItem>
                <FormLabel>קישור לסרטון</FormLabel>
                <FormControl>
                  <Input placeholder="" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <Button type="submit" disabled={isLoading}>העלאת פתרון</Button>
        </form>
      </Form>
        {/*EDITOR SECTION */}
        <div className="w-full overflow-y-auto ">
        <Editor document={document} onChange={(editor) => onChange(editor, setJsonState)} />
        </div>
      </Split >
    
   
      
    </>
  )
}