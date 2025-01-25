'use client';

import { useOnClickOutside } from '@/hooks/use-on-click-outside';
import { formatTimeToNow } from '@/lib/utils';
import { CommentRequest } from '@/lib/validators/comment';
import { Comment, Vote, User } from '@prisma/client';
import { useMutation } from '@tanstack/react-query';
import axios from 'axios';
import { MessageSquare } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { FC, useRef, useState, useContext } from 'react';
import CommentVotes from './CommentVotes';
import { UserAvatar } from '../UserAvatar';
import { Button } from '../ui/Button2';
import { Label } from '../ui/Label';
import { TextArea } from '../ui/TextArea';
import { toast } from '@/hooks/use-toast';
import { useSession } from 'next-auth/react';
import Link from 'next/link';
import { QueryContext } from '@/partials/ChildrenProviders';

type ExtendedComment = Comment & {
  votes: Vote[];
  author: User;
};

interface PostCommentProps {
  comment: ExtendedComment;
  votesAmt: number;
  currentVote: Vote | undefined;
  type: string;
  ID: string;
}

const PostComment: FC<PostCommentProps> = ({
  comment,
  votesAmt,
  currentVote,
  type,
  ID,
}) => {
  const queryClient = useContext(QueryContext);
  const { data: session } = useSession();
  const [isReplying, setIsReplying] = useState<boolean>(false);
  const commentRef = useRef<HTMLDivElement>(null);
  const [input, setInput] = useState<string>(`@${comment.author.username} `);
  const router = useRouter();
  useOnClickOutside(commentRef, () => {
    setIsReplying(false);
  });

  const { mutate: postComment, isLoading } = useMutation({
    mutationFn: async ({ ID, type, text, replyToId }: CommentRequest) => {
      const link = window.location.pathname;
      const payload: CommentRequest = { ID, type, text, replyToId, link };
      const { data } = await axios.patch(`/api/comment/problem`, payload);
      return data;
    },

    onError: () => {
      return toast({
        title: 'שגיאה',
        description: 'נסה שוב מאוחר יותר',
        variant: 'destructive',
      });
    },
    onSuccess: () => {
      // router.refresh()
      queryClient.invalidateQueries({ queryKey: ['comments'] });
      setIsReplying(false);
    },
  });

  return (
    <div ref={commentRef} className="flex flex-col">
      <div className="flex items-center">
        <UserAvatar
          user={{
            name: comment.author.name || null,
            image: comment.author.image || null,
          }}
          className="h-6 w-6"
        />
        <div className="mr-2 flex items-center gap-x-2">
          <Link href={`/user/${comment.author.username}`} target="_blank">
            <p className="text-center font-primary font-bold hover:text-blue-500 dark:hover:text-blue-500">
              {comment.author.username}
            </p>
          </Link>

          <p className="max-h-40 truncate text-xs text-zinc-500">
            {formatTimeToNow(new Date(comment.createdAt))}
          </p>
        </div>
      </div>

      <p className="mt-2 font-primary text-sm">{comment.text}</p>

      <div className="flex items-center gap-2">
        <CommentVotes
          commentId={comment.id}
          votesAmt={votesAmt}
          currentVote={currentVote}
        />

        <Button
          onClick={() => {
            // if (!session) return router.push('/sign-in')
            setIsReplying(true);
          }}
          variant="ghost"
          size="xs"
          disabled={!session}
        >
          <MessageSquare className="ml-1.5 h-4 w-4" />
          תגובה
        </Button>
      </div>

      {isReplying ? (
        <div className="grid w-full gap-1.5">
          {/* <Label htmlFor='comment'>התגובה שלך</Label> */}
          <div className="mr-2">
            <TextArea
              onFocus={e =>
                e.currentTarget.setSelectionRange(
                  e.currentTarget.value.length,
                  e.currentTarget.value.length
                )
              }
              autoFocus
              id="comment"
              value={input}
              onChange={e => setInput(e.target.value)}
              rows={1}
              placeholder="כתוב פה  את התגובה שלך"
            />

            <div className="mt-2 flex justify-end gap-2">
              <Button
                tabIndex={-1}
                variant="subtle"
                onClick={() => setIsReplying(false)}
              >
                ביטול
              </Button>
              <Button
                isLoading={isLoading}
                onClick={() => {
                  if (!input) return;
                  postComment({
                    ID,
                    type: type,
                    text: input,
                    replyToId: comment.replyToId ?? comment.id, // default to top-level comment
                  });
                }}
              >
                שליחה
              </Button>
            </div>
          </div>
        </div>
      ) : null}
    </div>
  );
};

export default PostComment;
