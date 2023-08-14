import create from "zustand";

interface GenerationState {
    solutionState: String | null | any,
    setSolution: (solutionState: String | null) => void
  }

export const useGenerationStore = create<GenerationState>()((set) => ({
    solutionState: null,
    setSolution: (solutionState: any) => set({ solutionState })
  }))