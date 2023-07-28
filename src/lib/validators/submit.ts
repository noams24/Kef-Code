import { z } from 'zod'

export const submitValidator = z.object({
  problemId: z.string(),
  content: z.any(),
})

export type submitCreationRequest = z.infer<typeof submitValidator>