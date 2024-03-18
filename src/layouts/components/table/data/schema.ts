import { z } from "zod"

export const taskSchema = z.object({
  id: z.any(),
  title: z.string(),
  date: z.string(),
  status: z.string(),
  difficulty: z.string(),
})

export type Task = z.infer<typeof taskSchema>