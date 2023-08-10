'use client'

import { useState } from "react";
import { BsCheck2Circle, BsBookmarkFill, BsBookmarksFill } from "react-icons/bs";
import { AiFillLike, AiFillDislike } from "react-icons/ai";
import { useMutation } from "@tanstack/react-query";
import { voteType } from '@prisma/client'
import axios, { AxiosError } from 'axios'
import { useCustomToasts } from '@/hooks/use-custom-toast'
import { toast } from '../../hooks/use-toast'
// import { BsBookmark } from "react-icons/bi";

interface LikesProps {
  problemId: String
  difficulty: String | undefined
  likes: number;
  dislikes: number;
  bookmark: boolean | undefined;
  likeStatus: String | undefined | any;
}

const Likes = ({ problemId, difficulty, likes, dislikes, bookmark, likeStatus }: LikesProps) => {

  const [currentLikes, setLikes] = useState<number>(likes)
  const [currentDisLikes, setDislikes] = useState<number>(dislikes)
  const [currentLikeStatus, setLikeStatus] = useState<any>(likeStatus)
  const [currentBookmark, setBookmark] = useState<boolean | null | undefined>(bookmark)
  const { loginToast } = useCustomToasts()

  let difficultyClass = ''
  if (difficulty === 'קל') {
    difficultyClass = 'bg-green-800 text-green-500'
  }
  else if (difficulty === 'בינוני') {
    difficultyClass = 'bg-orange-600  text-yellow-600'

  }
  else {
    difficultyClass = 'bg-rose-600 text-rose-500'
  }

  const { mutate: handleVote } = useMutation({
    mutationFn: async (type: voteType) => {
      const payload: any = {
        voteType: type,
        problemId: problemId,
      }
      await axios.patch('/api/likeProblem', payload)
    },
    onError: (err, voteType) => {
      // if (voteType === 'LIKE'){
      //   setLikes((prev) => prev - 1)
      // }

      // else setVotesAmt((prev) => prev + 1)

      // reset current vote
      // setCurrentVote(prevVote)

      if (err instanceof AxiosError) {
        if (err.response?.status === 401) {
          return loginToast()
        }
      }

      return toast({
        title: 'שגיאה',
        description: 'נסה שוב יותר מאוחר',
        variant: 'destructive',
      })
    },

    onMutate: (type: voteType) => {
      if (currentLikeStatus === type) {
        // User is voting the same way again, so remove their vote
        setLikeStatus(undefined)
        if (type === 'LIKE') setLikes((prev) => prev - 1)
        else if (type === 'DISLIKE') setDislikes((prev) => prev - 1)
      }
      else {
        // User is voting in the opposite direction
        if (type === 'LIKE') {
          setLikeStatus('LIKE')
          setLikes((prev) => prev - 1)
        }
        else if (type === 'DISLIKE') {
          setLikeStatus('DISLIKE')
          setDislikes((prev) => prev - 1)
        }
      }
    }
  })

  const { mutate: handleBookmark } = useMutation({
    mutationFn: async (type: voteType) => {
      const payload: any = {
        problemId: problemId,
      }
    }
  })


  return (
    <>
      <div className='flex justify-center'>
        <div className='flex items-center mt-3'>
          <div className={`${difficultyClass} inline-block rounded-[21px] bg-opacity-[.15] px-2.5 py-1 text-xs font-medium capitalize `}>
            {difficulty}
          </div>
          {/* <div className='rounded p-[3px] ml-4 text-lg transition-colors duration-200 text-green-s text-dark-green-s'>
            <BsCheck2Circle />
          </div> */}

          <div className='flex items-center cursor-pointer hover:bg-gray-400 space-x-1 rounded p-[3px]  ml-4 text-lg transition-colors duration-200 text-dark-gray-6' onClick={() => handleVote('LIKE')}>
            {(likeStatus === 'LIKE') ? <AiFillLike className='text-green-600' /> : <AiFillLike />}
            <span className='text-xs'>{likes}</span>
          </div>
          <div className='flex items-center cursor-pointer hover:bg-gray-400 space-x-1 rounded p-[3px]  ml-4 text-lg transition-colors duration-200 text-green-s text-dark-gray-6' onClick={() => handleVote('DISLIKE')}>
            {(likeStatus === 'DISLIKE') ? <AiFillDislike className='text-red-600' /> : <AiFillDislike />}
            <span className='text-xs'>{dislikes}</span>
          </div>
          <div className='cursor-pointer hover:bg-gray-400  rounded p-[3px]  ml-4 text-xl transition-colors duration-200 text-green-s text-dark-gray-6' onClick={() => handleBookmark}>
            {bookmark ? <BsBookmarksFill className='text-blue-600' /> : <BsBookmarksFill />}
          </div>
        </div>
      </div>
    </>
  );
};

export default Likes;
