import { FC, useContext, useState } from "react";
import parse from "html-react-parser";
import CloseIcon from "@mui/icons-material/Close";
import { HiOutlineSwitchHorizontal } from "react-icons/hi";
import { FaRegCopy } from "react-icons/fa";
import { BsFillTrash3Fill } from "react-icons/bs";
import DeleteSolutionModal from "@/components/modals/DeleteSolutionModal";
import { useMutation } from "@tanstack/react-query";
import axios from "axios";
import { toast } from "@/hooks/use-toast";
import { QueryContext } from "@/partials/ChildrenProviders";


interface SubmissionContentProps {
  submissionsState: any;
  setSubmission: any;
  submissionsData: any;
  updateEditor: any;
}

const SubmissionContent: FC<SubmissionContentProps> = ({
  submissionsState,
  setSubmission,
  submissionsData,
  updateEditor,
}) => {
  const [displayDeleteModal, setDeleteModal] = useState(false);
  const queryClient = useContext(QueryContext);
  const parsedHtml = parse(submissionsData[submissionsState].html);

  const handleCopy = (html: any) => {
    // navigator.clipboard.writeText(html);
  };

  const handleCopyToEditor = () => {
    const editorData = submissionsData[submissionsState].content;
    updateEditor(editorData);
  };



  const { mutate: deleteSolution } = useMutation({
    mutationFn: async () => {
      const solutionId: any = submissionsData[submissionsState].id;
      const { data } = await axios.post("/api/deleteSolution", { solutionId });
      return data;
    },
    onError: (err) => {
      toast({
        title: "שגיאה",
        description: "לא ניתן למחוק פתרון כרגע, נסה שוב מאוחר יותר.",
        variant: "destructive",
      });
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["workSpaceData"] });
      setSubmission(null)
      toast({
        title: "נמחק",
        description: "הפתרון נמחק בהצלחה",
        variant: "destructive",
      });
    },
  });

  const handleCloseModal = (newValue: any) => {
    setDeleteModal(newValue);
  };

  // console.log(submissionsData)
  return (
    <div>
      {displayDeleteModal && (
        <DeleteSolutionModal
          handleDelete={deleteSolution}
          setModal={handleCloseModal}
        />
      )}
      <div className="flex justify-between mx-4 mt-4">
        <button
          title="חזרה"
          onClick={() => setSubmission(null)}
          className="h-5 w-5"
        >
          <CloseIcon />
        </button>
        <div className="gap-x-4 flex">
          <button title="מחיקת פתרון" onClick={() => setDeleteModal(true)}>
            <BsFillTrash3Fill className="h-4 w-4" />
          </button>
          <button title="העתק" onClick={() => handleCopy(parsedHtml)}>
            <FaRegCopy />
          </button>
          <button title="העתק אל עורך הטקסט" onClick={handleCopyToEditor}>
            <HiOutlineSwitchHorizontal />
          </button>
        </div>
      </div>
      <div className="w-full">
        <div className="mt-4 font-arial">{parsedHtml}</div>
      </div>
    </div>
  );
};

export default SubmissionContent;