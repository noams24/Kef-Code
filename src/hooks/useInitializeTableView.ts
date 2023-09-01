import { useEffect } from 'react';

import { ColumnViewStateType, useTableViewStore } from '@/store/store';
import { JsonKeysEnum } from '@/types/enum';

// This hook is for getting the view state every time the component mounts and the browser environment is active (problem by Next)
export const useInitializeTableViewStore = () => {
    const { setColumnsView } = useTableViewStore()

    useEffect(() => {
        const storedColumnsView = localStorage.getItem(JsonKeysEnum.TABLE_VIEW)
        if (storedColumnsView) {
            const parsedColumnsView = JSON.parse(storedColumnsView)
            parsedColumnsView.forEach((columnView: ColumnViewStateType) => {
                setColumnsView(columnView)
            })
        }
    }, [])
}
