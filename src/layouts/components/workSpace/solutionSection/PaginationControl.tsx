'use client'

import { FC } from 'react'
import { Button } from "@/components/table/registry/new-york/ui/button"
import { ChevronLeftIcon, ChevronRightIcon } from "@radix-ui/react-icons"
import { useGenerationStoree } from '@/store/store';

interface PaginationControlsProps {
    numberOfPages: number
    currentPage:number
}

const PaginationControls: FC<PaginationControlsProps> = (
    {
        numberOfPages,
        currentPage,
    }
) => {
    const { page, setPage } = useGenerationStoree()
    // const per_page = 5

    return (
        <div className='flex justify-center gap-2 mb-4'>
            <Button
                disabled={currentPage === 1}
                onClick={() => { setPage(Number(page) - 1)}}>
                    
                <ChevronLeftIcon className="h-4 w-4" />
            </Button>

            <div className="mt-1">
                {page}
            </div>
            <Button
                disabled={currentPage === numberOfPages}
                onClick={() => { setPage(Number(page) + 1)}}>
                <ChevronRightIcon className="h-4 w-4" />
            </Button>
        </div>
    )
}

export default PaginationControls