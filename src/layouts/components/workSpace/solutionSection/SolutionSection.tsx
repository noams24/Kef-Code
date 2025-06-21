'use client';

import ImageDisplay from '@/components/ImageDisplay';
import Likes from '@/components/Likes';
import Status from '@/components/Status';
import { toast } from '@/hooks/use-toast';
import Accordion from '@/shortcodes/Accordion';
import Tab from '@/shortcodes/Tab';
import Tabs from '@/shortcodes/Tabs';
import Youtube from '@/shortcodes/Youtube';
import {
  useDevelop,
  useGenerationStore,
  useGenerationStore3,
  useGenerationStoree,
} from '@/store/store';
import { Snackbar } from '@mui/material';
import Alert from '@mui/material/Alert';
import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import parse from 'html-react-parser';
import Feed from './Feed';
import Pagination from './Pagination';
import Solution from './Solution';

import '@/layouts/editor/theme.css';
import 'mathlive/static.css';

import DescriptionCommentsSection from '@/components/comments/DescriptionCommentsSection';
import AddVideoModal from '@/components/modals/AddVideoModal';
import DeleteSolutionModal from '@/components/modals/DeleteSolutionModal';
import ImageSkeleton from '@/components/skeletons/ImageSkeleton';
import LikesSkeleton from '@/components/skeletons/LikesSkeletion';
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/Select2';
import hebrewDateFormat from '@/lib/utils/hebrewDateFormat';
import { QueryContext } from '@/partials/ChildrenProviders';
import { Share } from '@mui/icons-material';
import CloseIcon from '@mui/icons-material/Close';
import { useMutation } from '@tanstack/react-query';
// import Tippy from '@tippyjs/react';
import dynamic from 'next/dynamic';
import { useContext, useState } from 'react';
import { BsFillTrash3Fill } from 'react-icons/bs';
import { FaFileUpload } from 'react-icons/fa';
import { RxVideo } from 'react-icons/rx';
import SubmissionContent from './SubmissionContent';
import { useSearchParams } from 'next/navigation';
import MathContent from '@/components/MathContent';

const PdfRenderer = dynamic(() => import('@/components/PdfRenderer'), {
  ssr: false,
});

interface SolutionSectionProps {
  workSpaceData: any;
  problemId: string;
  solution: any;
  userId: string | undefined;
  role: string | undefined;
  loading: any;
  updateEditor: any;
  problem: any;
}

const SolutionSection: React.FC<SolutionSectionProps> = ({
  workSpaceData,
  problemId,
  solution,
  userId,
  role,
  loading,
  updateEditor,
  problem,
}) => {
  const { solutionState, setSolution } = useGenerationStore();
  const { submissionState, setSubmission } = useGenerationStore3();
  const { page } = useGenerationStoree();
  const [sortBy, setSort] = useState('likes');
  const [displayDeleteModal, setDeleteModal] = useState(false);
  const [displayVideoModal, setVideoModal] = useState(false);
  const [isCopied, setIsCopied] = useState(false);
  const { development } = useDevelop();
  const [displaySubmissionFlag, setFlag] = useState(false);
  const queryClient = useContext(QueryContext);

  const searchParams = useSearchParams();
  const submissionParam = searchParams.get('submission');

  const { data: soltionSectionData } = useQuery({
    queryKey: ['solution', problemId, page, sortBy],
    queryFn: async () => {
      if (development) return null;
      const query = `/api/getSolutions?problemId=${problemId}&page=${page}&sortBy=${sortBy}`;
      const payload = { displaySubmission: submissionParam };
      const { data } = await axios.post(query, payload);

      if (!displaySubmissionFlag && submissionParam) {
        setFlag(true);
        const index = data.findIndex(
          (item: any) => item.id === submissionParam
        );
        const tabSolutions = document.getElementById('tab-1');
        if (tabSolutions) {
          tabSolutions.click();
          tabSolutions.style.outline = 'none';
          setTimeout(() => {
            setSolution(index.toString());
            // setSolution('0');
          }, 200);
        }
      }

      return data;
    },
    keepPreviousData: true,
  });

  const sortData = (sort: string) => {
    setSort(sort);
  };

  const { mutate: deleteSolution } = useMutation({
    mutationFn: async () => {
      const solutionId: any = soltionSectionData[Number(solutionState)].id;
      const { data } = await axios.post('/api/deleteSolution', { solutionId });
      return data;
    },
    onError: err => {
      toast({
        title: 'שגיאה',
        description: 'לא ניתן למחוק פתרון כרגע, נסה שוב מאוחר יותר.',
        variant: 'destructive',
      });
    },
    onSuccess: () => {
      setSolution(null);
      queryClient.invalidateQueries({ queryKey: ['solution'] });
      queryClient.invalidateQueries({ queryKey: ['workSpaceData'] });
      toast({
        title: 'נמחק',
        description: 'הפתרון נמחק בהצלחה',
        variant: 'destructive',
      });
    },
  });

  const { mutate: addVideo } = useMutation({
    mutationFn: async () => {
      // console.log(soltionSectionData[Number(solutionState)].id)
      const solutionId: any = soltionSectionData[Number(solutionState)].id;
      const { data } = await axios.post('/api/deleteSolution', { solutionId });
      return data;
    },
    onError: err => {
      toast({
        title: 'שגיאה',
        description: 'לא ניתן למחוק פתרון כרגע, נסה שוב מאוחר יותר.',
        variant: 'destructive',
      });
    },
    onSuccess: () => {
      toast({
        title: 'נמחק',
        description: 'הפתרון נמחק בהצלחה',
        variant: 'destructive',
      });
    },
  });

  const handleCloseModal = (newValue: any) => {
    setDeleteModal(newValue);
  };

  const handleCloseVideoModal = (newValue: any) => {
    setVideoModal(newValue);
  };

  const handleShare = () => {
    navigator.clipboard
      .writeText(
        `https://kef-code.vercel.app/view/${
          soltionSectionData[Number(solutionState)].id
        }`
      )
      .then(() => {
        setIsCopied(true);
        setTimeout(() => {
          setIsCopied(false);
        }, 2000);
      });
  };

  const { mutate: AdminAddSolution, isLoading } = useMutation({
    mutationFn: async () => {
      const values = {
        problemId: soltionSectionData[Number(solutionState)].problemId,
        videoUrl: soltionSectionData[Number(solutionState)].videoUrl,
      };
      const payload = {
        values,
        jsonState: soltionSectionData[Number(solutionState)].content,
      };
      const { data } = await axios.post('/api/uploadSolution', payload);
      return data;
    },
    onError: err => {
      toast({
        title: 'שגיאה',
        description: 'לא ניתן לשמור את התשובה כרגע',
        variant: 'destructive',
      });
    },
    onSuccess: () => {
      toast({
        title: 'נשמר',
        description: 'התשובה נשמרה בהצלחה',
        variant: 'destructive',
      });
    },
  });
  return (
    <div className="overflow-y-auto rounded-lg border border-border font-arial dark:border-darkmode-border">
      {displayDeleteModal && (
        <DeleteSolutionModal
          handleDelete={deleteSolution}
          setModal={handleCloseModal}
        />
      )}
      {displayVideoModal && (
        <AddVideoModal
          handleVideo={addVideo}
          setVideoModal={handleCloseVideoModal}
          submissionId={soltionSectionData[Number(solutionState)].id}
        />
      )}
      <Snackbar
        open={isCopied}
        autoHideDuration={6000}
        anchorOrigin={{
          vertical: 'top',
          horizontal: 'center',
        }}
      >
        <Alert severity="success" sx={{ width: '100%' }}>
          הקישור הועתק
        </Alert>
      </Snackbar>
      <Tabs>
        <Tab name="הגשות">
          {!userId ? (
            <div>
              <h3 className="flex justify-center">זמין רק למשתמשים רשומים</h3>
            </div>
          ) : (
            <div>
              {!workSpaceData ||
              !workSpaceData.hasOwnProperty('submissions') ||
              workSpaceData.submissions.length === 0 ? (
                <div className="flex min-h-10 justify-center">
                  <h3 className="my-5">אין הגשות עדיין</h3>
                </div>
              ) : submissionState === null ? (
                workSpaceData.submissions.map((item: any, index: any) => (
                  <div
                    key={index}
                    className="my-4 flex cursor-pointer justify-between rounded-md border p-3"
                    onClick={() => {
                      setSubmission(index);
                    }}
                  >
                    <p dir="rtl">{hebrewDateFormat(item.updatedAt)}</p>
                    <div>
                      {'פתרון מספר '}
                      {index + 1}
                    </div>
                  </div>
                ))
              ) : (
                <SubmissionContent
                  submissionsState={submissionState}
                  setSubmission={setSubmission}
                  submissionsData={workSpaceData.submissions}
                  updateEditor={updateEditor}
                />
              )}
            </div>
          )}
        </Tab>
        <Tab name="פתרונות">
          {solutionState || solutionState === 0 ? (
            <div className="px-5">
              <div className="sticky top-0 my-3 flex justify-between">
                <button
                  title="חזרה"
                  onClick={() => setSolution(null)}
                  className="h-5 w-5"
                >
                  <CloseIcon />
                </button>
                {soltionSectionData &&
                  soltionSectionData[Number(solutionState)].userId ===
                    userId && (
                    <div>
                      {role === 'ADMIN' && (
                        <button
                          title="הפוך לפתרון רשמי"
                          onClick={() => AdminAddSolution()}
                        >
                          <FaFileUpload className="h-5 w-5" />
                        </button>
                      )}
                      <button
                        title="הוספת סרטון"
                        className="px-5"
                        onClick={() => setVideoModal(true)}
                      >
                        <RxVideo className="h-5 w-5" />
                      </button>
                      <button
                        title="מחיקת פתרון"
                        onClick={() => setDeleteModal(true)}
                      >
                        {' '}
                        <BsFillTrash3Fill className="h-5 w-5 text-red-600" />
                      </button>
                    </div>
                  )}
                <button
                  className="h-5 w-5"
                  title="שיתוף פתרון"
                  onClick={() => handleShare()}
                >
                  <Share />
                </button>
              </div>
              <Solution
                data={soltionSectionData[Number(solutionState)]}
                userId={userId}
              />
              {/* <Solution author="ישראל ישראלי" date="2023-08-14" likes={42} comments={0} content={soltionSectionData[0].html} /> */}
            </div>
          ) : (
            <div>
              {soltionSectionData && soltionSectionData.length !== 0 ? (
                <>
                  <div className="mt-3 text-center dark:text-white" dir="rtl">
                    <Select onValueChange={e => sortData(e)}>
                      <SelectTrigger className="w-[100px]">
                        <SelectValue placeholder="מיין לפי" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectGroup>
                          <SelectLabel dir="rtl">מיין לפי</SelectLabel>
                          <SelectItem dir="rtl" value="likes">
                            לייקים
                          </SelectItem>
                          <SelectItem dir="rtl" value="recent">
                            נוסף לאחרונה
                          </SelectItem>
                        </SelectGroup>
                      </SelectContent>
                    </Select>
                  </div>
                  <Feed data={soltionSectionData} />
                </>
              ) : (
                <h3 className="flex justify-center">אין פתרונות להצגה</h3>
              )}

              {soltionSectionData && workSpaceData && (
                <Pagination
                  totalPages={Math.ceil(workSpaceData.totalSubmissions / 5)}
                />
              )}
            </div>
          )}
        </Tab>
        <Tab name="פתרון רשמי">
          {workSpaceData && workSpaceData.videoUrl && (
            <div className="px-5">
              <h4 className="mt-1.5 pt-2 font-bold" dir="rtl">
                סרטון הסבר
              </h4>
              <hr className="my-4 h-0.5 rounded border-0 bg-zinc-200 dark:bg-zinc-700" />
              <div className="flex items-center justify-center">
                <Youtube id={workSpaceData.videoUrl} title={'פתרון'} />
              </div>
            </div>
          )}
          <div className="px-5">
            {development ? (
              solution
            ) : !workSpaceData ? (
              <h3 className="mt-4 flex justify-center">...טוען</h3>
            ) : problem.solutionMD ? (
              <MathContent content={problem.solutionMD} />
            ) : workSpaceData.solutionArticle ? (
              <div>
                <h4 className="mt-1.5 pt-2 font-bold" dir="rtl">
                  פתרון
                </h4>
                <hr className="my-4 h-0.5 rounded border-0 bg-zinc-200 dark:bg-zinc-700" />
                <div className="font-arial">
                  {parse(workSpaceData.solutionArticle)}
                </div>
                <Accordion className="mt-8" title="דיון">
                  <DescriptionCommentsSection
                    ID={workSpaceData.solutionId}
                    type="solution"
                    comments={[]}
                    userId={userId}
                  />
                </Accordion>
              </div>
            ) : (
              <h3 className="flex justify-center">אין פתרון עדיין</h3>
            )}
          </div>
        </Tab>
        <Tab name="תיאור">
          {development ? (
            <div>
              <Likes
                problemId={problemId}
                difficulty={'קל'}
                likes={5}
                dislikes={2}
                bookmark={undefined}
                likeStatus={undefined}
              />
              <ImageDisplay
                imageUrl={'https://i.ibb.co/Gdz4BTg/problem1.png'}
              />
            </div>
          ) : (
            <div>
              <div className="-mt-2 flex items-center justify-between">
                <div></div>
                {loading ? (
                  <LikesSkeleton />
                ) : (
                  <Likes
                    problemId={problemId}
                    difficulty={workSpaceData?.difficulty}
                    likes={Number(
                      workSpaceData?.likes ? workSpaceData.likes : 0
                    )}
                    dislikes={Number(
                      workSpaceData?.dislikes ? workSpaceData.dislikes : 0
                    )}
                    bookmark={workSpaceData?.bookmark}
                    likeStatus={workSpaceData?.likeStatus}
                  />
                )}
                {userId ? (
                  <Status problemId={problemId} />
                ) : (
                  <div className="ml-20"> </div>
                )}
              </div>
              <div className="mt-2 flex justify-center">
                {problem?.description != null ? (
                  <MathContent content={problem.description} />
                ) : problem?.img.endsWith('pdf') ? (
                  <PdfRenderer url={workSpaceData?.imageUrl} />
                ) : (
                  <ImageDisplay imageUrl={problem?.img} />
                )}
              </div>
            </div>
          )}
          <Accordion className="mt-8" title="דיון">
            <DescriptionCommentsSection
              ID={problemId}
              type="problem"
              comments={[]}
              userId={userId}
            />
          </Accordion>
          {problem.hint && (
            <Accordion className="mt-8" title="הנחיה">
              <MathContent content={problem.hint} />
            </Accordion>
          )}
        </Tab>
      </Tabs>
    </div>
  );
};

export default SolutionSection;
