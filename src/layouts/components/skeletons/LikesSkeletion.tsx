import React from "react";

const LikesSkeleton: React.FC = () => {
	return (
        <div className='mt-3  space-y-2.5 animate-pulse max-w-lg'>
			<div className='flex justify-center items-center w-full space-x-3'>
				{/* <div className='w-6 h-6 rounded-full bg-dark-fill-3'></div> */}
                <div className='w-6 h-6 rounded-full bg-gray-200 dark:bg-gray-600'></div>
                <div className='w-6 h-6 rounded-full bg-gray-200 dark:bg-gray-600'></div>
                <div className='w-6 h-6 rounded-full bg-gray-200 dark:bg-gray-600'></div>
                <div className='w-6 h-6 rounded-full bg-gray-200 dark:bg-gray-600'></div>
			</div>
		</div>


	);
};
export default LikesSkeleton;

{/* <div role="status" className="space-y-2.5 animate-pulse max-w-lg">
    <div className="flex items-center w-full space-x-2">
        <div className="h-2.5 bg-gray-200 rounded-full dark:bg-gray-700 w-32"></div>
        <div className="h-2.5 bg-gray-300 rounded-full dark:bg-gray-600 w-24"></div>
        <div className="h-2.5 bg-gray-300 rounded-full dark:bg-gray-600 w-full"></div>
    </div>
</div> */}