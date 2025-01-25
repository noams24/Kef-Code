'use client';
import { useGenerationStore } from '@/store/store';
// import { useSearchParams } from 'next/navigation';
import * as React from 'react';
import SolutionCard from './SolutionCard';

// import { useEffect } from 'react';

interface FeedProps {
  data: any;
}

const Feed: React.FC<FeedProps> = ({ data }) => {
  const { setSolution } = useGenerationStore();
  // const searchParams = useSearchParams();
  // const submissionParam = searchParams.get('submission');
  // if (submissionParam) {
  //   const index = data.findIndex((item: any) => item.id === submissionParam);
  //   console.log(index);
  //   const tabSolutions = document.getElementById('tab-1');
  //   if (tabSolutions) {
  //     setTimeout(() => {
  //       tabSolutions.click();
  //       setSolution(index.toString());
  //     }, 1000);
  //   }
  // }

  const handleClick = (id: String) => {
    console.log(id);
    setSolution(id);
  };

  // useEffect(() => {
  // const searchParams = useSearchParams();
  // const submissionParam = searchParams.get('submission');
  //   if (submissionParam) {
  //     const index = data.findIndex((item: any) => item.id === submissionParam);
  //     console.log(index);
  //     const tabSolutions = document.getElementById('tab-1');
  //     if (tabSolutions) {
  //       setTimeout(() => {
  //         tabSolutions.click();
  //         setSolution(index.toString());
  //       }, 1000);
  //     }
  //   }
  // }, [submissionParam]);

  return (
    <div>
      {data.length === 0 ? (
        <h3 className="mt-5 flex justify-center">אין פתרונות להצגה</h3>
      ) : (
        data.map((item: any, index: any) => (
          <div key={index} onClick={() => handleClick(index)}>
            <SolutionCard
              author={item.user.username}
              date={item.createdAt}
              likes={item.votes.length}
              comments={item.comments.length}
              avatar={item.user.image}
            />
          </div>
        ))
      )}
    </div>
  );
};

export default Feed;
