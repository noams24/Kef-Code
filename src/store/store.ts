import { create } from 'zustand';

import { ColumnsNameEnum, JsonKeysEnum, ViewOptionEnum } from '@/types/enum';

interface GenerationState {
  solutionState: String | null | any;
  setSolution: (solutionState: String | null) => void;
}

export const useGenerationStore = create<GenerationState>()(set => ({
  solutionState: null,
  setSolution: (solutionState: any) => set({ solutionState }),
}));

interface GenerationStatee {
  page: number;
  setPage: (solutionState: number) => void;
}

interface GenerationState3 {
  submissionState: any;
  setSubmission: (solutionState: String | null) => void;
}

export const useGenerationStoree = create<GenerationStatee>()(set => ({
  page: 1,
  setPage: (page: number) => set({ page }),
}));

export const useGenerationStore3 = create<GenerationState3>()(set => ({
  submissionState: null,
  setSubmission: (submissionState: any) => set({ submissionState }),
}));

export const useDevelop = create<any>()(set => ({
  development: process.env.NODE_ENV === 'development',
  setDevelop: (development: string) => set({ development }),
}));

export type ColumnViewStateType = {
  columnName: string;
  viewOption: ViewOptionEnum;
};

interface TableViewState {
  columnsView: ColumnViewStateType[];
  setColumnsView: (viewState: ColumnViewStateType) => void;
}

// Create default view for all the columns

const defaultTableViewOption = Object.values(ColumnsNameEnum).map(
  columnName => {
    return {
      columnName,
      viewOption: ViewOptionEnum.NO_SORTING,
    };
  }
);

export const useTableViewStore = create<TableViewState>()(set => ({
  columnsView: defaultTableViewOption,

  setColumnsView: ({
    columnName,
    viewOption: newView,
  }: ColumnViewStateType) => {
    set(({ columnsView: prevColumnsView }) => {
      const updatedColumnsView = prevColumnsView.map(column =>
        column.columnName === columnName
          ? { ...column, viewOption: newView }
          : column
      );
      localStorage.setItem(
        JsonKeysEnum.TABLE_VIEW,
        JSON.stringify(updatedColumnsView)
      );
      return { columnsView: updatedColumnsView };
    });
  },
}));
