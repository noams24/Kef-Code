'use client'

import { FC } from 'react'
import { Button } from "@/components/table/registry/new-york/ui/button"
import { ChevronLeftIcon, ChevronRightIcon } from "@radix-ui/react-icons"
import { useGenerationStoree } from '@/store/store';

interface PaginationControlsProps {
    hasNextPage: boolean
    hasPrevPage: boolean
    numberOfItems: number
}

const PaginationControls: FC<PaginationControlsProps> = (
    {
        hasNextPage,
        hasPrevPage,
        numberOfItems,
    }
) => {
    const { page, setPage } = useGenerationStoree()
    const per_page = 5

    return (
        <div className='flex justify-center gap-2 mb-4'>
            <Button
                disabled={!hasPrevPage}
                onClick={() => { setPage(Number(page) - 1)}}>
                    
                <ChevronLeftIcon className="h-4 w-4" />
            </Button>

            <div>
                {/* {page} / {Math.ceil(numberOfItems / Number(per_page))} */}
                {page}
            </div>
            <Button
                disabled={!hasNextPage}
                onClick={() => { setPage(Number(page) + 1)}}>
                <ChevronRightIcon className="h-4 w-4" />
            </Button>
        </div>
    )
}

export default PaginationControls