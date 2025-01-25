'use client';
import { useGenerationStore } from '@/store/store';
import * as React from 'react';
import SolutionCard from './SolutionCard';

interface FeedProps {
  data: any;
}

const Feed: React.FC<FeedProps> = ({ data }) => {
  const { setSolution } = useGenerationStore();
  const handleClick = (id: String) => {
    setSolution(id);
  };

  return (
    <>
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
    </>
  );
};

export default Feed;
