import { create } from "zustand";

interface GenerationState {
    solutionState: String | null | any,
    setSolution: (solutionState: String | null) => void
  }

export const useGenerationStore = create<GenerationState>()((set) => ({
    solutionState: null,
    setSolution: (solutionState: any) => set({ solutionState })
  }))

  interface GenerationStatee {
    page: number
    setPage: (solutionState: number) => void
  }

export const useGenerationStoree = create<GenerationStatee>()((set) => ({
    page: 1,
    setPage: (page: number) => set({ page })
  }))