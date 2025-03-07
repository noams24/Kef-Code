'use client';

import React, { FC, useState } from 'react';
import { FaRegUserCircle } from 'react-icons/fa';
import { humanize, slugify } from '@/lib/utils/textConverter';
import hebrewDateFormat from '@/lib/utils/hebrewDateFormat';
import { AiFillLike } from 'react-icons/ai';
import parse from 'html-react-parser';
import { useMutation } from '@tanstack/react-query';
import { useCustomToasts } from '@/hooks/use-custom-toast';
import { usePrevious } from '@mantine/hooks';
import axios, { AxiosError } from 'axios';
import { toast } from '@/hooks/use-toast';
import Accordion from '@/shortcodes/Accordion';
import CommentsSection from '@/components/comments/CommentsSection';
import { useGenerationStore } from '@/store/store';
import { UserAvatar } from '@/components/UserAvatar';
import Youtube from '@/shortcodes/Youtube';

import 'mathlive/static.css';
import '@/layouts/editor/theme.css';
import Link from 'next/link';

interface SolutionProps {
  data: any;
  userId: string | undefined;
}

const Solution: React.FC<SolutionProps> = ({ data, userId }) => {
  const { loginToast } = useCustomToasts();
  const [votesAmt, setVotesAmt] = useState<number>(data.votes.length);
  const [currentVote, setCurrentVote] = useState<any>(data.likeStatus);
  const prevVote = usePrevious(currentVote);
  const { solutionState } = useGenerationStore();

  const { mutate: vote } = useMutation({
    mutationFn: async () => {
      const payload: any = {
        submissionId: data.id,
        link: window.location.pathname + `?submission=${data.id}`,
      };

      await axios.patch('/api/likeSubmission', payload);
    },
    onError: (err, voteType) => {
      if (voteType === 'LIKE') setVotesAmt(prev => prev - 1);
      else setVotesAmt(prev => prev + 1);

      // reset current vote
      setCurrentVote(prevVote);

      if (err instanceof AxiosError) {
        if (err.response?.status === 401) {
          return loginToast();
        }
      }

      return toast({
        title: 'שגיאה',
        description: 'שגיאה, נסה שנית מאוחר יותר',
        variant: 'destructive',
      });
    },
    onMutate: (type: any) => {
      if (currentVote) {
        // User is voting the same way again, so remove their vote
        setCurrentVote(undefined);
        if (type === 'LIKE') setVotesAmt(prev => prev - 1);
      } else {
        // User is voting in the opposite direction, so subtract 2
        setCurrentVote('LIKE');
        setVotesAmt(prev => prev + (currentVote ? 2 : 1));
      }
    },
  });
  // console.log(data.html)
  return (
    <div>
      <div dir="rtl" className="mt-2 flex justify-between">
        <div className="flex">
          {/* <FaRegUserCircle className={"mt-2 inline-block text-2xl"} /> */}
          <UserAvatar
            user={{
              name: data.user.username || null,
              image: data.user.image || null,
            }}
            className="h-12 w-12"
          />
          <div className="mr-1">
            <Link
              href={`/user/${data.user.username}`}
              className="mr-4 text-center font-primary text-lg font-bold hover:text-blue-500 dark:hover:text-blue-500"
              target="_blank"
            >
              {data.user.username}
            </Link>
            <div className="flex">
              <span className="mr-4">{hebrewDateFormat(data.createdAt)}</span>
            </div>
          </div>
        </div>
        <button
          onClick={() => vote('LIKE')}
          className="mt-2 flex h-8 w-16 justify-between rounded-lg border-2 border-gray-400 transition duration-300 hover:border-blue-700 dark:text-white dark:hover:border-sky-600"
        >
          {currentVote ? (
            <span className="mr-3 text-green-600">{votesAmt}</span>
          ) : (
            <span className="mr-3">{votesAmt}</span>
          )}
          {currentVote ? (
            <AiFillLike className="ml-2 mt-0.5 text-xl text-green-600" />
          ) : (
            <AiFillLike className="ml-2 mt-0.5 text-xl" />
          )}
        </button>
      </div>
      <hr className="my-4 h-0.5 rounded border-0 bg-zinc-200 dark:bg-zinc-700" />
      {data.videoUrl && (
        <div>
          <div className="flex items-center justify-center">
            <Youtube id={data.videoUrl} title={'פתרון'} />
          </div>
          <hr className="my-4 h-0.5 rounded border-0 bg-zinc-200 dark:bg-zinc-700" />
        </div>
      )}

      <div className="mt-4 font-arial">{parse(data.html)}</div>
      <Accordion className="mt-8" title="דיון">
        <CommentsSection
          ID={data.id}
          type="submission"
          comments={[]}
          userId={userId}
        />
      </Accordion>
    </div>
  );
};

export default Solution;
